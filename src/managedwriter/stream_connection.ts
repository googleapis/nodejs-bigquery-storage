// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as gax from 'google-gax';
import {EventEmitter} from 'events';
import * as protos from '../../protos/protos';

import {WriterClient} from './writer_client';
import {PendingWrite} from './pending_write';
import {logger} from './logger';
import {parseStorageErrors} from './error';

type TableSchema = protos.google.cloud.bigquery.storage.v1.ITableSchema;
type IInt64Value = protos.google.protobuf.IInt64Value;
type AppendRowsResponse =
  protos.google.cloud.bigquery.storage.v1.IAppendRowsResponse;
type AppendRowRequest =
  protos.google.cloud.bigquery.storage.v1.IAppendRowsRequest;
type FinalizeWriteStreamResponse =
  protos.google.cloud.bigquery.storage.v1.IFinalizeWriteStreamResponse;
type FinalizeWriteStreamRequest =
  protos.google.cloud.bigquery.storage.v1.IFinalizeWriteStreamRequest;
type FlushRowsResponse =
  protos.google.cloud.bigquery.storage.v1.IFlushRowsResponse;
type FlushRowsRequest =
  protos.google.cloud.bigquery.storage.v1.IFlushRowsRequest;

export type RemoveListener = {
  off: () => void;
};

/**
 * StreamConnection is responsible for writing requests to a bidirecional
 * GRPC connection against the Storage Write API appendRows method.
 *
 * All the requests are sent without flow control, and writes are sent
 * in receiving order. It's user's responsibility to do the flow control
 * and maintain the lifetime of the requests.
 *
 * @class
 * @extends EventEmitter
 * @memberof managedwriter
 */
export class StreamConnection extends EventEmitter {
  private _streamId: string;
  private _writeClient: WriterClient;
  private _connection?: gax.CancellableStream | null;
  private _callOptions?: gax.CallOptions;
  private _pendingWrites: PendingWrite[];

  constructor(
    streamId: string,
    writeClient: WriterClient,
    options?: gax.CallOptions
  ) {
    super();
    this._streamId = streamId;
    this._writeClient = writeClient;
    this._callOptions = options;
    this._pendingWrites = [];
    this.open();
  }

  open() {
    if (this.isOpen()) {
      this.close();
    }
    const callOptions = this.resolveCallOptions(
      this._streamId,
      this._callOptions
    );
    const client = this._writeClient.getClient();
    const connection = client.appendRows(callOptions);
    this._connection = connection;
    this._connection.on('data', this.handleData);
    this._connection.on('error', this.handleError);
    this._connection.on('close', () => {
      this.trace('connection closed');
    });
    this._connection.on('pause', () => {
      this.trace('connection paused');
    });
    this._connection.on('resume', () => {
      this.trace('connection resumed');
    });
    this._connection.on('end', () => {
      this.trace('connection ended');
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private trace(msg: string, ...otherArgs: any[]) {
    logger('stream_connection', msg, ...otherArgs);
  }

  private handleError = (err: gax.GoogleError) => {
    this.trace('on error', err, JSON.stringify(err));
    if (this.shouldReconnect(err)) {
      this.reconnect();
      return;
    }
    let nextPendingWrite = this.getNextPendingWrite();
    if (this.isPermanentError(err)) {
      this.trace('found permanent error', err);
      while (nextPendingWrite) {
        this.ackNextPendingWrite(err);
        nextPendingWrite = this.getNextPendingWrite();
      }
      this.emit('error', err);
      return;
    }
    if (this.isRequestError(err) && nextPendingWrite) {
      this.trace(
        'found request error with pending write',
        err,
        nextPendingWrite
      );
      this.ackNextPendingWrite(err);
      return;
    }
    this.emit('error', err);
  };

  private shouldReconnect(err: gax.GoogleError): boolean {
    const reconnectionErrorCodes = [
      gax.Status.UNAVAILABLE,
      gax.Status.RESOURCE_EXHAUSTED,
      gax.Status.ABORTED,
      gax.Status.CANCELLED,
      gax.Status.DEADLINE_EXCEEDED,
    ];
    return !!err.code && reconnectionErrorCodes.includes(err.code);
  }

  private isPermanentError(err: gax.GoogleError): boolean {
    if (err.code === gax.Status.INVALID_ARGUMENT) {
      const storageErrors = parseStorageErrors(err);
      for (const storageError of storageErrors) {
        if (
          storageError.errorMessage?.includes(
            'Schema mismatch due to extra fields in user schema'
          )
        ) {
          return true;
        }
      }
    }
    return false;
  }

  private isRequestError(err: gax.GoogleError): boolean {
    return err.code === gax.Status.INVALID_ARGUMENT;
  }

  private resolveCallOptions(
    streamId: string,
    options?: gax.CallOptions
  ): gax.CallOptions {
    const callOptions = options || {};
    if (!callOptions.otherArgs) {
      callOptions.otherArgs = {};
    }
    if (!callOptions.otherArgs.headers) {
      callOptions.otherArgs.headers = {};
    }
    // This header is required so that the BigQuery Storage API
    // knows which region to route the request to.
    callOptions.otherArgs.headers['x-goog-request-params'] =
      `write_stream=${streamId}`;
    return callOptions;
  }

  private handleData = (response: AppendRowsResponse) => {
    this.trace('data arrived', response);
    const pw = this.getNextPendingWrite();
    if (!pw) {
      this.trace('data arrived with no pending write available', response);
      return;
    }
    if (response.updatedSchema) {
      this.emit('schemaUpdated', response.updatedSchema);
    }
    this.ackNextPendingWrite(null, response);
  };

  /**
   * Callback is invoked when a the server notifies the stream connection
   * of a new Table Schema change.
   */
  onSchemaUpdated(listener: (schema: TableSchema) => void): RemoveListener {
    return this.registerListener('schemaUpdated', listener);
  }

  /**
   * Callback is invoked when an error is received from the server.
   */
  onConnectionError(listener: (err: gax.GoogleError) => void): RemoveListener {
    return this.registerListener('error', listener);
  }

  private registerListener(
    eventName: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listener: (...args: any[]) => void
  ): RemoveListener {
    this.addListener(eventName, listener);
    return {
      off: () => {
        this.removeListener(eventName, listener);
      },
    };
  }

  // check if is default stream
  private isDefaultStream(): boolean {
    return this._streamId.endsWith('_default');
  }

  /**
   * Get the name of the write stream associated with this connection.
   * When the connection is created withouth a write stream,
   * this method can be used to retrieve the automatically
   * created write stream name.
   */
  getStreamId = (): string => {
    return this._streamId;
  };

  private getNextPendingWrite(): PendingWrite | null {
    if (this._pendingWrites.length > 0) {
      return this._pendingWrites[0];
    }
    return null;
  }

  private ackNextPendingWrite(
    err: Error | null,
    result?:
      | protos.google.cloud.bigquery.storage.v1.IAppendRowsResponse
      | undefined
  ) {
    const pw = this._pendingWrites.pop();
    if (pw) {
      pw._markDone(err, result);
    }
  }

  /**
   * Access in-flight write requests.
   */
  getPendingWrites(): PendingWrite[] {
    return [...this._pendingWrites];
  }

  /**
   * Write a request to the bi-directional stream connection.
   *
   * @param {AppendRowRequest} request - request to send.
   *
   * @returns {managedwriter.PendingWrite}
   */
  write(request: AppendRowRequest): PendingWrite {
    this.trace('write', request);
    const pw = new PendingWrite(request);
    this.send(pw);
    return pw;
  }

  private send(pw: PendingWrite) {
    const request = pw.getRequest();
    if (!this._connection) {
      pw._markDone(new Error('connection closed'));
      return;
    }
    if (this._connection.destroyed || this._connection.closed) {
      this.reconnect();
    }
    this.trace('sending pending write', pw);
    try {
      this._connection.write(request, err => {
        this.trace('wrote pending write', err, this._pendingWrites.length);
        if (err) {
          pw._markDone(err); //TODO: add retries
          return;
        }
        this._pendingWrites.unshift(pw);
      });
    } catch (err) {
      pw._markDone(err as Error);
    }
  }

  /**
   * Check if connection is open and ready to send requests.
   */
  isOpen(): boolean {
    return !!this._connection;
  }

  /**
   * Reconnect and re send inflight requests.
   */
  reconnect() {
    this.trace('reconnect called');
    this.close();
    this.open();
  }

  /**
   * Close the bi-directional stream connection.
   */
  close() {
    if (!this._connection) {
      return;
    }
    this._connection.end();
    this._connection.removeAllListeners();
    this._connection = null;
  }

  /**
   * Flushes rows to a BUFFERED stream.
   * If users are appending rows to BUFFERED stream,
   * flush operation is required in order for the rows to become available for reading.
   * A Flush operation flushes up to any previously flushed offset in a BUFFERED stream,
   * to the offset specified in the request.
   *
   * Flush is not supported on the DefaultStream stream, since it is not BUFFERED.
   *
   * @param {number|Long|string|null} request.offset
   *
   * @returns {Promise<FlushRowsResponse | null>}
   */
  async flushRows(request?: {
    offset?: IInt64Value['value'];
  }): Promise<FlushRowsResponse | null> {
    this.close();
    if (this.isDefaultStream()) {
      return null;
    }
    let offsetValue: FlushRowsRequest['offset'];
    if (request && request.offset) {
      offsetValue = {
        value: request.offset,
      };
    }
    const flushRowsReq: FlushRowsRequest = {
      writeStream: this._streamId,
      offset: offsetValue,
    };

    return this._writeClient.flushRows(flushRowsReq);
  }

  /**
   * Finalize a write stream so that no new data can be appended to the
   * stream. Finalize is not supported on the DefaultStream stream.
   *
   * @returns {Promise<FinalizeWriteStreamResponse | null>}
   */
  async finalize(): Promise<FinalizeWriteStreamResponse | null> {
    this.close();
    if (this.isDefaultStream()) {
      return null;
    }
    const finalizeStreamReq: FinalizeWriteStreamRequest = {
      name: this._streamId,
    };

    return this._writeClient.finalizeWriteStream(finalizeStreamReq);
  }
}

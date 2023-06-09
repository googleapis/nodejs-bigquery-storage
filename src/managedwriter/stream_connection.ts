// Copyright 2022 Google LLC
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

type TableSchema = protos.google.cloud.bigquery.storage.v1.ITableSchema;
type AppendRowsResponse =
  protos.google.cloud.bigquery.storage.v1.IAppendRowsResponse;
type AppendRowRequest =
  protos.google.cloud.bigquery.storage.v1.IAppendRowsRequest;
type FinalizeWriteStreamResponse =
  protos.google.cloud.bigquery.storage.v1.IFinalizeWriteStreamResponse;
type FinalizeWriteStreamRequest =
  protos.google.cloud.bigquery.storage.v1.IFinalizeWriteStreamRequest;

export type RemoveListener = {
  off: () => void;
};

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
    this._connection.on('error', err => {
      this.emit('error', err);
    });
    this._connection.on('end', () => {});
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
    callOptions.otherArgs.headers[
      'x-goog-request-params'
    ] = `write_stream=${streamId}`;
    return callOptions;
  }

  private handleData = (response: AppendRowsResponse) => {
    const pw = this._pendingWrites.pop();
    if (!pw) {
      console.warn('data arrived with no pending write available', response);
      return;
    }
    if (response.updatedSchema) {
      this.emit('schemaUpdated', response.updatedSchema);
    }
    pw._markDone(null, response);
  };

  onSchemaUpdated(listener: (schema: TableSchema) => void): RemoveListener {
    return this.registerListener('schemaUpdated', listener);
  }

  onWriteError(
    listener: (err: Error, req: AppendRowRequest) => void
  ): RemoveListener {
    return this.registerListener('writeError', listener);
  }

  onConnectionError(listener: (err: Error) => void): RemoveListener {
    return this.registerListener('error', listener);
  }

  private registerListener(
    eventName: string,
    listener: (...args: any[]) => void
  ): RemoveListener {
    this.addListener(eventName, listener);
    return {
      off: () => {
        this.removeListener(eventName, listener);
      },
    };
  }

  getStreamId = (): string => {
    return this._streamId;
  };

  write(request: AppendRowRequest): PendingWrite {
    const pw = new PendingWrite(request);
    if (!this._connection) {
      pw._markDone(new Error('connection closed'));
      return pw;
    }
    this._connection.write(request, err => {
      if (err) {
        this.emit('writeError', err, request);
        pw._markDone(err); //TODO: add retries
        return;
      }
      this._pendingWrites.unshift(pw);
    });
    return pw;
  }

  isOpen(): boolean {
    return !!this._connection;
  }

  close() {
    if (!this._connection) {
      return;
    }
    this._connection.end();
    this._connection.removeAllListeners();
    this._connection = null;
  }

  /**
   * Finalize a write stream so that no new data can be appended to the
   * stream. Finalize is not supported on the DefaultStream stream.
   *
   * @returns {Promise<FinalizeWriteStreamResponse.rowCount>} - number of rows appended.
   */
  async finalize(): Promise<FinalizeWriteStreamResponse['rowCount']> {
    this.close();
    if (this._streamId.includes('_default')) {
      // check if is default stream
      return;
    }
    const finalizeStreamReq: FinalizeWriteStreamRequest = {
      name: this._streamId,
    };

    const result = await this._writeClient
      .getClient()
      .finalizeWriteStream(finalizeStreamReq);

    if (!result.includes(undefined)) {
      const [validResponse] = result;
      return validResponse.rowCount;
    }
    return null;
  }
}

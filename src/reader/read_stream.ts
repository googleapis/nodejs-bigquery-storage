// Copyright 2024 Google LLC
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
import {
  Schema,
  tableFromIPC,
  RecordBatchReader,
  Uint8,
  AsyncMessageReader,
  MessageReader,
} from 'apache-arrow';
import * as protos from '../../protos/protos';

import {ReadClient} from './read_client';
import {logger} from '../util/logger';
import {Readable} from 'stream';
import {TableRow} from '@google-cloud/bigquery';

type TableSchema = protos.google.cloud.bigquery.storage.v1.ITableSchema;
type ReadSession = protos.google.cloud.bigquery.storage.v1.IReadSession;
type ReadRowsResponse =
  protos.google.cloud.bigquery.storage.v1.IReadRowsResponse;

export type RemoveListener = {
  off: () => void;
};

/**
 * ReadStream is responsible for reading data from a GRPC read stream
 * connection against the Storage Read API readRows method.
 *
 * @class
 * @extends EventEmitter
 * @memberof reader
 */
export class ReadStream extends Readable {
  private _streamName: string;
  private _offset: number;
  private _maxRows: number;
  private _readClient: ReadClient;
  private _session: ReadSession;
  private _arrowSchema: Schema;
  private _connection?: gax.CancellableStream | null;
  private _callOptions?: gax.CallOptions;

  constructor(
    streamName: string,
    session: ReadSession,
    readClient: ReadClient,
    options?: gax.CallOptions
  ) {
    super({
      objectMode: true,
    });
    this._streamName = streamName;
    this._session = session;
    this._offset = 0;
    this._maxRows = 10;
    this._readClient = readClient;
    this._callOptions = options;
    this.open();

    const buf = Buffer.from(
      this._session.arrowSchema?.serializedSchema as Uint8Array
    );
    const schemaReader = new MessageReader(buf);
    const schema = schemaReader.readSchema(false);
    this.trace('schema', schema);
    this._arrowSchema = schema!;
  }

  _read(size?: number | undefined) {
    if (this.readableLength === 0) {
      this.trace('read called with zero rows', this._connection?.isPaused());
      if (this._connection && this._connection.isPaused()) {
        this._connection.resume();
        this._connection.read();
      }
      return null;
    }
    this.trace('read called with existing rows', this.isPaused());
    return undefined;
  }

  open() {
    if (this.isOpen()) {
      this.close();
    }
    const client = this._readClient.getClient();
    const connection = client.readRows(
      {
        readStream: this._streamName,
        offset: this._offset,
      },
      this._callOptions
    );
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
      this.resume();
    });
    this._connection.on('end', () => {
      this.trace('connection ended');
      this.push(null);
      this.close();
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private trace(msg: string, ...otherArgs: any[]) {
    logger(
      'read_stream',
      `[streamName: ${this._streamName}]`,
      msg,
      ...otherArgs
    );
  }

  private handleError = (err: gax.GoogleError) => {
    this.trace('on error', err, JSON.stringify(err));
    if (this.shouldRetry(err)) {
      this.reconnect();
      return;
    }
    this.emit('error', err);
  };

  private shouldRetry(err: gax.GoogleError): boolean {
    const reconnectionErrorCodes = [
      gax.Status.ABORTED,
      gax.Status.CANCELLED,
      gax.Status.DEADLINE_EXCEEDED,
      gax.Status.FAILED_PRECONDITION,
      gax.Status.INTERNAL,
      gax.Status.UNAVAILABLE,
    ];
    return !!err.code && reconnectionErrorCodes.includes(err.code);
  }

  private handleData = (response: ReadRowsResponse) => {
    //this.trace('data arrived', response);
    if (
      response.arrowRecordBatch &&
      response.arrowRecordBatch.serializedRecordBatch &&
      response.rowCount
    ) {
      const rowCount = parseInt(response.rowCount as string, 10);
      const batch = response.arrowRecordBatch;
      this.trace(
        'found ',
        rowCount,
        ' rows serialized in ',
        batch.serializedRecordBatch?.length,
        'bytes',
        this.readableFlowing
      );

      this._offset += rowCount;

      // TODO: parse arrow data
      const row: TableRow = {
        f: [
          {v: 'test'},
          {v: batch.serializedRecordBatch?.length + ' bytes'},
          {v: rowCount},
        ],
      };
      this.resume();
      this.push(row);
      if (this.readableLength > this._maxRows) {
        this._connection?.pause();
      }
    }
  };

  /**
   * Get the name of the read stream associated with this connection.
   */
  getStreamName = (): string => {
    return this._streamName;
  };

  getRowsStream(): Readable {
    return this;
  }

  /**
   * Check if connection is open and ready to read data.
   */
  isOpen(): boolean {
    return !!this._connection;
  }

  /**
   * Reconnect and re-open readRows channel.
   */
  reconnect() {
    this.trace('reconnect called');
    this.close();
    this.open();
  }

  /**
   * Close the read stream connection.
   */
  close() {
    if (!this._connection) {
      return;
    }
    this._connection.end();
    this._connection.removeAllListeners();
    this._connection = null;
  }
}

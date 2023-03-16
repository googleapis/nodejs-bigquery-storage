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
import type {CallOptions, ClientOptions} from 'google-gax';
import * as protos from '../../protos/protos';

import {BigQueryWriteClient} from '../v1';
import {
  WriteStream,
  WriteStreamType,
  DefaultStream,
  streamTypeToEnum,
} from './stream_types';
import {StreamConnection} from './stream_connection';

/**
 *  BigQuery Write API.
 *
 *  The Write API can be used to write data to BigQuery.
 *
 *  For supplementary information about the Write API, see:
 *  https://cloud.google.com/bigquery/docs/write-api
 * @class
 * @memberof storage
 */

type StreamConnections = {
  connectionList: StreamConnection[];
  connections: Record<string, StreamConnection>;
};
type BatchCommitWriteStreamsRequest =
  protos.google.cloud.bigquery.storage.v1.IBatchCommitWriteStreamsRequest;
type BatchCommitWriteStreamsResponse =
  protos.google.cloud.bigquery.storage.v1.IBatchCommitWriteStreamsResponse;

export class WriterClient {
  private _client: BigQueryWriteClient;
  private _connections: StreamConnections;
  private _client_closed: boolean;

  constructor(opts?: ClientOptions) {
    this._client = new BigQueryWriteClient(opts);
    this._connections = {
      connectionList: [],
      connections: {},
    };
    this._client_closed = false;
  }

  /**
   * Initialize the client.
   * Performs asynchronous operations (such as authentication) and prepares the client.
   * This function will be called automatically when any class method is called for the
   * first time, but if you need to initialize it before calling an actual method,
   * feel free to call initialize() directly.
   *
   * You can await on this method if you want to make sure the client is initialized.
   *
   * @returns {Promise} A promise that resolves when auth is complete.
   */
  initialize = async (): Promise<void> => {
    await this._client.initialize();
  };

  getClient = (): BigQueryWriteClient => {
    return this._client;
  };

  setClient = (client: BigQueryWriteClient): void => {
    this._client = client;
  };

  getWriteStreams = (writeStream: WriteStream): undefined | null | string[] => {
    if (writeStream === undefined || writeStream.name === undefined) {
      return undefined;
    }
    if (writeStream.name === null) {
      return null;
    }
    return new Array(writeStream.name);
  };

  getConnections(): StreamConnections {
    return this._connections;
  }

  getClientClosedStatus(): boolean {
    return this._client_closed;
  }

  async createWriteStream(req: {
    streamType: WriteStreamType;
    destinationTable: string;
  }): Promise<string> {
    if (this._client_closed) {
      this._client_closed = false;
    }
    await this.initialize();
    const {streamType, destinationTable} = req;
    const request: protos.google.cloud.bigquery.storage.v1.ICreateWriteStreamRequest =
      {
        parent: destinationTable,
        writeStream: {
          type: streamTypeToEnum(streamType),
        },
      };
    const [response] = await this._client.createWriteStream(request);
    if (typeof [response] === undefined) {
      throw new gax.GoogleError(`${response}`);
    }
    try {
      if (response.name) {
        const streamId = response.name;
        return streamId;
      }
      return '';
    } catch {
      throw new Error('Stream connection failed');
    }
  }

  async createStreamConnection(
    req: {
      streamId?: string;
      destinationTable?: string;
      streamType?: WriteStreamType;
    },
    clientOptions?: CallOptions
  ): Promise<StreamConnection> {
    if (this._client_closed) {
      this._client_closed = false;
    }
    await this.initialize();
    const {streamId, streamType, destinationTable} = req;
    try {
      const fullStreamId = await this.resolveStreamId(
        streamId,
        streamType,
        destinationTable
      );
      const writeStream: WriteStream = {
        name: fullStreamId,
        type: streamTypeToEnum(streamType),
      };
      const connection = clientOptions
        ? this._client.appendRows(clientOptions)
        : this._client.appendRows();
      const streamConnection = new StreamConnection(
        fullStreamId,
        writeStream,
        connection,
        streamType,
        this
      );
      this._connections.connectionList.push(streamConnection);
      this._connections.connections[`${streamId}`] = streamConnection;
      return streamConnection;
    } catch (err) {
      throw new Error('managed stream connection failed:' + err);
    }
  }

  private async resolveStreamId(
    streamId?: string,
    streamType?: WriteStreamType,
    destinationTable?: string
  ): Promise<string> {
    if (streamId && streamId !== '') {
      if (streamId === DefaultStream) {
        if (destinationTable !== '') {
          return `${destinationTable}/streams/_default`;
        } else {
          throw new Error('destinationTable needed if DefaultStream informed');
        }
      }
      return streamId;
    }
    if (streamType && destinationTable) {
      streamId = await this.createWriteStream({streamType, destinationTable});
      return streamId;
    }
    throw new Error(
      'streamType and destinationTable required to create write stream'
    );
  }

  async batchCommitWriteStream(
    req: BatchCommitWriteStreamsRequest
  ): Promise<BatchCommitWriteStreamsResponse> {
    await this.initialize();
    const [res] = await this._client.batchCommitWriteStreams(req);
    return res;
  }

  async close() {
    this._connections.connectionList.map(ms => {
      return ms.close();
    });
  }

  async finalize(): Promise<
    protos.google.cloud.bigquery.storage.v1.IFinalizeWriteStreamResponse['rowCount']
  > {
    const rowCounts = await Promise.all(
      this._connections.connectionList.map(ms => {
        return ms.finalize();
      })
    );

    return rowCounts.reduce((total: number, rowCount) => {
      const rowCountNum = Number.parseInt(`${rowCount}`, 10);
      return total + rowCountNum;
    }, 0);
  }
}

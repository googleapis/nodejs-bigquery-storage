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
import type {CallOptions, ClientOptions} from 'google-gax';
import * as protos from '../../protos/protos';

import {BigQueryReadClient} from '../v1';
import bigquery from '@google-cloud/bigquery/build/src/types';
import {Table} from '@google-cloud/bigquery';
import {ReadStream} from './read_stream';
import {TableReader} from './table_reader';

type CreateReadSessionRequest =
  protos.google.cloud.bigquery.storage.v1.ICreateReadSessionRequest;
type ReadSession = protos.google.cloud.bigquery.storage.v1.IReadSession;

/**
 *  BigQuery Read API Client.
 *  The Read API can be used to read data to BigQuery.
 *
 *  This class provides the ability to make remote calls to the backing service through method
 *  calls that map to API methods.
 *
 *  For supplementary information about the Read API, see:
 *  https://cloud.google.com/bigquery/docs/read-api
 *
 * @class
 * @memberof reader
 */
export class ReadClient {
  private _client: BigQueryReadClient;
  private _open: boolean;

  constructor(opts?: ClientOptions) {
    const baseOptions = {
      'grpc.keepalive_time_ms': 30 * 1000,
      'grpc.keepalive_timeout_ms': 10 * 1000,
    };
    this._client = new BigQueryReadClient({
      ...baseOptions,
      ...opts,
    });
    this._open = false;
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
    this._open = true;
  };

  getClient = (): BigQueryReadClient => {
    return this._client;
  };

  setClient = (client: BigQueryReadClient): void => {
    this._client = client;
  };

  /**
   * Check if client is open and ready to send requests.
   */
  isOpen(): boolean {
    return this._open;
  }

  /**
   * Creates a write stream to the given table.
   * Additionally, every table has a special stream named DefaultStream
   * to which data can be written. This stream doesn't need to be created using
   * createWriteStream. It is a stream that can be used simultaneously by any
   * number of clients. Data written to this stream is considered committed as
   * soon as an acknowledgement is received.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {bigquery.ITableReference} request.table
   *   Reference to the table to which the stream belongs, in the format
   *   of `projects/{project}/datasets/{dataset}/tables/{table}`.
   * @returns {Promise<string>}} - The promise which resolves to the streamId.
   */
  async createReadSession(request: {
    table: bigquery.ITableReference;
  }): Promise<ReadSession> {
    await this.initialize();
    const {table} = request;
    const maxWorkerCount = 1;
    const maxStreamCount = 0;
    const createReq: CreateReadSessionRequest = {
      parent: `projects/${table.projectId}`,
      readSession: {
        table: `projects/${table.projectId}/datasets/${table.datasetId}/tables/${table.tableId}`,
        dataFormat: 'ARROW',
      },
      preferredMinStreamCount: maxWorkerCount,
      maxStreamCount: maxStreamCount,
    };
    console.log('[read client] create session req', createReq);
    const [response] = await this._client.createReadSession(createReq);
    if (typeof [response] === undefined) {
      throw new gax.GoogleError(`${response}`);
    }
    try {
      return response;
    } catch {
      throw new Error('Stream connection failed');
    }
  }

  /**
   * Creates a write stream to the given table.
   * Additionally, every table has a special stream named DefaultStream
   * to which data can be written. This stream doesn't need to be created using
   * createWriteStream. It is a stream that can be used simultaneously by any
   * number of clients. Data written to this stream is considered committed as
   * soon as an acknowledgement is received.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.streamName
   *   Required. The type of stream to create.
   * @param {string} request.offset
   *   Required. Reference to the table to which the stream belongs, in the format
   *   of `projects/{project}/datasets/{dataset}/tables/{table}`.
   * @returns {Promise<string>}} - The promise which resolves to the streamId.
   */
  async createReadStream(
    request: {
      streamName: string;
      session: ReadSession,
    },
    options?: CallOptions
  ): Promise<ReadStream> {
    await this.initialize();
    const {streamName, session} = request;
    try {
      const stream = new ReadStream(streamName, session, this, options);
      return stream;
    } catch (err) {
      throw new Error('read stream connection failed:' + err);
    }
  }

  async createTableReader(request: {table: Table}): Promise<TableReader> {
    await this.initialize();
    const reader = new TableReader(this, {
      table: request.table,
    });
    return reader;
  }

  close() {
    this._client.close();
    this._open = false;
  }
}

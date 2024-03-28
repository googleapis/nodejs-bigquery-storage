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

import {ReadStream} from './read_stream';
import bigquery from '@google-cloud/bigquery/build/src/types';
import {
  BigQuery,
  Table,
  GetRowsOptions,
  RowsResponse,
  TableRow,
} from '@google-cloud/bigquery';
import {ReadClient} from './read_client';
import {Readable} from 'stream';
import {logger} from '../util/logger';

/**
 * A BigQuery Storage API Reader that can be used to reader data into BigQuery Table
 * using the Storage API.
 *
 * @class
 * @memberof reader
 */
export class TableReader {
  //private _readSession: ReadSession;
  private _readClient: ReadClient;
  private _readStreams: ReadStream[];
  private _table: Table;

  /**
   * Creates a new Reader instance.
   *
   * @param {Object} params - The parameters for the JSONWriter.
   * @param {bigquery.ITableReference} params.table - The stream connection
   *   to the BigQuery streaming insert operation.
   */
  constructor(
    readClient: ReadClient,
    params: {
      bigQuery?: BigQuery;
      tableRef?: bigquery.ITableReference;
      table?: Table;
    }
  ) {
    const {table, tableRef, bigQuery} = params;
    if (tableRef && bigQuery) {
      this._table = bigQuery
        .dataset(tableRef.datasetId!, {
          projectId: tableRef.projectId,
        })
        .table(tableRef.tableId!);
    } else if (table) {
      this._table = table;
    } else {
      throw new Error('missing table');
    }
    this._readClient = readClient;
    this._readStreams = [];
    //this._readSession = new ReadSession();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private trace(msg: string, ...otherArgs: any[]) {
    logger(
      'table_reader',
      `[streamName: ${this._table.id}]`,
      msg,
      ...otherArgs
    );
  }

  /**
   * @callback RowsCallback
   * @param {?Error} err Request error, if any.
   * @param {array} rows The rows.
   * @param {object} apiResponse The full API response.
   */
  /**
   * @typedef {array} RowsResponse
   * @property {array} 0 The rows.
   */
  async getRows(options?: GetRowsOptions): Promise<RowsResponse> {
    this.trace('getRows', options);
    const session = await this._readClient.createReadSession({
      table: {
        projectId: this._table.dataset.projectId,
        datasetId: this._table.dataset.id,
        tableId: this._table.id,
      },
    });
    this.trace('session created', session.name, session.streams);

    const [md] = (await this._table.getMetadata({
      view: 'BASIC',
    })) as bigquery.ITable[];

    this._readStreams = [];
    for (const readStream of session.streams || []) {
      const r = await this._readClient.createReadStream(
        {
          streamName: readStream.name!,
          session,
        },
        options
      );
      this._readStreams.push(r);
    }

    async function* mergeStreams(readables: Readable[]) {
      for (const readable of readables) {
        for await (const chunk of readable) {
          yield chunk;
        }
      }
    }
    const joined = Readable.from(mergeStreams(this._readStreams));

    this.trace('joined streams', joined);

    return new Promise<RowsResponse>((resolve, reject) => {
      const rows: TableRow[] = [];
      joined.on('readable', () => {
        let data;
        while ((data = joined.read()) !== null) {
          this.trace('row arrived', data);
          rows.push(data);
        }
      });
      joined.on('error', err => {
        this.trace('reject called on joined stream', err);
        reject(err);
      });
      joined.on('end', () => {
        this.trace('resolve called on joined stream');
        const parsed = BigQuery.mergeSchemaWithRows_(md.schema!, rows, {
          wrapIntegers: options?.wrapIntegers || false,
          parseJSON: options?.parseJSON,
        });
        resolve([parsed, null, {}]);
      });
    });
  }

  close() {
    // this._readSession.close();
  }
}

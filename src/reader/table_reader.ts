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
import * as protos from '../../protos/protos';
import {TableReference, ReadClient} from './read_client';
import {Readable} from 'stream';
import {logger} from '../util/logger';
import {ResourceStream} from '@google-cloud/paginator';

type ReadSession = protos.google.cloud.bigquery.storage.v1.IReadSession;
type DataFormat = protos.google.cloud.bigquery.storage.v1.DataFormat;
const DataFormat = protos.google.cloud.bigquery.storage.v1.DataFormat;
interface ListParams {
  /**
   * Row limit of the table.
   */
  maxResults?: number;
  /**
   * Subset of fields to return, supports select into sub fields. Example: selected_fields = "a,e.d.f";
   */
  selectedFields?: string;
}
interface TableCell {
  v?: any;
}
interface TableRow {
  /**
   * Represents a single row in the result set, consisting of one or more fields.
   */
  f?: Array<TableCell>;
}
interface TableDataList {
  /**
   * Rows of results.
   */
  rows?: Array<TableRow>;
  /**
   * Total rows of the entire table. In order to show default value 0 we have to present it as string.
   */
  totalRows?: string;
}

type GetRowsOptions = ListParams & {
  autoPaginate?: boolean;
  maxApiCalls?: number;
};
type RowsResponse = any[] | [any[], GetRowsOptions | null, TableDataList];

/**
 * A BigQuery Storage API Reader that can be used to reader data into BigQuery Table
 * using the Storage API.
 *
 * @class
 * @memberof reader
 */
export class TableReader {
  private _readClient: ReadClient;
  private _readStreams: ReadStream[];
  private _table: TableReference;

  /**
   * Creates a new Reader instance.
   *
   * @param {Object} params - The parameters for the JSONWriter.
   * @param {TableReference} params.table - The stream connection
   *   to the BigQuery streaming insert operation.
   */
  constructor(readClient: ReadClient, table: TableReference) {
    this._table = table;
    this._readClient = readClient;
    this._readStreams = [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private trace(msg: string, ...otherArgs: any[]) {
    logger(
      'table_reader',
      `[table: ${this._table.tableId}]`,
      msg,
      ...otherArgs
    );
  }

  async getRowsStream(
    options?: GetRowsOptions
  ): Promise<[ResourceStream<TableRow>, ReadSession]> {
    this.trace('getRowsStream', options);
    const session = await this._readClient.createReadSession({
      parent: `projects/${this._table.projectId}`,
      table: `projects/${this._table.projectId}/datasets/${this._table.datasetId}/tables/${this._table.tableId}`,
      dataFormat: DataFormat.ARROW,
      selectedFields: options?.selectedFields?.split(','),
    });
    this.trace(
      'session created',
      session.name,
      session.streams,
      session.estimatedRowCount
    );

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
    const stream = joined as ResourceStream<TableRow>;
    return [stream, session];
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
    const [stream] = await this.getRowsStream(options);
    const rows = await stream.toArray();
    return rows;
  }

  close() {
    this._readStreams.forEach(rs => {
      rs.close();
    });
  }
}

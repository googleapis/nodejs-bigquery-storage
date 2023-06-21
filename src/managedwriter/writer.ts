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

import {isDeepStrictEqual} from 'util';
import * as protos from '../../protos/protos';
import {PendingWrite} from './pending_write';
import {StreamConnection} from './stream_connection';

type AppendRowRequest =
  protos.google.cloud.bigquery.storage.v1.IAppendRowsRequest;
type IInt64Value = protos.google.protobuf.IInt64Value;
type ProtoData =
  protos.google.cloud.bigquery.storage.v1.AppendRowsRequest.IProtoData;
type IDescriptorProto = protos.google.protobuf.IDescriptorProto;
type DescriptorProto = protos.google.protobuf.DescriptorProto;

const DescriptorProto = protos.google.protobuf.DescriptorProto;

/**
 * A BigQuery Storage API Writer that can be used to write data into BigQuery Table
 * using the Storage API.
 *
 * @class
 * @memberof managedwriter
 */
export class Writer {
  private _protoDescriptor: DescriptorProto;
  private _streamConnection: StreamConnection;

  /**
   * Creates a new Writer instance.
   *
   * @param {Object} params - The parameters for the JSONWriter.
   * @param {StreamConnection} params.connection - The stream connection
   *   to the BigQuery streaming insert operation.
   * @param {IDescriptorProto} params.protoDescriptor - The proto descriptor
   *   for the JSON rows.
   */
  constructor(params: {
    connection: StreamConnection;
    protoDescriptor: IDescriptorProto;
  }) {
    const {connection, protoDescriptor} = params;
    this._streamConnection = connection;
    this._protoDescriptor = new DescriptorProto(protoDescriptor);
  }

  /**
   * Update the proto descriptor for the Writer.
   * Internally a reconnection event is gonna happen to apply
   * the new proto descriptor.
   *
   * @param {IDescriptorProto} protoDescriptor - The proto descriptor.
   */
  setProtoDescriptor(protoDescriptor: IDescriptorProto) {
    const protoDescriptorInstance = new DescriptorProto(protoDescriptor);
    if (!isDeepStrictEqual(protoDescriptorInstance, this._protoDescriptor)) {
      this._protoDescriptor = new DescriptorProto(protoDescriptor);
      // Reopen connection
      this._streamConnection.close();
      this._streamConnection.open();
    }
  }

  /**
   * Schedules the writing of rows at given offset.
   *
   * @param {google.cloud.bigquery.storage.v1.IProtoRows|null} rows - the rows in serialized format to write to BigQuery.
   * @param {number|Long|string|null} offsetValue - the offset of the first row.
   * @returns {managedwriter.PendingWrite} The pending write
   **/
  appendRows(
    rows: ProtoData['rows'],
    offsetValue?: IInt64Value['value']
  ): PendingWrite {
    let offset: AppendRowRequest['offset'];
    if (offsetValue) {
      offset = {
        value: offsetValue,
      };
    }
    const request: AppendRowRequest = {
      writeStream: this._streamConnection.getStreamId(),
      protoRows: {
        rows,
        writerSchema: {
          protoDescriptor: this._protoDescriptor.toJSON(),
        },
      },
      offset,
    };

    const pw = this._streamConnection.write(request);
    return pw;
  }

  close() {
    this._streamConnection.close();
  }
}

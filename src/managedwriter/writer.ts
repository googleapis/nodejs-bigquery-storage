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

export class Writer {
  private _protoDescriptor: DescriptorProto;
  private _streamConnection: StreamConnection;

  constructor(params: {
    connection: StreamConnection;
    protoDescriptor: IDescriptorProto;
  }) {
    const {connection, protoDescriptor} = params;
    this._streamConnection = connection;
    this._protoDescriptor = new DescriptorProto(protoDescriptor);
  }

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

  async close() {
    this._streamConnection.close();
  }
}

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

import {protobuf} from 'google-gax';
import * as protos from '../../protos/protos';
import {PendingWrite} from './pending_write';
import {StreamConnection, RemoveListener} from './stream_connection';
import * as adapt from '../adapt';
import {Writer} from './writer';

type TableSchema = protos.google.cloud.bigquery.storage.v1.ITableSchema;
type IInt64Value = protos.google.protobuf.IInt64Value;
type IDescriptorProto = protos.google.protobuf.IDescriptorProto;
type DescriptorProto = protos.google.protobuf.DescriptorProto;
type JSONPrimitive = string | number | boolean | null;
type JSONValue = JSONPrimitive | JSONObject | JSONArray;
type JSONObject = {[member: string]: JSONValue};
type JSONArray = Array<JSONValue>;
type JSONList = Array<JSONObject>;

const DescriptorProto = protos.google.protobuf.DescriptorProto;
const {Type} = protobuf;

export class JSONWriter {
  private _writer: Writer;
  private _type: protobuf.Type;
  private _schemaListener: RemoveListener;

  constructor(params: {
    connection: StreamConnection;
    protoDescriptor: IDescriptorProto;
  }) {
    const {connection, protoDescriptor} = params;
    const normalized = adapt.normalizeDescriptor(
      new DescriptorProto(protoDescriptor)
    );
    this._type = (Type as any).fromDescriptor(normalized);
    this._writer = new Writer({
      connection,
      protoDescriptor,
    });
    this._schemaListener = connection.onSchemaUpdated(this._onSchemaUpdated);
  }

  _onSchemaUpdated(schema: TableSchema): void {
    const protoDescriptor = adapt.convertStorageSchemaToProto2Descriptor(
      schema,
      'root'
    );
    const normalized = adapt.normalizeDescriptor(
      new DescriptorProto(protoDescriptor)
    );
    this._type = (Type as any).fromDescriptor(normalized);
  }

  appendRows(rows: JSONList, offsetValue?: IInt64Value['value']): PendingWrite {
    const serializedRows = rows.map(r => {
      const msg = this._type.create(r);
      return this._type.encode(msg).finish();
    });
    const pw = this._writer.appendRows(
      {
        serializedRows,
      },
      offsetValue
    );
    return pw;
  }

  async close() {
    this._writer.close();
    this._schemaListener.off();
  }
}

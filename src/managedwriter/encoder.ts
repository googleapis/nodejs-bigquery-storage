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

import * as protobuf from 'protobufjs';
import * as protos from '../../protos/protos';
import {normalizeDescriptor} from '../adapt/proto';
import * as extend from 'extend';

type IDescriptorProto = protos.google.protobuf.IDescriptorProto;
type DescriptorProto = protos.google.protobuf.DescriptorProto;

const DescriptorProto = protos.google.protobuf.DescriptorProto;
const {Type} = protobuf;

/**
 * Internal class used by the JSONWriter to convert JSON data to protobuf messages.
 * It can be configure to do some data conversion to match what BigQuery expects.
 *
 * @class
 * @memberof managedwriter
 */
export class JSONEncoder {
  private _type: protobuf.Type = Type.fromJSON('root', {
    fields: {},
  });
  private _convertDates: boolean;

  /**
   * Creates a new JSONEncoder instance.
   *
   * @param {Object} params - The parameters for the JSONEncoder.
   * @param {IDescriptorProto} params.protoDescriptor - The proto descriptor
   *   for the JSON rows.
   * @param {boolean} params.convertDates - Deep inspect each appended row object
   *   and convert Javascript Date to the proper BigQuery Protobuf representation
   *   per https://cloud.google.com/bigquery/docs/write-api#data_type_conversions.
   *   This is an EXPERIMENTAL parameter and subject to change or removal without notice.
   */
  constructor(params: {
    protoDescriptor: IDescriptorProto;
    convertDates?: boolean;
  }) {
    const {convertDates, protoDescriptor} = params;
    this._convertDates = convertDates || false;
    this.setProtoDescriptor(protoDescriptor);
  }

  /**
   * Update the proto descriptor for the Encoder.
   *
   * @param {IDescriptorProto} protoDescriptor - The proto descriptor.
   */
  setProtoDescriptor(protoDescriptor: IDescriptorProto): void {
    const normalized = normalizeDescriptor(
      new DescriptorProto(protoDescriptor)
    );
    this._type = Type.fromDescriptor(normalized);
  }

  /**
   * Writes a JSONList that contains objects to be written to the BigQuery table by first converting
   * the JSON data to protobuf messages, then using Writer's appendRows() to write the data at current end
   * of stream. If there is a schema update, the current Writer is closed and reopened with the updated schema.
   *
   * @param {JSONList} rows - The list of JSON rows.
   * @returns {Uint8Array[]} The encoded rows.
   */
  encodeRows(rows: any[]): Uint8Array[] {
    const serializedRows = rows
      .map(r => {
        const converted = this.convertRow(r);
        console.log('Original', r);
        console.log('Converted', converted);
        return converted;
      })
      .map(r => {
        return this.encodeRow(r);
      });
    return serializedRows;
  }

  private isPlainObject(value: any): boolean {
    return value && [undefined, Object].includes(value.constructor);
  }

  private encodeRow(row: any): Uint8Array {
    const msg = this._type.create(row);
    return this._type.encode(msg).finish();
  }

  private convertRow(source: any): Object {
    if (!this._convertDates) {
      return source;
    }
    const row = extend(true, {}, source);
    for (const key in row) {
      const value = row[key];
      if (value === null) {
        continue;
      }
      if (value instanceof Date) {
        const pfield = this._type.fields[key];
        if (!pfield) {
          continue;
        }
        switch (pfield.type) {
          case 'int32': // DATE
            // The value is the number of days since the Unix epoch (1970-01-01)
            row[key] = value.getTime() / (1000 * 60 * 60 * 24);
            break;
          case 'int64': // TIMESTAMP
            // The value is given in microseconds since the Unix epoch (1970-01-01)
            row[key] = value.getTime() * 1000;
            break;
          case 'string': // DATETIME
            row[key] = value.toJSON().replace(/^(.*)T(.*)Z$/, '$1 $2');
            break;
        }
        continue;
      }
      if (Array.isArray(value)) {
        row[key] = value.map(v => {
          if (!this.isPlainObject(v)) {
            return v;
          }
          return this.convertRow(v);
        });
        continue;
      }
      if (this.isPlainObject(value)) {
        row[key] = this.convertRow(value);
        continue;
      }
    }
    return row;
  }
}

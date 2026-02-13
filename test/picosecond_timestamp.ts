// Copyright 2025 Google LLC
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

import * as assert from 'assert';
import {describe, it} from 'mocha';
import * as protobuf from 'protobufjs';
import * as adapt from '../src/adapt';
import {protos} from '../src';
import {JSONEncoder} from '../src/managedwriter/encoder';

const TableFieldSchema = protos.google.cloud.bigquery.storage.v1.TableFieldSchema;
const {Type} = protobuf;

describe('Picosecond Timestamp Support', () => {
  describe('Schema conversion', () => {
    it('should carry over timestampPrecision to StorageTableField', () => {
      const schema = {
        fields: [
          {
            name: 'ts_pico',
            type: 'TIMESTAMP',
            timestampPrecision: 12,
          },
          {
            name: 'ts_micro',
            type: 'TIMESTAMP',
            timestampPrecision: 6,
          },
          {
            name: 'ts_default',
            type: 'TIMESTAMP',
          },
        ],
      };
      const storageSchema = adapt.convertBigQuerySchemaToStorageTableSchema(schema);
      assert.strictEqual(Number(storageSchema.fields![0].timestampPrecision), 12);
      assert.strictEqual(Number(storageSchema.fields![1].timestampPrecision), 6);
      assert.strictEqual(storageSchema.fields![2].timestampPrecision, undefined);
    });
  });

  describe('Dynamic Proto generation', () => {
    it('should map TIMESTAMP with precision 12 to TYPE_STRING', () => {
      const storageSchema = {
        fields: [
          {
            name: 'ts_pico',
            type: TableFieldSchema.Type.TIMESTAMP,
            timestampPrecision: 12,
          },
          {
            name: 'ts_micro',
            type: TableFieldSchema.Type.TIMESTAMP,
            timestampPrecision: 6,
          },
        ],
      };
      const protoDescriptor = adapt.convertStorageSchemaToProto2Descriptor(
        storageSchema,
        'TestPico'
      );
      assert.strictEqual(protoDescriptor.field![0].name, 'ts_pico');
      assert.strictEqual(protoDescriptor.field![0].type, protos.google.protobuf.FieldDescriptorProto.Type.TYPE_STRING);
      assert.strictEqual(protoDescriptor.field![1].name, 'ts_micro');
      assert.strictEqual(protoDescriptor.field![1].type, protos.google.protobuf.FieldDescriptorProto.Type.TYPE_INT64);
    });
  });

  describe('JSONEncoder', () => {
    it('should preserve picosecond timestamp strings', () => {
      const storageSchema = {
        fields: [
          {
            name: 'ts_pico',
            type: TableFieldSchema.Type.TIMESTAMP,
            timestampPrecision: 12,
          },
        ],
      };
      const protoDescriptor = adapt.convertStorageSchemaToProto2Descriptor(
        storageSchema,
        'TestEncoder'
      );
      const encoder = new JSONEncoder({protoDescriptor});
      const picoStr = '2025-05-07T20:17:05.123456789012Z';
      const rows = [{ts_pico: picoStr}];
      const encodedRows = encoder.encodeRows(rows);

      const TestProto = Type.fromDescriptor(protoDescriptor);
      const decoded = TestProto.decode(encodedRows[0]).toJSON();
      assert.strictEqual(decoded.ts_pico, picoStr);
    });

    it('should format Date objects for picosecond TIMESTAMP fields', () => {
      const storageSchema = {
        fields: [
          {
            name: 'ts_pico',
            type: TableFieldSchema.Type.TIMESTAMP,
            timestampPrecision: 12,
          },
        ],
      };
      const protoDescriptor = adapt.convertStorageSchemaToProto2Descriptor(
        storageSchema,
        'TestEncoderDate'
      );
      const encoder = new JSONEncoder({protoDescriptor});
      const date = new Date('2025-05-07T20:17:05.123Z');
      const rows = [{ts_pico: date}];
      const encodedRows = encoder.encodeRows(rows);

      const TestProto = Type.fromDescriptor(protoDescriptor);
      const decoded = TestProto.decode(encodedRows[0]).toJSON();
      // Currently it formats as DATETIME string: "YYYY-MM-DD HH:MM:SS.SSS"
      // Wait, let's see what value.toJSON().replace(/^(.*)T(.*)Z$/, '$1 $2') does.
      // 2025-05-07T20:17:05.123Z -> 2025-05-07 20:17:05.123
      assert.strictEqual(decoded.ts_pico, '2025-05-07 20:17:05.123');
    });
  });
});

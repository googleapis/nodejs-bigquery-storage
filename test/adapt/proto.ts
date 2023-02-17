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

import * as assert from 'assert';
import {describe, it} from 'mocha';
import {protobuf} from 'google-gax';
import * as adaptModule from '../../src/adapt';
import {TableSchema} from '@google-cloud/bigquery';

const {Root} = protobuf;

describe('AdaptProto', () => {
  describe('Schema to Proto Descriptor conversion', () => {
    it('basic', () => {
      const schema: TableSchema = {
        fields: [
          {
            name: 'foo',
            type: 'STRING',
            mode: 'NULLABLE',
          },
          {
            name: 'bar',
            type: 'FLOAT',
            mode: 'REQUIRED',
          },
          {
            name: 'baz',
            type: 'STRING',
            mode: 'REPEATED',
          },
          {
            name: 'bat',
            type: 'BOOL',
            mode: 'REPEATED',
          },
        ],
      };
      const storageSchema =
        adaptModule.convertBigQuerySchemaToStorageTableSchema(schema);
      const protoDescriptor =
        adaptModule.convertStorageSchemaToProto2Descriptor(
          storageSchema,
          'Test'
        );
      assert.notEqual(protoDescriptor, null);
      if (!protoDescriptor) {
        throw Error('null proto descriptor set');
      }
      assert.deepEqual(JSON.parse(JSON.stringify(protoDescriptor)), {
        file: [
          {
            name: 'Test.proto',
            messageType: [
              {
                name: 'Test',
                field: [
                  {
                    name: 'foo',
                    number: 1,
                    label: 'LABEL_OPTIONAL',
                    type: 'TYPE_STRING',
                    options: {packed: false},
                  },
                  {
                    name: 'bar',
                    number: 2,
                    label: 'LABEL_REQUIRED',
                    type: 'TYPE_DOUBLE',
                    options: {packed: false},
                  },
                  {
                    name: 'baz',
                    number: 3,
                    label: 'LABEL_REPEATED',
                    type: 'TYPE_STRING',
                    options: {packed: false},
                  },
                  {
                    name: 'bat',
                    number: 4,
                    label: 'LABEL_REPEATED',
                    type: 'TYPE_BOOL',
                    options: {packed: true},
                  },
                ],
              },
            ],
            syntax: 'proto2',
          },
        ],
      });
      const json = adaptModule.fileDescriptorSetToNamespace(protoDescriptor);
      const root = Root.fromJSON(json);
      const TestProto = root.lookupType('Test');
      const raw = {
        foo: 'name',
        bar: 42,
        baz: ['A', 'B'],
        bat: [true, false],
      };
      const serialized = TestProto.encode(raw).finish();
      const decoded = TestProto.decode(serialized).toJSON();
      assert.deepEqual(raw, decoded);
    });

    it('nested struct', () => {
      const schema: TableSchema = {
        fields: [
          {
            name: 'record_id',
            type: 'INT64',
            mode: 'NULLABLE',
          },
          {
            name: 'details',
            type: 'STRUCT',
            mode: 'REPEATED',
            fields: [
              {
                name: 'key',
                type: 'STRING',
                mode: 'REQUIRED',
              },
              {
                name: 'value',
                type: 'STRING',
                mode: 'NULLABLE',
              },
            ],
          },
        ],
      };
      const storageSchema =
        adaptModule.convertBigQuerySchemaToStorageTableSchema(schema);
      const protoDescriptor =
        adaptModule.convertStorageSchemaToProto2Descriptor(
          storageSchema,
          'Nested'
        );
      assert.notEqual(protoDescriptor, null);
      if (!protoDescriptor) {
        throw Error('null proto descriptor set');
      }
      assert.deepEqual(JSON.parse(JSON.stringify(protoDescriptor)), {
        file: [
          {
            name: 'Nested.proto',
            dependency: ['Nested_details.proto'],
            messageType: [
              {
                name: 'Nested',
                field: [
                  {
                    name: 'record_id',
                    number: 1,
                    label: 'LABEL_OPTIONAL',
                    type: 'TYPE_INT64',
                    options: {packed: false},
                  },
                  {
                    name: 'details',
                    number: 2,
                    label: 'LABEL_REPEATED',
                    typeName: 'Nested_details',
                  },
                ],
              },
            ],
            syntax: 'proto2',
          },
          {
            name: 'Nested_details.proto',
            messageType: [
              {
                name: 'Nested_details',
                field: [
                  {
                    name: 'key',
                    number: 1,
                    label: 'LABEL_REQUIRED',
                    type: 'TYPE_STRING',
                    options: {packed: false},
                  },
                  {
                    name: 'value',
                    number: 2,
                    label: 'LABEL_OPTIONAL',
                    type: 'TYPE_STRING',
                    options: {packed: false},
                  },
                ],
              },
            ],
            syntax: 'proto2',
          },
        ],
      });
      const json = adaptModule.fileDescriptorSetToNamespace(protoDescriptor);
      const root = Root.fromJSON(json);
      const NestedProto = root.lookupType('Nested');
      const raw = {
        record_id: '12345',
        details: [
          {key: 'name', value: 'jimmy'},
          {key: 'title', value: 'clown'},
        ],
      };
      const serialized = NestedProto.encode(raw).finish();
      const decoded = NestedProto.decode(serialized).toJSON();
      assert.deepEqual(raw, decoded);
    });
  });
});

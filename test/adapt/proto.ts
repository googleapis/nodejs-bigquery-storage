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
import * as protobuf from 'protobufjs';
import * as adapt from '../../src/adapt';
import * as messagesJSON from '../../samples/testdata/messages.json';
import * as protos from '../../protos/protos';

const DescriptorProto = protos.google.protobuf.DescriptorProto;
const {Root, Type} = protobuf;

describe('Adapt Protos', () => {
  describe('Schema to Proto Descriptor conversion', () => {
    it('basic', () => {
      const schema = {
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
        adapt.convertBigQuerySchemaToStorageTableSchema(schema);
      const protoDescriptor = adapt.convertStorageSchemaToProto2Descriptor(
        storageSchema,
        'Test'
      );
      assert.notEqual(protoDescriptor, null);
      if (!protoDescriptor) {
        throw Error('null proto descriptor set');
      }
      const TestProto = Type.fromDescriptor(protoDescriptor);
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
      const schema = {
        fields: [
          {
            name: 'record_id',
            type: 'INT64',
            mode: 'NULLABLE',
          },
          {
            name: 'recordDetails',
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
          {
            name: 'metadata',
            type: 'STRUCT',
            mode: 'NULLABLE',
            fields: [
              {
                name: 'createdAt',
                type: 'TIMESTAMP',
                mode: 'REQUIRED',
              },
              {
                name: 'updatedAt',
                type: 'TIMESTAMP',
                mode: 'NULLABLE',
              },
            ],
          },
        ],
      };
      const storageSchema =
        adapt.convertBigQuerySchemaToStorageTableSchema(schema);
      const protoDescriptor = adapt.convertStorageSchemaToProto2Descriptor(
        storageSchema,
        'Nested'
      );
      assert.notEqual(protoDescriptor, null);
      if (!protoDescriptor) {
        throw Error('null proto descriptor set');
      }
      assert.deepEqual(JSON.parse(JSON.stringify(protoDescriptor)), {
        name: 'Nested',
        field: [
          {
            name: 'record_id',
            number: 1,
            label: 'LABEL_OPTIONAL',
            type: 'TYPE_INT64',
            options: {},
          },
          {
            name: 'recordDetails',
            number: 2,
            label: 'LABEL_REPEATED',
            type: 'TYPE_MESSAGE',
            typeName: 'Nested_recordDetails',
          },
          {
            name: 'metadata',
            number: 3,
            label: 'LABEL_OPTIONAL',
            type: 'TYPE_MESSAGE',
            typeName: 'Nested_metadata',
          },
        ],
        nestedType: [
          {
            name: 'Nested_recordDetails',
            field: [
              {
                name: 'key',
                number: 1,
                label: 'LABEL_REQUIRED',
                type: 'TYPE_STRING',
                options: {},
              },
              {
                name: 'value',
                number: 2,
                label: 'LABEL_OPTIONAL',
                type: 'TYPE_STRING',
                options: {},
              },
            ],
          },
          {
            name: 'Nested_metadata',
            field: [
              {
                name: 'createdAt',
                number: 1,
                label: 'LABEL_REQUIRED',
                type: 'TYPE_INT64',
                options: {},
              },
              {
                name: 'updatedAt',
                number: 2,
                label: 'LABEL_OPTIONAL',
                type: 'TYPE_INT64',
                options: {},
              },
            ],
          },
        ],
      });
      const NestedProto = Type.fromDescriptor(protoDescriptor);
      const raw = {
        record_id: '12345',
        recordDetails: [
          {key: 'name', value: 'jimmy'},
          {key: 'title', value: 'clown'},
        ],
        metadata: {
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      };
      const serialized = NestedProto.encode(raw).finish();
      const decoded = NestedProto.decode(serialized).toJSON();
      assert.deepEqual(raw, decoded);
    });
  });

  describe('Proto descriptor normalization', () => {
    it('bundle multiple proto descriptors into one', () => {
      const root = Root.fromJSON(messagesJSON).resolveAll();
      const descriptor = root
        .lookupType('testdata.GithubArchiveMessage')
        .add(root.lookupType('testdata.GithubArchiveRepo'))
        .add(root.lookupType('testdata.GithubArchiveEntity'))
        .toDescriptor('proto2');
      const normalized = adapt
        .normalizeDescriptor(new DescriptorProto(descriptor))
        .toJSON();
      assert.deepEqual(normalized, {
        name: 'GithubArchiveMessage',
        field: [
          {
            name: 'type',
            number: 1,
            label: 'LABEL_OPTIONAL',
            type: 'TYPE_STRING',
            options: {},
          },
          {
            name: 'public',
            number: 2,
            label: 'LABEL_OPTIONAL',
            type: 'TYPE_BOOL',
            options: {},
          },
          {
            name: 'payload',
            number: 3,
            label: 'LABEL_OPTIONAL',
            type: 'TYPE_STRING',
            options: {},
          },
          {
            name: 'repo',
            number: 4,
            label: 'LABEL_OPTIONAL',
            type: 'TYPE_MESSAGE',
            typeName: 'GithubArchiveRepo',
            options: {},
          },
          {
            name: 'actor',
            number: 5,
            label: 'LABEL_OPTIONAL',
            type: 'TYPE_MESSAGE',
            typeName: 'GithubArchiveEntity',
            options: {},
          },
          {
            name: 'org',
            number: 6,
            label: 'LABEL_OPTIONAL',
            type: 'TYPE_MESSAGE',
            typeName: 'GithubArchiveEntity',
            options: {},
          },
          {
            name: 'created_at',
            number: 7,
            label: 'LABEL_OPTIONAL',
            type: 'TYPE_INT64',
            options: {},
          },
          {
            name: 'id',
            number: 8,
            label: 'LABEL_OPTIONAL',
            type: 'TYPE_STRING',
            options: {},
          },
          {
            name: 'other',
            number: 9,
            label: 'LABEL_OPTIONAL',
            type: 'TYPE_STRING',
            options: {},
          },
        ],
        nestedType: [
          {
            name: 'GithubArchiveRepo',
            field: [
              {
                name: 'id',
                number: 1,
                label: 'LABEL_OPTIONAL',
                type: 'TYPE_INT64',
                options: {},
              },
              {
                name: 'name',
                number: 2,
                label: 'LABEL_OPTIONAL',
                type: 'TYPE_STRING',
                options: {},
              },
              {
                name: 'url',
                number: 3,
                label: 'LABEL_OPTIONAL',
                type: 'TYPE_STRING',
                options: {},
              },
            ],
          },
          {
            name: 'GithubArchiveEntity',
            field: [
              {
                name: 'id',
                number: 1,
                label: 'LABEL_OPTIONAL',
                type: 'TYPE_INT64',
                options: {},
              },
              {
                name: 'login',
                number: 2,
                label: 'LABEL_OPTIONAL',
                type: 'TYPE_STRING',
                options: {},
              },
              {
                name: 'gravatar_id',
                number: 3,
                label: 'LABEL_OPTIONAL',
                type: 'TYPE_STRING',
                options: {},
              },
              {
                name: 'avatar_url',
                number: 4,
                label: 'LABEL_OPTIONAL',
                type: 'TYPE_STRING',
                options: {},
              },
              {
                name: 'url',
                number: 5,
                label: 'LABEL_OPTIONAL',
                type: 'TYPE_STRING',
                options: {},
              },
            ],
          },
        ],
      });
    });
    it('nested proto with enum', () => {
      const root = Root.fromJSON(messagesJSON).resolveAll();
      const descriptor = root
        .lookupType('testdata.ExternalEnumMessage')
        .add(root.lookupType('testdata.EnumMsgA'))
        .add(root.lookupType('testdata.EnumMsgB'))
        .add(root.lookupEnum('testdata.ExtEnum'))
        .toDescriptor('proto2');
      const normalized = adapt
        .normalizeDescriptor(new DescriptorProto(descriptor))
        .toJSON();
      assert.deepEqual(normalized, {
        name: 'ExternalEnumMessage',
        field: [
          {
            name: 'msg_a',
            number: 1,
            label: 'LABEL_OPTIONAL',
            type: 'TYPE_MESSAGE',
            typeName: 'EnumMsgA',
            options: {},
          },
          {
            name: 'msg_b',
            number: 2,
            label: 'LABEL_OPTIONAL',
            type: 'TYPE_MESSAGE',
            typeName: 'EnumMsgB',
            options: {},
          },
        ],
        nestedType: [
          {
            name: 'EnumMsgA',
            field: [
              {
                name: 'foo',
                number: 1,
                label: 'LABEL_OPTIONAL',
                type: 'TYPE_STRING',
                options: {},
              },
              {
                name: 'bar',
                number: 2,
                label: 'LABEL_OPTIONAL',
                type: 'TYPE_ENUM',
                typeName: 'ExtEnum',
                options: {},
              },
            ],
          },
          {
            name: 'EnumMsgB',
            field: [
              {
                name: 'baz',
                number: 1,
                label: 'LABEL_OPTIONAL',
                type: 'TYPE_ENUM',
                typeName: 'ExtEnum',
                options: {},
              },
            ],
          },
        ],
        enumType: [
          {
            name: 'ExtEnum',
            value: [
              {name: 'UNDEFINED', number: 0},
              {name: 'THING', number: 1},
              {name: 'OTHER_THING', number: 2},
            ],
          },
        ],
      });
    });
  });
});

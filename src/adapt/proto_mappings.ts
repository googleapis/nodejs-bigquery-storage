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

import {protobuf} from 'google-gax';
import * as protos from '../../protos/protos';
type TableSchema = protos.google.cloud.bigquery.storage.v1.ITableSchema;
type TableFieldSchema =
  protos.google.cloud.bigquery.storage.v1.ITableFieldSchema;
type FieldDescriptorProto = protos.google.protobuf.IFieldDescriptorProto;
type FileDescriptorProto = protos.google.protobuf.IFileDescriptorProto;
type FileDescriptorSet = protos.google.protobuf.FileDescriptorSet;
type DescriptorProto = protos.google.protobuf.DescriptorProto;
type FieldDescriptorProtoType =
  protos.google.protobuf.FieldDescriptorProto['type'];
type TableFieldSchemaType =
  protos.google.cloud.bigquery.storage.v1.TableFieldSchema['type'];
type TableFieldSchemaMode =
  protos.google.cloud.bigquery.storage.v1.TableFieldSchema['mode'];
type FieldDescriptorProtoLabel =
  protos.google.protobuf.FieldDescriptorProto.Label;
type IFieldRule = 'optional' | 'required' | 'repeated' | undefined;

type Namespace = {
  nested: {
    [k: string]: {
      fields: {
        [k: string]: protobuf.IField;
      };
    };
  };
};

const TableFieldSchema =
  protos.google.cloud.bigquery.storage.v1.TableFieldSchema;
const DescriptorProto = protos.google.protobuf.DescriptorProto;
const FieldDescriptorProto = protos.google.protobuf.FieldDescriptorProto;
const FileDescriptorProto = protos.google.protobuf.FileDescriptorProto;
const FileDescriptorSet = protos.google.protobuf.FileDescriptorSet;

export const labelToFieldRuleMap: Record<
  protos.google.protobuf.FieldDescriptorProto['label'],
  IFieldRule
> = {
  LABEL_OPTIONAL: 'optional',
  '1': 'optional',
  LABEL_REQUIRED: 'required',
  '2': 'required',
  LABEL_REPEATED: 'repeated',
  '3': 'repeated',
};

// Reference https://cloud.google.com/bigquery/docs/write-api#data_type_conversions
export const bqTypeToFieldTypeMap: Record<
  TableFieldSchemaType,
  FieldDescriptorProtoType | null
> = {
  [TableFieldSchema.Type.BIGNUMERIC]: FieldDescriptorProto.Type.TYPE_STRING,
  BIGNUMERIC: FieldDescriptorProto.Type.TYPE_STRING,
  [TableFieldSchema.Type.BOOL]: FieldDescriptorProto.Type.TYPE_BOOL,
  BOOL: FieldDescriptorProto.Type.TYPE_BOOL,
  [TableFieldSchema.Type.BYTES]: FieldDescriptorProto.Type.TYPE_BYTES,
  BYTES: FieldDescriptorProto.Type.TYPE_BYTES,
  [TableFieldSchema.Type.DATE]: FieldDescriptorProto.Type.TYPE_INT32,
  DATE: FieldDescriptorProto.Type.TYPE_INT32,
  [TableFieldSchema.Type.DATETIME]: FieldDescriptorProto.Type.TYPE_STRING,
  DATETIME: FieldDescriptorProto.Type.TYPE_STRING,
  [TableFieldSchema.Type.DOUBLE]: FieldDescriptorProto.Type.TYPE_DOUBLE,
  DOUBLE: FieldDescriptorProto.Type.TYPE_DOUBLE,
  [TableFieldSchema.Type.GEOGRAPHY]: FieldDescriptorProto.Type.TYPE_STRING,
  GEOGRAPHY: FieldDescriptorProto.Type.TYPE_STRING,
  [TableFieldSchema.Type.INT64]: FieldDescriptorProto.Type.TYPE_INT64,
  INT64: FieldDescriptorProto.Type.TYPE_INT64,
  [TableFieldSchema.Type.NUMERIC]: FieldDescriptorProto.Type.TYPE_STRING,
  NUMERIC: FieldDescriptorProto.Type.TYPE_STRING,
  [TableFieldSchema.Type.STRING]: FieldDescriptorProto.Type.TYPE_STRING,
  STRING: FieldDescriptorProto.Type.TYPE_STRING,
  [TableFieldSchema.Type.STRUCT]: FieldDescriptorProto.Type.TYPE_MESSAGE,
  STRUCT: FieldDescriptorProto.Type.TYPE_MESSAGE,
  [TableFieldSchema.Type.TIME]: FieldDescriptorProto.Type.TYPE_STRING,
  TIME: FieldDescriptorProto.Type.TYPE_STRING,
  [TableFieldSchema.Type.TIMESTAMP]: FieldDescriptorProto.Type.TYPE_INT64,
  TIMESTAMP: FieldDescriptorProto.Type.TYPE_INT64,
  [TableFieldSchema.Type.JSON]: FieldDescriptorProto.Type.TYPE_STRING,
  JSON: protos.google.protobuf.FieldDescriptorProto.Type.TYPE_STRING,
  [TableFieldSchema.Type.TYPE_UNSPECIFIED]: null,
  TYPE_UNSPECIFIED: null,
  [TableFieldSchema.Type.INTERVAL]: null,
  INTERVAL: null,
};

export const fieldTypeLabelMap: Record<FieldDescriptorProtoType, string> = {
  [FieldDescriptorProto.Type.TYPE_DOUBLE]: 'TYPE_DOUBLE',
  TYPE_DOUBLE: 'TYPE_DOUBLE',
  [FieldDescriptorProto.Type.TYPE_FLOAT]: 'TYPE_FLOAT',
  TYPE_FLOAT: 'TYPE_FLOAT',
  [FieldDescriptorProto.Type.TYPE_INT64]: 'TYPE_INT64',
  TYPE_INT64: 'TYPE_INT64',
  [FieldDescriptorProto.Type.TYPE_UINT64]: 'TYPE_UINT64',
  TYPE_UINT64: 'TYPE_UINT64',
  [FieldDescriptorProto.Type.TYPE_INT32]: 'TYPE_INT32',
  TYPE_INT32: 'TYPE_INT32',
  [FieldDescriptorProto.Type.TYPE_FIXED64]: 'TYPE_FIXED64',
  TYPE_FIXED64: 'TYPE_FIXED64',
  [FieldDescriptorProto.Type.TYPE_FIXED32]: 'TYPE_FIXED32',
  TYPE_FIXED32: 'TYPE_FIXED32',
  [FieldDescriptorProto.Type.TYPE_BOOL]: 'TYPE_BOOL',
  TYPE_BOOL: 'TYPE_BOOL',
  [FieldDescriptorProto.Type.TYPE_STRING]: 'TYPE_STRING',
  TYPE_STRING: 'TYPE_STRING',
  [FieldDescriptorProto.Type.TYPE_GROUP]: 'TYPE_GROUP',
  TYPE_GROUP: 'TYPE_GROUP',
  [FieldDescriptorProto.Type.TYPE_MESSAGE]: 'TYPE_MESSAGE',
  TYPE_MESSAGE: 'TYPE_MESSAGE',
  [FieldDescriptorProto.Type.TYPE_BYTES]: 'TYPE_BYTES',
  TYPE_BYTES: 'TYPE_BYTES',
  [FieldDescriptorProto.Type.TYPE_UINT32]: 'TYPE_UINT32',
  TYPE_UINT32: 'TYPE_UINT32',
  [FieldDescriptorProto.Type.TYPE_ENUM]: 'TYPE_ENUM',
  TYPE_ENUM: 'TYPE_ENUM',
  [FieldDescriptorProto.Type.TYPE_SFIXED32]: 'TYPE_SFIXED32',
  TYPE_SFIXED32: 'TYPE_SFIXED32',
  [FieldDescriptorProto.Type.TYPE_SFIXED64]: 'TYPE_SFIXED64',
  TYPE_SFIXED64: 'TYPE_SFIXED64',
  [FieldDescriptorProto.Type.TYPE_SINT32]: 'TYPE_SINT32',
  TYPE_SINT32: 'TYPE_SINT32',
  [FieldDescriptorProto.Type.TYPE_SINT64]: 'TYPE_SINT64',
  TYPE_SINT64: 'TYPE_SINT64',
};

export const bqModeToFieldLabelMapProto2: Record<
  TableFieldSchemaMode,
  FieldDescriptorProtoLabel | null
> = {
  [TableFieldSchema.Mode.NULLABLE]: FieldDescriptorProto.Label.LABEL_OPTIONAL,
  NULLABLE: FieldDescriptorProto.Label.LABEL_OPTIONAL,
  [TableFieldSchema.Mode.REPEATED]: FieldDescriptorProto.Label.LABEL_REPEATED,
  REPEATED: FieldDescriptorProto.Label.LABEL_REPEATED,
  [TableFieldSchema.Mode.REQUIRED]: FieldDescriptorProto.Label.LABEL_REQUIRED,
  REQUIRED: FieldDescriptorProto.Label.LABEL_REQUIRED,
  [TableFieldSchema.Mode.MODE_UNSPECIFIED]: null,
  MODE_UNSPECIFIED: null,
};

export const bqModeToFieldLabelMapProto3: Record<
  TableFieldSchemaMode,
  FieldDescriptorProtoLabel | null
> = {
  [TableFieldSchema.Mode.NULLABLE]: FieldDescriptorProto.Label.LABEL_OPTIONAL,
  NULLABLE: FieldDescriptorProto.Label.LABEL_OPTIONAL,
  [protos.google.cloud.bigquery.storage.v1.TableFieldSchema.Mode.REPEATED]:
    FieldDescriptorProto.Label.LABEL_REPEATED,
  REPEATED: FieldDescriptorProto.Label.LABEL_REPEATED,
  [protos.google.cloud.bigquery.storage.v1.TableFieldSchema.Mode.REQUIRED]:
    FieldDescriptorProto.Label.LABEL_OPTIONAL,
  REQUIRED: FieldDescriptorProto.Label.LABEL_REQUIRED,
  [protos.google.cloud.bigquery.storage.v1.TableFieldSchema.Mode
    .MODE_UNSPECIFIED]: null,
  MODE_UNSPECIFIED: null,
};

export function convertModeToLabel(
  mode: TableFieldSchema['mode'],
  useProto3: Boolean
): FieldDescriptorProtoLabel | null {
  if (!mode) {
    return null;
  }
  return useProto3
    ? bqModeToFieldLabelMapProto3[mode]
    : bqModeToFieldLabelMapProto2[mode];
}

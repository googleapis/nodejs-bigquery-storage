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
type Namespace = protobuf.INamespace;
type FieldDescriptorProtoType =
  protos.google.protobuf.FieldDescriptorProto['type'];
type TableFieldSchemaType =
  protos.google.cloud.bigquery.storage.v1.TableFieldSchema['type'];
type TableFieldSchemaMode =
  protos.google.cloud.bigquery.storage.v1.TableFieldSchema['mode'];
type FieldDescriptorProtoLabel =
  protos.google.protobuf.FieldDescriptorProto.Label;
type IFieldRule = 'optional' | 'required' | 'repeated' | undefined;

const TableFieldSchema =
  protos.google.cloud.bigquery.storage.v1.TableFieldSchema;
const DescriptorProto = protos.google.protobuf.DescriptorProto;
const FieldDescriptorProto = protos.google.protobuf.FieldDescriptorProto;
const FileDescriptorProto = protos.google.protobuf.FileDescriptorProto;
const FileDescriptorSet = protos.google.protobuf.FileDescriptorSet;

const labelToFieldRuleMap: Record<
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

const packedTypes: FieldDescriptorProtoType[] = [
  FieldDescriptorProto.Type.TYPE_INT32,
  FieldDescriptorProto.Type.TYPE_INT64,
  FieldDescriptorProto.Type.TYPE_UINT32,
  FieldDescriptorProto.Type.TYPE_UINT64,
  FieldDescriptorProto.Type.TYPE_SINT32,
  FieldDescriptorProto.Type.TYPE_SINT64,
  FieldDescriptorProto.Type.TYPE_FIXED32,
  FieldDescriptorProto.Type.TYPE_FIXED64,
  FieldDescriptorProto.Type.TYPE_SFIXED32,
  FieldDescriptorProto.Type.TYPE_SFIXED64,
  FieldDescriptorProto.Type.TYPE_FLOAT,
  FieldDescriptorProto.Type.TYPE_DOUBLE,
  FieldDescriptorProto.Type.TYPE_BOOL,
  FieldDescriptorProto.Type.TYPE_ENUM,
];

const bqTypeToFieldTypeMap: Record<
  TableFieldSchemaType,
  FieldDescriptorProtoType | null
> = {
  [TableFieldSchema.Type.BIGNUMERIC]: FieldDescriptorProto.Type.TYPE_BYTES,
  BIGNUMERIC: FieldDescriptorProto.Type.TYPE_BYTES,
  [TableFieldSchema.Type.BOOL]: FieldDescriptorProto.Type.TYPE_BOOL,
  BOOL: FieldDescriptorProto.Type.TYPE_BOOL,
  [TableFieldSchema.Type.BYTES]: FieldDescriptorProto.Type.TYPE_BYTES,
  BYTES: FieldDescriptorProto.Type.TYPE_BYTES,
  [TableFieldSchema.Type.DATE]: FieldDescriptorProto.Type.TYPE_INT32,
  DATE: FieldDescriptorProto.Type.TYPE_INT32,
  [TableFieldSchema.Type.DATETIME]: FieldDescriptorProto.Type.TYPE_INT64,
  DATETIME: FieldDescriptorProto.Type.TYPE_INT64,
  [TableFieldSchema.Type.DOUBLE]: FieldDescriptorProto.Type.TYPE_DOUBLE,
  DOUBLE: FieldDescriptorProto.Type.TYPE_DOUBLE,
  [TableFieldSchema.Type.GEOGRAPHY]: FieldDescriptorProto.Type.TYPE_STRING,
  GEOGRAPHY: FieldDescriptorProto.Type.TYPE_STRING,
  [TableFieldSchema.Type.INT64]: FieldDescriptorProto.Type.TYPE_INT64,
  INT64: FieldDescriptorProto.Type.TYPE_INT64,
  [TableFieldSchema.Type.NUMERIC]: FieldDescriptorProto.Type.TYPE_BYTES,
  NUMERIC: FieldDescriptorProto.Type.TYPE_BYTES,
  [TableFieldSchema.Type.STRING]: FieldDescriptorProto.Type.TYPE_STRING,
  STRING: FieldDescriptorProto.Type.TYPE_STRING,
  [TableFieldSchema.Type.STRUCT]: FieldDescriptorProto.Type.TYPE_MESSAGE,
  STRUCT: FieldDescriptorProto.Type.TYPE_MESSAGE,
  [TableFieldSchema.Type.TIME]: FieldDescriptorProto.Type.TYPE_INT64,
  TIME: FieldDescriptorProto.Type.TYPE_INT64,
  [TableFieldSchema.Type.TIMESTAMP]: FieldDescriptorProto.Type.TYPE_INT64,
  TIMESTAMP: FieldDescriptorProto.Type.TYPE_INT64,
  [TableFieldSchema.Type.JSON]: FieldDescriptorProto.Type.TYPE_STRING,
  JSON: protos.google.protobuf.FieldDescriptorProto.Type.TYPE_STRING,
  [TableFieldSchema.Type.TYPE_UNSPECIFIED]: null,
  TYPE_UNSPECIFIED: null,
  [TableFieldSchema.Type.INTERVAL]: null,
  INTERVAL: null,
};

const fieldTypeLabelMap: Record<FieldDescriptorProtoType, string> = {
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

const bqModeToFieldLabelMapProto2: Record<
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

const bqModeToFieldLabelMapProto3: Record<
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

// convertStorageSchemaToProto2Descriptor builds a FileDescriptorSet for a given table schema using proto2 syntax.
export function convertStorageSchemaToProto2Descriptor(
  schema: TableSchema,
  scope: string
): FileDescriptorSet | null {
  return convertStorageSchemaToFileDescriptorInternal(schema, scope, false);
}

// convertStorageSchemaToProto3Descriptor builds a FileDescriptorSet for a given table schema using proto3 syntax.
export function convertStorageSchemaToProto3Descriptor(
  schema: TableSchema,
  scope: string
): FileDescriptorSet | null {
  return convertStorageSchemaToFileDescriptorInternal(schema, scope, true);
}

function convertStorageSchemaToFileDescriptorInternal(
  schema: TableSchema,
  scope: string,
  useProto3: boolean
): FileDescriptorSet {
  let fNumber = 0;
  const fields: FieldDescriptorProto[] = [];
  const deps: Record<string, FileDescriptorProto> = {};
  for (const field of schema.fields || []) {
    fNumber += 1;
    const currentScope = `${scope}_${field.name}`;
    if (field.type === TableFieldSchema.Type.STRUCT) {
      const subSchema: TableSchema = {
        fields: field.fields,
      };
      const fd = convertStorageSchemaToFileDescriptorInternal(
        subSchema,
        currentScope,
        useProto3
      );
      fd.file?.forEach(f => {
        if (f.name) {
          deps[f.name] = f;
        }
      });
      const fdp = convertTableFieldSchemaToFieldDescriptorProto(
        field,
        fNumber,
        currentScope,
        useProto3
      );
      fields.push(fdp);
    } else {
      const fdp = convertTableFieldSchemaToFieldDescriptorProto(
        field,
        fNumber,
        currentScope,
        useProto3
      );
      fields.push(fdp);
    }
  }

  const dp = new DescriptorProto({
    name: scope,
    field: fields,
  });

  const depsNames: string[] = Object.keys(deps);
  const fdp = new FileDescriptorProto({
    messageType: [dp],
    name: `${scope}.proto`,
    syntax: useProto3 ? 'proto3' : 'proto2',
    dependency: depsNames,
  });

  const fds = new FileDescriptorSet({
    file: [fdp, ...Object.values(deps)],
  });

  return fds;
}

export function fileDescriptorSetToNamespace(
  fds: FileDescriptorSet
): Namespace {
  const ns: Namespace = {
    nested: {},
  };
  for (const fdp of fds.file || []) {
    for (const dp of fdp.messageType || []) {
      if (!ns.nested) {
        ns.nested = {};
      }
      const fields: {[k: string]: protobuf.IField} = {};
      for (const f of dp.field || []) {
        fields[`${f.name}`] = descriptorProtoFieldToField(f);
      }
      ns.nested[`${dp.name}`] = {
        fields,
      };
    }
  }
  return ns;
}

function descriptorProtoFieldToField(
  field: FieldDescriptorProto
): protobuf.IField {
  let type = '';
  if (field.type) {
    if (field.typeName) {
      type = field.typeName;
    } else {
      type = fieldTypeLabelMap[field.type].replace('TYPE_', '').toLowerCase();
    }
  }
  return {
    id: field.number || -1,
    type: type,
    rule: labelToFieldRule(field.label),
  };
}

function labelToFieldRule(label?: FieldDescriptorProto['label']): IFieldRule {
  if (!label) {
    return undefined;
  }
  return labelToFieldRuleMap[label];
}

function convertTableFieldSchemaToFieldDescriptorProto(
  field: TableFieldSchema,
  fNumber: number,
  scope: string,
  useProto3: boolean
): FieldDescriptorProto {
  const name = field.name;
  const type = field.type;
  if (!type) {
    throw Error(`table field ${name} missing type`);
  }
  const label = convertModeToLabel(field.mode, useProto3);
  let fdp: FieldDescriptorProto;
  if (type === TableFieldSchema.Type.STRUCT) {
    fdp = new FieldDescriptorProto({
      name: name,
      number: fNumber,
      typeName: scope,
      label: label,
    });
  } else {
    const pType = bqTypeToFieldTypeMap[type];
    if (pType === null) {
      throw Error(`table field type ${type} not supported`);
    }
    fdp = new FieldDescriptorProto({
      name: field.name,
      type: pType,
      label: label,
      number: fNumber,
      options: {
        packed: shouldPackType(pType, label, useProto3),
      },
      proto3Optional: isProto3Optional(label, useProto3),
    });
  }
  return fdp;
}

function shouldPackType(
  t: FieldDescriptorProtoType,
  label: FieldDescriptorProtoLabel | null,
  useProto3: boolean
): boolean {
  if (useProto3) {
    return false;
  }
  if (label !== FieldDescriptorProto.Label.LABEL_REPEATED) {
    return false;
  }
  return packedTypes.includes(t);
}

function isProto3Optional(
  label: FieldDescriptorProtoLabel | null,
  useProto3: boolean
): boolean | null {
  if (!useProto3) {
    return null;
  }
  return label === FieldDescriptorProto.Label.LABEL_OPTIONAL;
}

function convertModeToLabel(
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

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
import {
  bqTypeToFieldTypeMap,
  labelToFieldRuleMap,
  convertModeToLabel,
  fieldTypeLabelMap,
} from './proto_mappings';

type TableSchema = protos.google.cloud.bigquery.storage.v1.ITableSchema;
type TableFieldSchema =
  protos.google.cloud.bigquery.storage.v1.ITableFieldSchema;
type FieldDescriptorProto = protos.google.protobuf.IFieldDescriptorProto;
type FileDescriptorProto = protos.google.protobuf.IFileDescriptorProto;
type FileDescriptorSet = protos.google.protobuf.FileDescriptorSet;
type DescriptorProto = protos.google.protobuf.DescriptorProto;
type FieldDescriptorProtoType =
  protos.google.protobuf.IFieldDescriptorProto['type'];
type FieldDescriptorProtoLabel =
  protos.google.protobuf.IFieldDescriptorProto['label'];
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

/** Builds a DescriptorProto for a given table schema using proto2 syntax.
 * @param schema - a BigQuery Storage TableSchema.
 * @param scope - scope to namespace protobuf structs.
 * @returns DescriptorProto | null
 */
export function convertStorageSchemaToProto2Descriptor(
  schema: TableSchema,
  scope: string
): DescriptorProto | null {
  const fds = convertStorageSchemaToFileDescriptorInternal(schema, scope, false);
  if (!fds) {
    return null;
  }
  return normalizeDescriptorSet(fds);
}

/** Builds a DescriptorProto for a given table schema using proto3 syntax.
 * @param schema - a Bigquery TableSchema.
 * @param scope - scope to namespace protobuf structs.
 * @returns DescriptorProto | null
 */
export function convertStorageSchemaToProto3Descriptor(
  schema: TableSchema,
  scope: string
): DescriptorProto | null {
  const fds = convertStorageSchemaToFileDescriptorInternal(schema, scope, true);
  if (!fds) {
    return null;
  }
  return normalizeDescriptorSet(fds);
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
  const syntax = useProto3 ? 'proto3' : 'proto2';
  const fdp = new FileDescriptorProto({
    messageType: [dp],
    name: `${scope}.proto`,
    syntax,
    dependency: depsNames,
  });

  const fds = new FileDescriptorSet({
    file: [fdp, ...Object.values(deps)],
  });

  return fds;
}

function normalizeDescriptorSet(
  fds: FileDescriptorSet
): DescriptorProto {
  let dp: DescriptorProto | null = null;
  let fdpName;
  if (fds.file.length > 0) {
    // search root descriptor
    const fdp = fds.file[0];
    fdpName = fdp.name;
    if (fdp.messageType && fdp.messageType.length > 0) {
      dp = new DescriptorProto(fdp.messageType[0]);
    }
  }
  if (!dp) {
    throw Error('root descriptor not found');
  }
  for (const fdp of fds.file) {
    if (fdp.name === fdpName) {
      continue;
    }
    if (!dp.nestedType) {
      dp.nestedType = [];
    }
    if (!fdp.messageType) {
      continue;
    }
    for (const nestedDP of fdp.messageType) {
      dp.nestedType.push(normalizeDescriptor(new DescriptorProto(nestedDP)));
    }
  }
  return normalizeDescriptor(dp);
}

/**
 * Builds a self-contained DescriptorProto suitable for communicating schema
 * information with the BigQuery Storage write API. It's primarily used for cases where users are
 * interested in sending data using a predefined protocol buffer message.
 * @param dp - DescriptorProto to be bundled.
 * @return DescriptorProto
 */
export function normalizeDescriptor(dp: DescriptorProto): DescriptorProto {
  dp.name = normalizeName(dp.name);
  for (const f of dp.field) {
    if (f.proto3Optional) {
      f.proto3Optional = null;
    }
    if (f.oneofIndex) {
      f.oneofIndex = null;
    }
    if (f.options) {
      f.options.packed = shouldPackType(f.type, f.label, false);
    }
  }
  const normalizedNestedTypes = []
  for (const nestedDP of dp.nestedType) {
    normalizedNestedTypes.push(normalizeDescriptor(new DescriptorProto(nestedDP)));
  }
  dp.nestedType = normalizedNestedTypes;
  return dp;
}

function normalizeName(name: string): string {
  return name.replace(/\./, '_');
}

/** Builds a namespace descriptor in JSON format from a DescriptorProto.
 * This can be used to on protobufjs.Root.fromJSON to load protobuf structs.
 * @param dp - a DescriptorProto
 * @returns Namespace
 */
export function protoDescriptorToNamespace(dp: DescriptorProto): Namespace {
  const fields: {[k: string]: protobuf.IField} = {};
  for (const f of dp.field) {
    fields[`${f.name}`] = descriptorProtoFieldToField(f);
  }
  const result = {
    nested: {
      [`${dp.name}`]: {
        fields,
      },
    },
  };
  for (const nested of dp.nestedType) {
    const nestedData = protoDescriptorToNamespace(new DescriptorProto(nested));
    for (const key of Object.keys(nestedData.nested)) {
      const data = nestedData.nested[key];
      if (data) {
        result.nested[key] = data;
      }
    }
  }
  return result;
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
    options: optionToFieldOption(field.options),
  };
}

function labelToFieldRule(label?: FieldDescriptorProto['label']): IFieldRule {
  if (!label) {
    return undefined;
  }
  return labelToFieldRuleMap[label];
}

function optionToFieldOption(
  options: FieldDescriptorProto['options']
): protobuf.IField['options'] {
  if (!options) {
    return {};
  }
  return {
    ...options,
  };
}

function convertTableFieldSchemaToFieldDescriptorProto(
  field: TableFieldSchema,
  fNumber: number,
  scope: string,
  useProto3: boolean
): FieldDescriptorProto {
  const name = `${field.name}`.toLowerCase();
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
      type: FieldDescriptorProto.Type.TYPE_MESSAGE,
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
      number: fNumber,
      type: pType,
      label: label,
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
): boolean | undefined {
  if (useProto3) {
    return false;
  }
  if (label !== FieldDescriptorProto.Label.LABEL_REPEATED) {
    return undefined;
  }
  return packedTypes.includes(t);
}

function isProto3Optional(
  label: FieldDescriptorProtoLabel | null,
  useProto3: boolean
): boolean | undefined {
  if (!useProto3) {
    return undefined;
  }
  return label === FieldDescriptorProto.Label.LABEL_OPTIONAL;
}

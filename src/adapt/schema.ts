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

import * as bigquery from '@google-cloud/bigquery';
import * as protos from '../../protos/protos';
import {fieldTypeMap, modeMap} from './schema_mappings';

type StorageTableSchema = protos.google.cloud.bigquery.storage.v1.ITableSchema;
type StorageTableField =
  protos.google.cloud.bigquery.storage.v1.ITableFieldSchema;

const StorageTableSchema = protos.google.cloud.bigquery.storage.v1.TableSchema;
const StorageTableField =
  protos.google.cloud.bigquery.storage.v1.TableFieldSchema;

/**
 * Converts a bigquery Schema into the protobuf-based TableSchema used
 * by the BigQuery Storage WriteClient.
 * @param schema - a BigQuery TableSchema
 * @return StorageTableSchema
 */
export function convertBigQuerySchemaToStorageTableSchema(
  schema: bigquery.TableSchema
): StorageTableSchema {
  const out: StorageTableSchema = {};
  for (const field of schema.fields || []) {
    const converted = bqFieldToStorageField(field);
    if (!converted) {
      throw Error(`failed to convert field ${field.name}`);
    }
    if (!out.fields) {
      out.fields = [];
    }
    out.fields.push(converted);
  }
  return out;
}

function bqFieldToStorageField(field: bigquery.TableField): StorageTableField {
  const out: StorageTableField = {
    name: field.name,
  };

  if (field.description) {
    out.description = field.description;
  }

  if (!field.type) {
    throw Error(
      `could not convert field (${field.name}) due to unknown type value: ${field.type}`
    );
  }

  const ftype = fieldTypeMap[field.type];
  if (!ftype) {
    throw Error(
      `could not convert field (${field.name}) due to unknown type value: ${field.type}`
    );
  }
  out.type = ftype;

  out.mode = StorageTableField.Mode.NULLABLE;
  if (field.mode) {
    out.mode = modeMap[field.mode];
  }

  for (const subField of field.fields || []) {
    const converted = bqFieldToStorageField(subField);
    if (!out.fields) {
      out.fields = [];
    }
    out.fields.push(converted);
  }
  return out;
}

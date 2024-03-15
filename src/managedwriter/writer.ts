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

import {isDeepStrictEqual} from 'util';
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

export interface WriterOptions {
  /** The stream connection to the BigQuery streaming insert operation. */
  connection: StreamConnection;

  /** The proto descriptor for the stream. */
  protoDescriptor: IDescriptorProto;

  /**
   * Controls how missing values are interpreted by for a given stream.
   * `missingValueInterpretations` set for individual colums can override the default chosen
   * with this option.
   *
   * For example, if you want to write
   * `NULL` instead of using default values for some columns, you can set
   * `defaultMissingValueInterpretation` to `DEFAULT_VALUE` and at the same
   * time, set `missingValueInterpretations` to `NULL_VALUE` on those columns.
   */
  defaultMissingValueInterpretation?: AppendRowRequest['defaultMissingValueInterpretation'];

  /**
   * Control how missing values are interpreted for individual columns.
   *
   * You must provide an object to indicate how to interpret missing value for some fields. Missing
   * values are fields present in user schema but missing in rows. The key is
   * the field name. The value is the interpretation of missing values for the
   * field.
   *
   * For example, the following option would indicate that missing values in the "foo"
   * column are interpreted as null, whereas missing values in the "bar" column are
   * treated as the default value:
   *
   * {
   *     "foo": 'DEFAULT_VALUE',
   *		 "bar": 'NULL_VALUE',
   * }
   *
   * If a field is not in this object and has missing values, the missing values
   * in this field are interpreted as NULL unless overridden with a default missing
   * value interpretation.
   *
   * Currently, field name can only be top-level column name, can't be a struct
   * field path like 'foo.bar'.
   */
  missingValueInterpretations?: {
    [k: string]: AppendRowRequest['defaultMissingValueInterpretation'];
  };
}

/**
 * A BigQuery Storage API Writer that can be used to write data into BigQuery Table
 * using the Storage API.
 *
 * @class
 * @memberof managedwriter
 */
export class Writer {
  private _protoDescriptor: DescriptorProto;
  private _streamConnection: StreamConnection;
  private _defaultMissingValueInterpretation: WriterOptions['defaultMissingValueInterpretation'];
  private _missingValueInterpretations?: WriterOptions['missingValueInterpretations'];

  /**
   * Creates a new Writer instance.
   *
   * @param {WriterOptions} params - The parameters for the Writer.
   *   See WriterOptions docs for more information.
   */
  constructor(params: WriterOptions) {
    const {
      connection,
      protoDescriptor,
      missingValueInterpretations,
      defaultMissingValueInterpretation,
    } = params;
    this._streamConnection = connection;
    this._protoDescriptor = new DescriptorProto(protoDescriptor);
    this._defaultMissingValueInterpretation = defaultMissingValueInterpretation;
    this._missingValueInterpretations = missingValueInterpretations;
  }

  /**
   * Update the proto descriptor for the Writer.
   * Internally a reconnection event is gonna happen to apply
   * the new proto descriptor.
   *
   * @param {IDescriptorProto} protoDescriptor - The proto descriptor.
   */
  setProtoDescriptor(protoDescriptor: IDescriptorProto) {
    const protoDescriptorInstance = new DescriptorProto(protoDescriptor);
    if (!isDeepStrictEqual(protoDescriptorInstance, this._protoDescriptor)) {
      this._protoDescriptor = new DescriptorProto(protoDescriptor);
      // Reopen connection
      this._streamConnection.reconnect();
    }
  }

  /**
   * Update how missing values are interpreted by for the given stream.
   *
   * @param {WriterOptions['defaultMissingValueInterpretation']} defaultMissingValueInterpretation
   */
  setDefaultMissingValueInterpretation(
    defaultMissingValueInterpretation: WriterOptions['defaultMissingValueInterpretation']
  ) {
    this._defaultMissingValueInterpretation = defaultMissingValueInterpretation;
  }

  /**
   * Update how missing values are interpreted for individual columns.
   *
   * @param {WriterOptions['missingValueInterpretations']} missingValueInterpretations
   */
  setMissingValueInterpretations(
    missingValueInterpretations: WriterOptions['missingValueInterpretations']
  ) {
    this._missingValueInterpretations = missingValueInterpretations;
  }

  /**
   * Schedules the writing of rows at given offset.
   *
   * @param {google.cloud.bigquery.storage.v1.IProtoRows|null} rows - the rows in serialized format to write to BigQuery.
   * @param {number|Long|string|null} offsetValue - the offset of the first row.
   * @returns {managedwriter.PendingWrite} The pending write
   **/
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
      defaultMissingValueInterpretation:
        this._defaultMissingValueInterpretation,
      missingValueInterpretations: this
        ._missingValueInterpretations as AppendRowRequest['missingValueInterpretations'],
      offset,
    };

    const pw = this._streamConnection.write(request);
    return pw;
  }

  close() {
    this._streamConnection.close();
  }
}

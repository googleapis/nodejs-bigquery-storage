// Copyright 2026 Google LLC
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

// Make sure to export this.

import {Transform, TransformCallback} from 'stream';
import * as protos from '../../protos/protos';
type ReadSession = protos.google.cloud.bigquery.storage.v1.IReadSession;
const avro = require('avsc');

export class AvroRawTransform extends Transform {
  private session: ReadSession;

  constructor(session: ReadSession) {
    super({
      objectMode: true,
    });
    this.session = session;
  }

  _transform(
    serializedRecordBatch: any,
    _: BufferEncoding,
    callback: TransformCallback,
  ): void {
    const session = this.session;
    const schema = JSON.parse(session?.avroSchema?.schema as string);
    const avroType = avro.Type.forSchema(schema);
    if (
      !(
        serializedRecordBatch.avroRows &&
        serializedRecordBatch.avroRows.serializedBinaryRows
      )
    ) {
      callback(null);
      return;
    }
    const decodedData = avroType.decode(
      serializedRecordBatch.avroRows.serializedBinaryRows,
      0,
    );
    callback(null, decodedData.value);
  }
}

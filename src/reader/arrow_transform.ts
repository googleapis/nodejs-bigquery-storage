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

import {Transform, TransformCallback} from 'stream';
import {
  RecordBatchReader,
  RecordBatch,
  RecordBatchStreamReader,
} from 'apache-arrow';
import * as protos from '../../protos/protos';

type ReadRowsResponse =
  protos.google.cloud.bigquery.storage.v1.IReadRowsResponse;
type ReadSession = protos.google.cloud.bigquery.storage.v1.IReadSession;

export class ArrowRawTransform extends Transform {
  constructor() {
    super({
      readableObjectMode: false,
      writableObjectMode: true,
    });
  }

  _transform(
    response: ReadRowsResponse,
    _: BufferEncoding,
    callback: TransformCallback
  ): void {
    if (
      !(
        response.arrowRecordBatch &&
        response.arrowRecordBatch.serializedRecordBatch
      )
    ) {
      callback(null);
      return;
    }
    callback(null, response.arrowRecordBatch?.serializedRecordBatch);
  }
}
export class ArrowRecordReaderTransform extends Transform {
  private session: ReadSession;

  constructor(session: ReadSession) {
    super({
      objectMode: true,
    });
    this.session = session;
  }

  _transform(
    serializedRecordBatch: Uint8Array,
    _: BufferEncoding,
    callback: TransformCallback
  ): void {
    const buf = Buffer.concat([
      this.session.arrowSchema?.serializedSchema as Uint8Array,
      serializedRecordBatch,
    ]);
    const reader = RecordBatchReader.from(buf);
    callback(null, reader);
  }
}

export class ArrowRecordBatchTransform extends Transform {
  constructor() {
    super({
      objectMode: true,
    });
  }

  _transform(
    reader: RecordBatchStreamReader,
    _: BufferEncoding,
    callback: TransformCallback
  ): void {
    const batches = reader.readAll();
    for (const row of batches) {
      this.push(row);
    }
    callback(null);
  }
}

export class ArrowRecordBatchTableRowTransform extends Transform {
  constructor() {
    super({
      objectMode: true,
    });
  }

  _transform(
    batch: RecordBatch,
    _: BufferEncoding,
    callback: TransformCallback
  ): void {
    //console.log('transform ArrowRecordBatchTableRowTransform', batch)
    const rows = new Array(batch.numRows);
    for (let i = 0; i < batch.numRows; i++) {
      rows[i] = {
        f: new Array(batch.numCols),
      };
    }
    for (let j = 0; j < batch.numCols; j++) {
      const column = batch.selectAt([j]);
      for (let i = 0; i < batch.numRows; i++) {
        const fieldData = column.get(i);
        const fieldValue = fieldData?.toArray()[0];
        rows[i].f[j] = {
          v: fieldValue,
        };
      }
    }
    for (let i = 0; i < batch.numRows; i++) {
      this.push(rows[i]);
    }
    callback(null);
  }
}

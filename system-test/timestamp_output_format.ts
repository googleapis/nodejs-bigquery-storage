// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as assert from 'assert';
import {describe, it, before, after} from 'mocha';
import {BigQuery} from '@google-cloud/bigquery';
import {randomUUID} from 'crypto';
import * as bigquerystorage from '../src';
import {tableFromIPC} from 'apache-arrow';

const bigquery = new BigQuery();

interface TestCase {
  name: string;
  timestampOutputFormat?: string;
  useInt64Timestamp?: boolean;
  expectedError?: string;
  expectedTsValue?: string;
}

describe('Timestamp Output Format System Tests', () => {
  const datasetId = `timestamp_test_${randomUUID().replace(/-/g, '_')}`;
  const tableId = `timestamp_table_${randomUUID().replace(/-/g, '_')}`;
  const dataset = bigquery.dataset(datasetId);
  const table = dataset.table(tableId);
  const insertedTsValue = '2023-01-01T12:00:00.123456789123Z';
  const expectedTsValuePicoseconds = '2023-01-01T12:00:00.123456789123Z';

  before(async () => {
    await dataset.create();
    await table.create({
      schema: [{name: 'ts', type: 'TIMESTAMP', timestampPrecision: '12'}],
    });
    // Insert a row to test retrieval
    await table.insert([{ts: insertedTsValue}]);
  });

  after(async () => {
    try {
      await dataset.delete({force: true});
    } catch (e) {
      console.error('Error deleting dataset:', e);
    }
  });

  const testCases: TestCase[] = [
    {
      name: 'Picosecond precision as string',
      timestampOutputFormat: 'STRING',
      expectedTsValue: expectedTsValuePicoseconds,
    },
  ];

  for (const tc of testCases) {
    it(tc.name, async () => {
      const bqReadClient = new bigquerystorage.BigQueryReadClient();
      const projectId = await bqReadClient.getProjectId();

      try {
        const [session] = await bqReadClient.createReadSession({
          parent: `projects/${projectId}`,
          readSession: {
            table: `projects/${projectId}/datasets/${datasetId}/tables/${tableId}`,
            dataFormat: 'ARROW',
            readOptions: {
              arrowSerializationOptions: {
                timestampOutputFormat: tc.timestampOutputFormat,
              } as any,
            },
          },
        });

        const readStream = session.streams![0].name!;
        const stream = bqReadClient.readRows({
          readStream,
          offset: 0,
        });

        // Consuming the stream and collecting arrow record batches
        const chunks: Uint8Array[] = [];
        for await (const response of stream) {
          if (response.arrowRecordBatch?.serializedRecordBatch) {
            chunks.push(response.arrowRecordBatch.serializedRecordBatch);
          }
        }

        // Decode Arrow data
        const schema = session.arrowSchema!.serializedSchema!;
        const arrowTable = tableFromIPC(
          Buffer.concat([schema as Uint8Array, ...chunks])
        );

        assert.strictEqual(arrowTable.numRows, 1);
        const row = arrowTable.get(0);

        if (tc.expectedTsValue) {
          // Accessing the 'ts' field from the decoded Arrow row
          assert.strictEqual(row!.ts.toString(), tc.expectedTsValue);
        }
      } finally {
        await bqReadClient.close();
      }
    });
  }
});

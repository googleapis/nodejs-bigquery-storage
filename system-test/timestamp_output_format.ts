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

const bigquery = new BigQuery();

interface TestCase {
  name: string;
  timestampOutputFormat?: string;
  useInt64Timestamp?: boolean;
  expectedError?: string;
  expectedTsValue?: string;
}

describe.only('Timestamp Output Format System Tests', () => {
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
      name: 'should call getRows with ISO8601_STRING and useInt64Timestamp=false',
      timestampOutputFormat: 'ISO8601_STRING',
      useInt64Timestamp: false,
      expectedTsValue: expectedTsValuePicoseconds,
    },
  ];

  testCases.forEach(
    ({
      name,
      timestampOutputFormat,
      useInt64Timestamp,
      expectedError,
      expectedTsValue,
    }) => {
      it(name, async () => {
        const options: {[key: string]: any} = {};
        if (timestampOutputFormat !== undefined) {
          options['formatOptions.timestampOutputFormat'] =
            timestampOutputFormat;
        }
        if (useInt64Timestamp !== undefined) {
          options['formatOptions.useInt64Timestamp'] = useInt64Timestamp;
        }

        await new Promise<void>((resolve, reject) => {
          (table as any).request(
            {
              uri: '/data',
              qs: options,
            },
            (err: any, resp: any) => {
              if (expectedError) {
                try {
                  assert.strictEqual(err && err.message, expectedError);
                  resolve();
                } catch (e) {
                  reject(e);
                }
                return;
              }
              if (err) {
                reject(err);
                return;
              }
              try {
                assert(resp.rows && resp.rows.length > 0);
                assert.strictEqual(resp.rows[0].f[0].v, expectedTsValue);
                resolve();
              } catch (e) {
                reject(e);
              }
            },
          );
        });
      });
    },
  );
});

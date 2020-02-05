/**
 * Copyright 2019, Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * DESCRIBE WHAT THIS SAMPLE DOES.
 * @param {string} LIST EXPECTED ARGUMENTS.
 */
async function main() {
  // [START bigquery_storage_quickstart]
  const bqStorage = require('@google-cloud/bigquery-storage').v1beta1
    .BigQueryStorageClient;
  const client = new bqStorage();

  const myProjectId = 'mastodon-dataset';

  // This example reads baby name data from the public datasets.
  const projectId = 'bigquery-public-data';
  const datasetId = 'usa_names';
  const tableId = 'usa_1910_current';

  const tableReference = {
    projectId,
    datasetId,
    tableId,
  };

  const parent = `projects/${myProjectId}`;

  const readOptions = {
    selectedFields: ['name', 'number', 'state'],
    rowRestriction: 'state = "WA"'
  }

  let tableModifiers = null

  let snapshotSeconds = Math.floor(Date.now()/1000)

  if (snapshotSeconds > 0) {
    tableModifiers = { snapshotTime: { seconds: snapshotSeconds} }
  }

  console.log(tableModifiers)

  const request = {
    tableReference,
    parent,
    readOptions,
    tableModifiers,
    /* Format enum values: 
     * DATA_FORMAT_UNSPECIFIED = 0,
     * AVRO = 1,
     * ARROW = 3
     */
    // format: 3,
    // shardingStrategy: 1
  };

  const [session] = await client.createReadSession(request);
  console.log(session)

  const readRowsRequest = {
    readPosition: {stream: session.streams[0]}
  }

  // const reader = client.readRows(readRowsRequest)
  // [END bigquery_storage_quickstart]
}

main(...process.argv.slice(2)).catch(err => {
  console.error(err);
  process.exitCode = 1;
});

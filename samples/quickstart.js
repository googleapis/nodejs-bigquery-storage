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
  const  bqStorage  = require('@google-cloud/bigquery-storage').v1beta1.BigQueryStorageClient;
  const client = new bqStorage();


  // This example reads baby name data from the public datasets.
  const projectId = 'projects/bigquery-public-data'
  const datasetId = 'usa_names'
  const tableId =  "usa_1910_current"

  const tableReference = {
    projectId,
    datasetId,
    tableId
  }

  const parent = 'projects/mastodon-dataset'

  const request = {
    tableReference,
    parent,
  }

  await client.createReadSession(request)
  // [END bigquery_storage_quickstart]
}

main(...process.argv.slice(2)).catch(err => {
  console.error(err);
  process.exitCode = 1;
});

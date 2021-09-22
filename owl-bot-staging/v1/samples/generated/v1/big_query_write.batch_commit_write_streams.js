// Copyright 2021 Google LLC
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


'use strict';

function main(parent, writeStreams) {
  // [START storage_batch_commit_write_streams_sample]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. Parent table that all the streams should belong to, in the form of
   *  `projects/{project}/datasets/{dataset}/tables/{table}`.
   */
  // const parent = 'abc123'
  /**
   *  Required. The group of streams that will be committed atomically.
   */
  // const writeStreams = 'abc123'

  // Imports the Storage library
  const {BigQueryWriteClient} = require('@google-cloud/bigquery-storage').v1;

  // Instantiates a client
  const storageClient = new BigQueryWriteClient();

  async function batchCommitWriteStreams() {
    // Construct request
    const request = {
      parent,
      writeStreams,
    };

    // Run request
    const response = await storageClient.batchCommitWriteStreams(request);
    console.log(response);
  }

  batchCommitWriteStreams();
  // [END storage_batch_commit_write_streams_sample]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));

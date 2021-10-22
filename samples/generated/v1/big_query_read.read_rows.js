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

function main(readStream) {
  // [START bigquerystorage_v1_generated_BigQueryRead_ReadRows_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. Stream to read rows from.
   */
  // const readStream = 'abc123'
  /**
   *  The offset requested must be less than the last row read from Read.
   *  Requesting a larger offset is undefined. If not specified, start reading
   *  from offset zero.
   */
  // const offset = 1234

  // Imports the Storage library
  const {BigQueryReadClient} = require('@google-cloud/bigquery-storage').v1;

  // Instantiates a client
  const storageClient = new BigQueryReadClient();

  async function readRows() {
    // Construct request
    const request = {
      readStream,
    };

    // Run request
    const stream = await storageClient.readRows(request);
    stream.on('data', response => {
      console.log(response);
    });
    stream.on('error', err => {
      throw err;
    });
    stream.on('end', () => {
      /* API call completed */
    });
  }

  readRows();
  // [END bigquerystorage_v1_generated_BigQueryRead_ReadRows_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
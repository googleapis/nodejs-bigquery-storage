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

function main(stream) {
  // [START storage_finalize_stream_sample]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. Stream to finalize.
   */
  // const stream = ''

  // Imports the Storage library
  const {BigQueryStorageClient} = require('@google-cloud/bigquery-storage').v1beta1;

  // Instantiates a client
  const storageClient = new BigQueryStorageClient();

  async function finalizeStream() {
    // Construct request
    const request = {
      stream,
    };

    // Run request
    const response = await storageClient.finalizeStream(request);
    console.log(response);
  }

  finalizeStream();
  // [END storage_finalize_stream_sample]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));

// Copyright 2022 Google LLC
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

function main(
  projectId = 'my_project',
  datasetId = 'my_dataset',
  tableId = 'my_table'
) {
  // [START bigquerystorage_append_rows_pending_sandbox]
  const {WriterClient} = require('@google-cloud/bigquery-storage').v1;
  const customer_record_pb = require('./customer_record_pb.js');

  async function appendRowsPending() {
    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // projectId = 'your-project-id';
    // datasetId = 'your-dataset-id';
    // tableId = 'your-table-id';

    // Row 1
    const row1 = new customer_record_pb.CustomerRecord();
    row1.row_num = 1;
    row1.setCustomerName('Octavia');
    console.log(row1);

    // Row 2
    const row2 = new customer_record_pb.CustomerRecord();
    row2.row_num = 2;
    row2.setCustomerName('Turing');
    console.log(row2);

    const rowData = [row1, row2];
    console.log(rowData);
    const writer = new WriterClient();
    const writeStream = writer.createWriteStream('PENDING');

    const options = {};
    options.otherArgs = {};
    options.otherArgs.headers = {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = `write_stream=${writeStream}`;

    writer.setParent(projectId, datasetId, tableId);
    const serializedRowData = writer.createSerializedRows(rowData);
    const stream = writer.initializeWriteStream(options, writeStream);
    writer.appendRowsToStream(stream, writeStream, serializedRowData, 0);
    writer.closeStream(writer, writeStream, writer.parent);
  }
  // [END bigquerystorage_append_rows_pending_sandbox]
  appendRowsPending();
}
process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));

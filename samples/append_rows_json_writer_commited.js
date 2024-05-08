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
  // [START bigquerystorage_jsonstreamwriter_commited]
  const {adapt, managedwriter} = require('@google-cloud/bigquery-storage');
  const {WriterClient, JSONWriter} = managedwriter;

  async function appendJSONRowsCommitedStream() {
    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // projectId = 'my_project';
    // datasetId = 'my_dataset';
    // tableId = 'my_table';

    const destinationTable = `projects/${projectId}/datasets/${datasetId}/tables/${tableId}`;
    const streamType = managedwriter.CommittedStream;
    const writeClient = new WriterClient({projectId});

    try {
      const writeStream = await writeClient.createWriteStreamFullResponse({
        streamType,
        destinationTable,
      });
      const streamId = writeStream.name;
      console.log(`Stream created: ${streamId}`);

      const protoDescriptor = adapt.convertStorageSchemaToProto2Descriptor(
        writeStream.tableSchema,
        'root'
      );

      const connection = await writeClient.createStreamConnection({
        streamId,
      });

      const writer = new JSONWriter({
        streamId,
        connection,
        protoDescriptor,
      });

      let rows = [];
      const pendingWrites = [];

      // Row 1
      let row = {
        row_num: 1,
        customer_name: 'Octavia',
      };
      rows.push(row);

      // Row 2
      row = {
        row_num: 2,
        customer_name: 'Turing',
      };
      rows.push(row);

      // Send batch.
      let pw = writer.appendRows(rows);
      pendingWrites.push(pw);

      rows = [];

      // Row 3
      row = {
        row_num: 3,
        customer_name: 'Bell',
      };
      rows.push(row);

      // Send batch.
      pw = writer.appendRows(rows);
      pendingWrites.push(pw);

      const results = await Promise.all(
        pendingWrites.map(pw => pw.getResult())
      );
      console.log('Write results:', results);

      const {rowCount} = await connection.finalize();
      console.log(`Row count: ${rowCount}`);
    } catch (err) {
      console.log(err);
    } finally {
      writeClient.close();
    }
  }
  // [END bigquerystorage_jsonstreamwriter_commited]
  appendJSONRowsCommitedStream();
}
process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));

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
  // [START bigquerystorage_append_rows_buffered]
  const {adapt, managedwriter} = require('@google-cloud/bigquery-storage');
  const {WriterClient, JSONWriter} = managedwriter;
  const {BigQuery} = require('@google-cloud/bigquery');

  async function appendRowsBuffered() {
    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // projectId = 'my_project';
    // datasetId = 'my_dataset';
    // tableId = 'my_table';

    const destinationTable = `projects/${projectId}/datasets/${datasetId}/tables/${tableId}`;
    const streamType = managedwriter.BufferedStream;
    const writeClient = new WriterClient({projectId: projectId});
    const bigquery = new BigQuery({projectId: projectId});

    try {
      const dataset = bigquery.dataset(datasetId);
      const table = await dataset.table(tableId);
      const [metadata] = await table.getMetadata();
      const {schema} = metadata;
      const storageSchema =
        adapt.convertBigQuerySchemaToStorageTableSchema(schema);
      const protoDescriptor = adapt.convertStorageSchemaToProto2Descriptor(
        storageSchema,
        'root'
      );

      const connection = await writeClient.createStreamConnection({
        streamType,
        destinationTable,
      });

      const streamId = connection.getStreamId();
      console.log(`Stream created: ${streamId}`);

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

      const {offset} = await connection.flushRows({offset: 2});
      console.log(`Flushed to offset: ${offset}`);

      const {rowCount} = await connection.finalize();
      console.log(`Row count: ${rowCount}`);
    } catch (err) {
      console.log(err);
    } finally {
      writeClient.close();
    }
  }
  // [END bigquerystorage_append_rows_buffered]
  appendRowsBuffered();
}
process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));

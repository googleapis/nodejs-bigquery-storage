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
  // [START bigquerystorage_append_rows_pending]
  const {WriterClient} =
    require('@google-cloud/bigquery-storage').managedwriter;
  const customer_record_pb = require('./customer_record_pb.js');

  const type = require('@google-cloud/bigquery-storage').protos.google.protobuf
    .FieldDescriptorProto.Type;
  const mode = require('@google-cloud/bigquery-storage').protos.google.cloud
    .bigquery.storage.v1.WriteStream.Type;

  async function appendRowsPending() {
    /**
     * If you make updates to the sample_data.proto protocol buffers definition,
     * run:
     *   protoc --js_out=import_style=commonjs,binary:. customer_record.proto
     * from the /samples directory to generate the customer_record_pb module.
     */

    // So that BigQuery knows how to parse the serialized_rows, create a
    // protocol buffer representation of your message descriptor.
    const protoDescriptor = {};
    protoDescriptor.name = 'CustomerRecord';
    protoDescriptor.field = [
      {
        name: 'customer_name',
        number: 1,
        type: type.TYPE_STRING,
      },
    ];

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // projectId = 'my_project';
    // datasetId = 'my_dataset';
    // tableId = 'my_table';

    const parent = `projects/${projectId}/datasets/${datasetId}/tables/${tableId}`;

    const writeClient = new WriterClient(
      parent,
      null,
      {
        projectId
      },
      mode.PENDING
    );
    try {
      let streamName = await writeClient.createWriteStream();

      console.log(`Stream created: ${streamName}`);

      // Append data to the given stream.
      const managedStream = await writeClient.createManagedStream(
        streamName,
        protoDescriptor
      );

      let serializedRows = [];
      let pendingWrites = [];

      // Row 1
      let row = new customer_record_pb.CustomerRecord();
      row.row_num = 1;
      row.setCustomerName('Octavia');
      serializedRows.push(row.serializeBinary());

      // Row 2
      row = new customer_record_pb.CustomerRecord();
      row.row_num = 2;
      row.setCustomerName('Turing');
      serializedRows.push(row.serializeBinary());

      // Set an offset to allow resuming this stream if the connection breaks.
      // Keep track of which requests the server has acknowledged and resume the
      // stream at the first non-acknowledged message. If the server has already
      // processed a message with that offset, it will return an ALREADY_EXISTS
      // error, which can be safely ignored.

      // The first request must always have an offset of 0.
      let offsetValue = 0;

      // Send batch.
      let pw = managedStream.appendRows({serializedRows}, offsetValue);
      pendingWrites.push(pw);

      serializedRows = [];

      // Row 3
      row.row_num = 3;
      row.setCustomerName('bell');
      serializedRows.push(row.serializeBinary());

      // Offset must equal the number of rows that were previously sent.
      offsetValue = 2;

      // Send batch.
      pw = managedStream.appendRows({serializedRows}, offsetValue);
      pendingWrites.push(pw);

      const results = await Promise.all(
        pendingWrites.map(pw => pw.getResult())
      );
      console.log('Write results:', results);

      const rowCount = await managedStream.finalize();
      console.log(`Row count: ${rowCount}`);

      const response = await writeClient.batchCommitWriteStream({
        parent,
        writeStreams: [streamName],
      });

      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      writeClient.close();
    }
  }
  // [END bigquerystorage_append_rows_pending]
  appendRowsPending();
}
process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));

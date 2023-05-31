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
  const {v1, adapt} = require('@google-cloud/bigquery-storage');
  const {BigQueryWriteClient} = v1;

  const customer_record_pb = require('./customer_record_pb.js');
  const {CustomerRecord} = customer_record_pb;

  const protobufjs = require('protobufjs');
  require('protobufjs/ext/descriptor');

  const type = require('@google-cloud/bigquery-storage').protos.google.cloud
    .bigquery.storage.v1.WriteStream.Type;

  async function appendRowsPending() {
    /**
     * If you make updates to the customer_record.proto protocol buffers definition,
     * run:
     *   pbjs customer_record.proto -t static-module -w commonjs -o customer_record.js
     *   pbjs customer_record.proto -t json --keep-case -o customer_record.json
     * from the /samples directory to generate the customer_record module.
     */

    const writeClient = new BigQueryWriteClient();

    // So that BigQuery knows how to parse the serialized_rows, create a
    // protocol buffer representation of your message descriptor.
    const root = protobufjs.loadSync('./customer_record.json');
    const descriptor = root.lookupType('CustomerRecord').toDescriptor('proto2');
    const protoDescriptor = adapt.normalizeDescriptor(descriptor).toJSON();

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // projectId = 'my_project';
    // datasetId = 'my_dataset';
    // tableId = 'my_table';

    const parent = `projects/${projectId}/datasets/${datasetId}/tables/${tableId}`;

    try {
      // Create a write stream to the given table.
      let writeStream = {type: type.PENDING};

      let request = {
        parent,
        writeStream,
      };

      let [response] = await writeClient.createWriteStream(request);

      console.log(`Stream created: ${response.name}`);

      writeStream = response.name;

      // This header is required so that the BigQuery Storage API
      // knows which region to route the request to.
      const options = {};
      options.otherArgs = {};
      options.otherArgs.headers = {};
      options.otherArgs.headers[
        'x-goog-request-params'
      ] = `write_stream=${writeStream}`;

      // Append data to the given stream.
      const stream = await writeClient.appendRows(options);

      const responses = [];

      stream.on('data', response => {
        // Check for errors.
        if (response.error) {
          throw new Error(response.error.message);
        }

        console.log(response);
        responses.push(response);

        // Close the stream when all responses have been received.
        if (responses.length === 2) {
          stream.end();
        }
      });

      stream.on('error', err => {
        throw err;
      });

      stream.on('end', async () => {
        // API call completed.
        try {
          [response] = await writeClient.finalizeWriteStream({
            name: writeStream,
          });
          console.log(`Row count: ${response.rowCount}`);

          [response] = await writeClient.batchCommitWriteStreams({
            parent,
            writeStreams: [writeStream],
          });
          console.log(response);
        } catch (err) {
          console.log(err);
        }
      });

      let serializedRows = [];

      // Row 1
      let row = {
        rowNum: 1,
        customerName: 'Octavia',
      };
      serializedRows.push(CustomerRecord.encode(row).finish());

      // Row 2
      row = {
        rowNum: 2,
        customerName: 'Turing',
      };
      serializedRows.push(CustomerRecord.encode(row).finish());

      let protoRows = {
        writerSchema: {protoDescriptor},
        rows: {serializedRows},
      };

      // Set an offset to allow resuming this stream if the connection breaks.
      // Keep track of which requests the server has acknowledged and resume the
      // stream at the first non-acknowledged message. If the server has already
      // processed a message with that offset, it will return an ALREADY_EXISTS
      // error, which can be safely ignored.

      // The first request must always have an offset of 0.
      let offsetValue = 0;

      // Construct request.
      request = {
        writeStream,
        protoRows,
        offset: {value: offsetValue},
      };

      // Send batch.
      stream.write(request);

      serializedRows = [];

      // Row 3
      row = {
        rowNum: 3,
        customerName: 'bell',
      };
      serializedRows.push(CustomerRecord.encode(row).finish());
      protoRows = {
        rows: {serializedRows},
      };

      // Offset must equal the number of rows that were previously sent.
      offsetValue = 2;

      request = {
        protoRows,
        offset: {value: offsetValue},
      };

      // Send batch.
      stream.write(request);
    } catch (err) {
      console.log(err);
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

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
  // [START bigquerystorage_append_rows_raw_proto2]
  const {v1, adapt} = require('@google-cloud/bigquery-storage');
  const {BigQueryWriteClient} = v1;
  const sample_data_pb = require('./sample_data_pb.js');
  const {SampleData} = sample_data_pb;

  const protobufjs = require('protobufjs');
  require('protobufjs/ext/descriptor');

  const type = require('@google-cloud/bigquery-storage').protos.google.cloud
    .bigquery.storage.v1.WriteStream.Type;

  async function appendRowsProto2() {
    /**
     * If you make updates to the sample_data.proto protocol buffers definition,
     * run:
     *   pbjs sample_data.proto -t static-module -w commonjs -o sample_data.js
     *   pbjs sample_data.proto -t json --keep-case -o sample_data.json
     * from the /samples directory to generate the sample_data module.
     */

    const writeClient = new BigQueryWriteClient();

    // So that BigQuery knows how to parse the serialized_rows, create a
    // protocol buffer representation of your message descriptor.
    const root = protobufjs.loadSync('./sample_data.json');
    const descriptor = root.lookupType('SampleData').toDescriptor('proto2');
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
        if (responses.length === 3) {
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
        boolCol: true,
        bytesCol: Buffer.from('hello world'),
        float64Col: parseFloat('+123.45'),
        int64Col: 123,
        stringCol: 'omg',
      };
      serializedRows.push(SampleData.encode(row).finish());

      // Row 2
      row = {
        rowNum: 2,
        boolCol: false,
      };
      serializedRows.push(SampleData.encode(row).finish());

      // Row 3
      row = {
        rowNum: 3,
        bytesCol: Buffer.from('later, gator'),
      };
      serializedRows.push(SampleData.encode(row).finish());

      // Row 4
      row = {
        rowNum: 4,
        float64Col: 987.654,
      };
      serializedRows.push(SampleData.encode(row).finish());

      // Row 5
      row = {
        rowNum: 5,
        int64Col: 321,
      };
      serializedRows.push(SampleData.encode(row).finish());

      // Row 6
      row = {
        rowNum: 6,
        stringCol: 'octavia',
      };
      serializedRows.push(SampleData.encode(row).finish());

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

      // Reset rows.
      serializedRows = [];

      // Row 7
      row = {
        rowNum: 7,
        dateCol: 1132896,
      };
      serializedRows.push(SampleData.encode(row).finish());

      // Row 8
      row = {
        rowNum: 8,
        datetimeCol: '2019-02-17 11:24:00.000',
      };
      serializedRows.push(SampleData.encode(row).finish());

      // Row 9
      row = {
        rowNum: 9,
        geographyCol: 'POINT(5 5)',
      };
      serializedRows.push(SampleData.encode(row).finish());

      // Row 10
      row = {
        rowNum: 10,
        numericCol: '123456',
        bignumericCol: '99999999999999999999999999999.999999999',
      };
      serializedRows.push(SampleData.encode(row).finish());

      // Row 11
      row = {
        rowNum: 11,
        timeCol: '18:00:00',
      };
      serializedRows.push(SampleData.encode(row).finish());

      // Row 12
      const timestamp = 1641700186564;
      row = {
        rowNum: 12,
        timestampCol: timestamp,
      };
      serializedRows.push(SampleData.encode(row).finish());

      // Since this is the second request, you only need to include the row data.
      // The name of the stream and protocol buffers DESCRIPTOR is only needed in
      // the first request.
      protoRows = {
        rows: {serializedRows},
      };

      // Offset must equal the number of rows that were previously sent.
      offsetValue = 6;

      request = {
        protoRows,
        offset: {value: offsetValue},
      };

      // Send batch.
      stream.write(request);

      serializedRows = [];

      // Row 13
      row = {
        rowNum: 13,
        int64List: [1999, 2001],
      };
      serializedRows.push(SampleData.encode(row).finish());

      // Row 14
      row = {
        rowNum: 14,
        structCol: {
          subIntCol: 99,
        },
      };
      serializedRows.push(SampleData.encode(row).finish());

      // Row 15
      row = {
        rowNum: 15,
        structList: [{subIntCol: 100}, {subIntCol: 101}],
      };
      serializedRows.push(SampleData.encode(row).finish());
      protoRows = {
        rows: {serializedRows},
      };

      offsetValue = 12;

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
  // [END bigquerystorage_append_rows_raw_proto2]
  appendRowsProto2();
}
process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));

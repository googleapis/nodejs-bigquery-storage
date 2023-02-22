// Copyright 2023 Google LLC
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
  // [START bigquerystorage_write_pending_complexschema]
  const {BigQueryWriteClient} = require('@google-cloud/bigquery-storage').v1;
  const {BigQuery} = require('@google-cloud/bigquery');
  const {protobuf} = require('google-gax');
  const {Root} = protobuf;
  const adapt = require('../build/src/adapt');
  // const adapt = require('@google-cloud/bigquery-storage').adapt;

  const mode = require('@google-cloud/bigquery-storage').protos.google.cloud
    .bigquery.storage.v1.WriteStream.Type;

  async function appendRowsProto2() {
    const writeClient = new BigQueryWriteClient();
    const bigquery = new BigQuery({projectId: projectId});

    const dataset = bigquery.dataset(datasetId);
    const table = await dataset.table(tableId);
    const [metadata] = await table.getMetadata();
    const storageSchema = adapt.convertBigQuerySchemaToStorageTableSchema(
      metadata.schema
    );

    // So that BigQuery knows how to parse the serialized_rows, create a
    // protocol buffer representation of your message descriptor.
    const fileDescriptor = adapt.convertStorageSchemaToProto2Descriptor(
      storageSchema,
      'SampleData'
    );
    const protoDescriptor = adapt.normalizeDescriptor(fileDescriptor);
    const namespace = adapt.protoDescriptorToNamespace(protoDescriptor);
    const root = Root.fromJSON(namespace);
    const SampleData = root.lookupType('SampleData');

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // projectId = 'my_project';
    // datasetId = 'my_dataset';
    // tableId = 'my_table';

    const parent = `projects/${projectId}/datasets/${datasetId}/tables/${tableId}`;

    try {
      // Create a write stream to the given table.
      let writeStream = {type: mode.PENDING};

      let request = {
        parent,
        writeStream,
      };

      let [response] = await writeClient.createWriteStream(request);

      console.log(`Stream created: ${response.name}`);

      writeStream = response.name;

      // Append data to the given stream.
      const stream = await writeClient.appendRows();

      const responses = [];

      stream.on('data', response => {
        // Check for errors.
        if (response.error) {
          throw new Error(response.error.message);
        }

        console.log('response:', response);
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
        row_num: 1,
        bool_col: true,
        bytes_col: Buffer.from('hello world'),
        float64_col: parseFloat('+123.44999694824219'),
        int64_col: 123,
        string_col: 'omfg!',
      };
      serializedRows.push(SampleData.encode(row).finish());

      // Row 2
      row = {
        row_num: 2,
        bool_col: false,
      };
      serializedRows.push(SampleData.encode(row).finish());

      // Row 3
      row = {
        row_num: 3,
        bytes_col: Buffer.from('later, gator'),
      };
      serializedRows.push(SampleData.encode(row).finish());

      // Row 4
      row = {
        row_num: 4,
        float64_col: 987.6539916992188,
      };
      serializedRows.push(SampleData.encode(row).finish());

      // Row 5
      row = {
        row_num: 5,
        int64_col: 321,
      };
      serializedRows.push(SampleData.encode(row).finish());

      // Row 6
      row = {
        row_num: 6,
        string_col: 'octavia',
      };
      serializedRows.push(SampleData.encode(row).finish());

      let protoRows = {
        writerSchema: {
          protoDescriptor: protoDescriptor.toJSON(),
        },
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
        row_num: 7,
        date_col: 1132896,
      };
      serializedRows.push(SampleData.encode(row).finish());

      // Row 8
      row = {
        row_num: 8,
        datetime_col: bigquery.datetime('2019-02-17 11:24:00.000').value, // BigQuery civil time
      };
      serializedRows.push(SampleData.encode(row).finish());

      // Row 9
      row = {
        row_num: 9,
        geography_col: 'POINT(5 5)',
      };
      serializedRows.push(SampleData.encode(row).finish());

      // Row 10
      row = {
        row_num: 10,
        numeric_col: '123456',
        bignumeric_col: '99999999999999999999999999999.999999999',
      };
      serializedRows.push(SampleData.encode(row).finish());

      // Row 11
      row = {
        row_num: 11,
        time_col: '18:00:00',
      };
      serializedRows.push(SampleData.encode(row).finish());

      // Row 12
      row = {
        row_num: 12,
        timestamp_col: 1641700186564,
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
        row_num: 13,
        int64_list: [1999, 2001],
      };
      serializedRows.push(SampleData.encode(row).finish());

      // Row 14
      row = {
        row_num: 14,
        struct_col: {
          sub_int_col: 99,
        },
      };
      serializedRows.push(SampleData.encode(row).finish());

      // Row 15
      row = {
        row_num: 15,
        struct_list: [{sub_int_col: 100}, {sub_int_col: 101}],
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
  // [END bigquerystorage_write_pending_complexschema]
  appendRowsProto2();
}
process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));

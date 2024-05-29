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
  // [START bigquerystorage_jsonstreamwriter_pending]
  const {adapt, managedwriter} = require('@google-cloud/bigquery-storage');
  const {WriterClient, JSONWriter} = managedwriter;

  async function appendRowsPendingStream() {
    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // projectId = 'my_project';
    // datasetId = 'my_dataset';
    // tableId = 'my_table';

    const destinationTable = `projects/${projectId}/datasets/${datasetId}/tables/${tableId}`;
    const streamType = managedwriter.PendingStream;
    const writeClient = new WriterClient({projectId: projectId});

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
        connection,
        protoDescriptor,
      });

      let rows = [];
      const pendingWrites = [];

      // Row 1
      let row = {
        row_num: 1,
        bool_col: true,
        bytes_col: Buffer.from('hello world'),
        float64_col: parseFloat('+123.44999694824219'),
        int64_col: 123,
        string_col: 'omg',
      };
      rows.push(row);

      // Row 2
      row = {
        row_num: 2,
        bool_col: false,
      };
      rows.push(row);

      // Row 3
      row = {
        row_num: 3,
        bytes_col: Buffer.from('later, gator'),
      };
      rows.push(row);

      // Row 4
      row = {
        row_num: 4,
        float64_col: 987.6539916992188,
      };
      rows.push(row);

      // Row 5
      row = {
        row_num: 5,
        int64_col: 321,
      };
      rows.push(row);

      // Row 6
      row = {
        row_num: 6,
        string_col: 'octavia',
      };
      rows.push(row);

      // Set an offset to allow resuming this stream if the connection breaks.
      // Keep track of which requests the server has acknowledged and resume the
      // stream at the first non-acknowledged message. If the server has already
      // processed a message with that offset, it will return an ALREADY_EXISTS
      // error, which can be safely ignored.

      // The first request must always have an offset of 0.
      let offsetValue = 0;

      // Send batch.
      let pw = writer.appendRows(rows, offsetValue);
      pendingWrites.push(pw);

      // Reset rows.
      rows = [];

      // Row 7
      row = {
        row_num: 7,
        date_col: new Date('2019-02-07'),
      };
      rows.push(row);

      // Row 8
      row = {
        row_num: 8,
        datetime_col: new Date('2019-02-17T11:24:00.000Z'),
      };
      rows.push(row);

      // Row 9
      row = {
        row_num: 9,
        geography_col: 'POINT(5 5)',
      };
      rows.push(row);

      // Row 10
      row = {
        row_num: 10,
        numeric_col: 123456,
        bignumeric_col: '99999999999999999999999999999.999999999',
      };
      rows.push(row);

      // Row 11
      row = {
        row_num: 11,
        time_col: '18:00:00',
      };
      rows.push(row);

      // Row 12
      row = {
        row_num: 12,
        timestamp_col: new Date('2022-01-09T03:49:46.564Z'),
      };
      rows.push(row);

      // Offset must equal the number of rows that were previously sent.
      offsetValue = 6;

      // Send batch.
      pw = writer.appendRows(rows, offsetValue);
      pendingWrites.push(pw);

      rows = [];

      // Row 13
      row = {
        row_num: 13,
        int64_list: [1999, 2001],
      };
      rows.push(row);

      // Row 14
      row = {
        row_num: 14,
        struct_col: {
          sub_int_col: 99,
        },
      };
      rows.push(row);

      // Row 15
      row = {
        row_num: 15,
        struct_list: [{sub_int_col: 100}, {sub_int_col: 101}],
      };
      rows.push(row);

      // Row 16
      row = {
        row_num: 16,
        range_col: {
          start: new Date('2022-01-09T03:49:46.564Z'),
          end: new Date('2022-01-09T04:49:46.564Z'),
        },
      };
      rows.push(row);

      offsetValue = 12;

      // Send batch.
      pw = writer.appendRows(rows, offsetValue);
      pendingWrites.push(pw);

      const results = await Promise.all(
        pendingWrites.map(pw => pw.getResult())
      );
      console.log('Write results:', results);

      const {rowCount} = await connection.finalize();
      console.log(`Row count: ${rowCount}`);

      const response = await writeClient.batchCommitWriteStream({
        parent: destinationTable,
        writeStreams: [streamId],
      });

      console.log(response);
    } catch (err) {
      console.log(err.message, err);
    } finally {
      writeClient.close();
    }
  }
  // [END bigquerystorage_jsonstreamwriter_pending]
  appendRowsPendingStream();
}
process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));

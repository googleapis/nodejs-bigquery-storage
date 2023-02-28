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
  const {WriterClient} =
    require('@google-cloud/bigquery-storage').managedwriter;
  const sample_data_pb = require('./sample_data_pb.js');

  const protos = require('@google-cloud/bigquery-storage').protos.google.cloud
    .bigquery.storage.v1;
  const type = require('@google-cloud/bigquery-storage').protos.google.protobuf
    .FieldDescriptorProto.Type;
  const mode = require('@google-cloud/bigquery-storage').protos.google.cloud
    .bigquery.storage.v1.WriteStream.Type;

  async function appendRowsProto2() {
    /**
     * If you make updates to the sample_data.proto protocol buffers definition,
     * run:
     *   protoc --js_out=import_style=commonjs,binary:. sample_data.proto
     * from the /samples directory to generate the sample_data_pb module.
     */

    // So that BigQuery knows how to parse the serialized_rows, create a
    // protocol buffer representation of your message descriptor.
    const protoDescriptor = {};
    protoDescriptor.name = 'SampleData';
    protoDescriptor.field = [
      {
        name: 'bool_col',
        number: 1,
        type: type.TYPE_BOOL,
      },
      {
        name: 'bytes_col',
        number: 2,
        type: type.TYPE_BYTES,
      },
      {
        name: 'float64_col',
        number: 3,
        type: type.TYPE_FLOAT,
      },
      {
        name: 'int64_col',
        number: 4,
        type: type.TYPE_INT64,
      },
      {
        name: 'string_col',
        number: 5,
        type: type.TYPE_STRING,
      },
      {
        name: 'date_col',
        number: 6,
        type: type.TYPE_INT32,
      },
      {
        name: 'datetime_col',
        number: 7,
        type: type.TYPE_STRING,
      },
      {
        name: 'geography_col',
        number: 8,
        type: type.TYPE_STRING,
      },
      {
        name: 'numeric_col',
        number: 9,
        type: type.TYPE_STRING,
      },
      {
        name: 'bignumeric_col',
        number: 10,
        type: type.TYPE_STRING,
      },
      {
        name: 'time_col',
        number: 11,
        type: type.TYPE_STRING,
      },
      {
        name: 'timestamp_col',
        number: 12,
        type: type.TYPE_INT64,
      },
      {
        name: 'int64_list',
        number: 13,
        type: type.TYPE_INT64,
        label: protos.TableFieldSchema.Mode.REPEATED,
      },
      {
        name: 'struct_col',
        number: 14,
        typeName: 'SampleStruct',
        type: type.TYPE_MESSAGE,
      },
      {
        name: 'struct_list',
        number: 15,
        typeName: 'SampleStruct',
        type: type.TYPE_MESSAGE,
        label: protos.TableFieldSchema.Mode.REPEATED,
      },
      {
        name: 'row_num',
        number: 16,
        type: type.TYPE_INT64,
        label: protos.TableFieldSchema.Mode.REQUIRED,
      },
    ];
    protoDescriptor.nestedType = [
      {
        name: 'SampleStruct',
        field: [
          {
            name: 'sub_int_col',
            number: 1,
            type: type.TYPE_INT64,
          },
        ],
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
        projectId,
      },
      mode.PENDING
    );

    try {
      const streamName = await writeClient.createWriteStream();

      console.log(`Stream created: ${streamName}`);

      // Append data to the given stream.
      const managedStream = await writeClient.createManagedStream(
        streamName,
        protoDescriptor
      );

      let serializedRows = [];
      let pendingWrites = [];

      // Row 1
      let row = new sample_data_pb.SampleData();
      row.setRowNum(1);
      row.setBoolCol(true);
      row.setBytesCol(Buffer.from('hello world'));
      row.setFloat64Col(parseFloat('+123.45'));
      row.setInt64Col(123);
      row.setStringCol('omfg!');
      serializedRows.push(row.serializeBinary());

      // Row 2
      row = new sample_data_pb.SampleData();
      row.setRowNum(2);
      row.setBoolCol(false);
      serializedRows.push(row.serializeBinary());

      // Row 3
      row = new sample_data_pb.SampleData();
      row.setRowNum(3);
      row.setBytesCol(Buffer.from('later, gator'));
      serializedRows.push(row.serializeBinary());

      // Row 4
      row = new sample_data_pb.SampleData();
      row.setRowNum(4);
      row.setFloat64Col(987.654);
      serializedRows.push(row.serializeBinary());

      // Row 5
      row = new sample_data_pb.SampleData();
      row.setRowNum(5);
      row.setInt64Col(321);
      serializedRows.push(row.serializeBinary());

      // Row 6
      row = new sample_data_pb.SampleData();
      row.setRowNum(6);
      row.setStringCol('octavia');
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

      // Reset rows.
      serializedRows = [];

      // Row 7
      row = new sample_data_pb.SampleData();
      row.setRowNum(7);
      row.setDateCol(1132896);
      serializedRows.push(row.serializeBinary());

      // Row 8
      row = new sample_data_pb.SampleData();
      row.setRowNum(8);
      row.setDatetimeCol('2019-02-17 11:24:00.000');
      serializedRows.push(row.serializeBinary());

      // Row 9
      row = new sample_data_pb.SampleData();
      row.setRowNum(9);
      row.setGeographyCol('POINT(5 5)');
      serializedRows.push(row.serializeBinary());

      // Row 10
      row = new sample_data_pb.SampleData();
      row.setRowNum(10);
      row.setNumericCol('123456');
      row.setBignumericCol('99999999999999999999999999999.999999999');
      serializedRows.push(row.serializeBinary());

      // Row 11
      row = new sample_data_pb.SampleData();
      row.setRowNum(11);
      row.setTimeCol('18:00:00');
      serializedRows.push(row.serializeBinary());

      // Row 12
      row = new sample_data_pb.SampleData();
      row.setRowNum(12);
      const timestamp = 1641700186564;
      row.setTimestampCol(timestamp);
      serializedRows.push(row.serializeBinary());

      // Offset must equal the number of rows that were previously sent.
      offsetValue = 6;

      // Send batch.
      pw = managedStream.appendRows({serializedRows}, offsetValue);
      pendingWrites.push(pw);

      serializedRows = [];

      // Row 13
      row = new sample_data_pb.SampleData();
      row.setRowNum(13);
      row.addInt64List(1999);
      row.addInt64List(2001);
      serializedRows.push(row.serializeBinary());

      // Row 14
      row = new sample_data_pb.SampleData();
      let sampleStruct = new sample_data_pb.SampleData.SampleStruct();
      sampleStruct.setSubIntCol(99);
      row.setRowNum(14);
      row.setStructCol(sampleStruct);
      serializedRows.push(row.serializeBinary());

      // Row 15
      row = new sample_data_pb.SampleData();
      sampleStruct = new sample_data_pb.SampleData.SampleStruct();
      sampleStruct.setSubIntCol(100);
      const sampleStruct2 = new sample_data_pb.SampleData.SampleStruct();
      sampleStruct2.setSubIntCol(101);
      row.setRowNum(15);
      row.addStructList(sampleStruct);
      row.addStructList(sampleStruct2);
      serializedRows.push(row.serializeBinary());

      offsetValue = 12;

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
  // [END bigquerystorage_append_rows_raw_proto2]
  appendRowsProto2();
}
process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));

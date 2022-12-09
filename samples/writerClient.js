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

/*'use strict';

function main(
  projectId = 'my-project',
  datasetId = 'my-dataset',
  tableId = 'my-table'
) {
  // [START bigquerystorage_append_rows_pending_sandbox]
  const {WriterClient} = require('../src/managedwriter/writer_client.ts');
  const type = require('@google-cloud/bigquery-storage').protos.google.protobuf
    .FieldDescriptorProto.Type;
  console.log(WriterClient);*/

// async function appendRowsPending(WriterClient, type) {
/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
/*projectId = 'loferris-sandbox';
    datasetId = 'writer-dataset-sandbox';
    tableId = 'writer-table-sandbox';

    const parent = `project/${projectId}/datasets/${datasetId}/tables/${tableId}`;
    const clientOpts = {
      projectId: projectId,
    };

    const writer = new WriterClient(parent, clientOpts);
    const streamType = {
      type: 'PENDING',
    };
    writer.setWriteStream(streamType);

    const customer_record_pb = require('./customer_record_pb.js');

    const writeStreamConnection = writer.initializeStreamConnection();

    const protoDescriptorEx = {};
    protoDescriptorEx.name = 'CustomerRecord';
    protoDescriptorEx.field = [
      {
        name: 'customer_name',
        number: 1,
        type: type.TYPE_STRING,
      },
      {
        name: 'row_num',
        number: 2,
        type: type.TYPE_INT64,
      },
    ];

    // Row 1
    const row1Message = new customer_record_pb.CustomerRecord();
    row1Message.row_num = 1;
    row1Message.setCustomerName('Octavia');

    // Row 2
    const row2Message = new customer_record_pb.CustomerRecord();
    row2Message.row_num = 2;
    row2Message.setCustomerName('Turing');

    const writerSchemaEx = {
      protoDescriptor: protoDescriptorEx,
    };
    const serializedRowsEx = {
      serializedRows: [
        row1Message.serializeBinary(),
        row2Message.serializeBinary(),
      ],
    };

    const rowData = {
      rows: serializedRowsEx,
      writerSchema: writerSchemaEx,
    };
    console.log(
      `This is the length of the rows: ${rowData.rows.serializedRows.length}`
    );

    const offset = {
      value: 0,
    };
    writeStreamConnection
      .then(res => {
        writer.appendRowsToStream(res, rowData, offset).then(res => {
          console.log(`AppendRowsToStream has resolved: ${res}`);
        });
      })
      .then(() => {
        writer.closeStream().then(res => {
          console.log(`Close stream has been resolved: ${res}`);
        });
      });
  }
  // [END bigquerystorage_append_rows_pending_sandbox]
  appendRowsPending();
}
process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));*/

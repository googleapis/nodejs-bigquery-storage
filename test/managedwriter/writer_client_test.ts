// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

import '../../../package.json';
import * as gax from 'google-gax';
import * as protos from '../../protos/protos';
import * as assert from 'assert';
import * as sinon from 'sinon';
import {describe, it} from 'mocha';
import * as protobufjs from 'protobufjs';
import * as bigquerywriterModule from '../../src';
import {CustomerRecordMessage} from '../managedwriter/test_protos';
import * as customer_record from './test_protos/customer_record';
import customerRecordProtoJson = require('../managedwriter/test_protos/customer_record.json');

import {ClientOptions} from 'google-gax';

type WriteStream = protos.google.cloud.bigquery.storage.v1.IWriteStream;
type ProtoData =
  protos.google.cloud.bigquery.storage.v1.AppendRowsRequest.IProtoData;
type ProtoSchema = protos.google.cloud.bigquery.storage.v1.IProtoSchema;
type ProtoDescriptor = protos.google.protobuf.IDescriptorProto;
type IInt64Value = protos.google.protobuf.IInt64Value;
type AppendRowsResponse =
  protos.google.cloud.bigquery.storage.v1.IAppendRowsResponse;
const type = protos.google.protobuf.FieldDescriptorProto.Type;

// eslint-disable-next-line @typescript-eslint/no-unused-vars

describe('managedwriter.WriterClient', () => {
  let sandbox: sinon.SinonSandbox;
  let projectId: string;
  let datasetId: string;
  let tableId: string;
  let parent: string;
  let bqWriteClient: bigquerywriterModule.BigQueryWriteClient;
  let clientOptions: ClientOptions;
  let writeStreamType: WriteStream['type'];
  beforeEach(async () => {
    sandbox = sinon.createSandbox();
    projectId = 'loferris-sandbox';
    datasetId = 'writer_dataset_sandbox';
    tableId = 'writer_table_sandbox';
    parent = `projects/${projectId}/datasets/${datasetId}/tables/${tableId}`;
    bqWriteClient = await new bigquerywriterModule.BigQueryWriteClient({
      credentials: {
        client_email: 'fake-client@email.com',
        private_key: 'fake-private-key',
      },
      projectId: projectId,
    });
    clientOptions = {
      projectId: projectId,
    };
    writeStreamType = 'TYPE_UNSPECIFIED';
  });
  afterEach(async () => {
    sandbox.restore();
    await bqWriteClient.close();
  });
  describe('Common methods', () => {
    it('should create a client without arguments', () => {
      const client = new bigquerywriterModule.managedwriter.WriterClient();
      client.setParent(projectId, datasetId, tableId);
      assert(client);
      assert.strictEqual(client.getParent(), parent);
      assert(client.getClient());
      assert.strictEqual(client.getWriteStreamType(), 'TYPE_UNSPECIFIED');
    });

    it('should create a client with arguments: parent, client, opts, writeStream', async () => {
      const client = new bigquerywriterModule.managedwriter.WriterClient(
        parent,
        bqWriteClient,
        clientOptions,
        writeStreamType
      );
      assert(client);
      assert.strictEqual(client.getParent(), parent);
      assert(client.getClient());
      const clientId = await client.getClient().getProjectId();
      assert.strictEqual(clientId, clientOptions.projectId);
      assert.strictEqual(client.getWriteStreamType(), 'TYPE_UNSPECIFIED');
    });
  });

  describe('initializeStreamConnection', () => {
    it('should invoke initalizeStreamConnection without clientOptions', async () => {
      await bqWriteClient.initialize();
      writeStreamType = 'PENDING';
      const client = new bigquerywriterModule.managedwriter.WriterClient(
        parent,
        bqWriteClient,
        undefined,
        writeStreamType
      );

      await client.initializeStreamConnection();
      const streamId = 'fake-stream-id';
      assert(client.getConnections().connection_list.length === 1);
      // assert(client.getConnections().connections['streamId']);
      assert.strictEqual(client.getStreamId(), streamId);
    });

    it('should invoke initializeStreamConnection with clientOptions', async () => {
      await bqWriteClient.initialize();
      writeStreamType = 'PENDING';
      const clientWithCallOptions =
        new bigquerywriterModule.managedwriter.WriterClient(
          parent,
          bqWriteClient,
          undefined,
          writeStreamType
        );
      const callOptions: gax.CallOptions = {};
      const streamCallOptionsId = 'fake-stream-id-with-call-options';
      const initalizeStreamConnectionWithCallOptionsFake = sandbox.replace(
        clientWithCallOptions,
        'getStreamId',
        sandbox.fake.returns('fake-stream-id-with-call-options')
      );
      await clientWithCallOptions.initializeStreamConnection(callOptions);
      assert(
        clientWithCallOptions.getConnections().connection_list.length === 1
      );
      assert(clientWithCallOptions.getConnections().connections['streamId']);
      assert.strictEqual(
        initalizeStreamConnectionWithCallOptionsFake,
        streamCallOptionsId
      );
    });

    /*it('should invoke initalizeStreamConnection with errors', () => {

    })
    it('should invoke initalizeStreamConnection with closed client', () => {

    })*/

    describe('appendRowsToStream', () => {
      it('should invoke appendRowsToStream without errors', async () => {
        await bqWriteClient.initialize();
        writeStreamType = 'PENDING';
        const client = new bigquerywriterModule.managedwriter.WriterClient(
          parent,
          bqWriteClient,
          undefined,
          writeStreamType
        );

        const streamId = 'fake-stream-id';

        type CustomerRecord = customer_record.customer_record.ICustomerRecord;
        const protoDescriptor: ProtoDescriptor = {};
        protoDescriptor.name = 'CustomerRecord';
        protoDescriptor.field = [
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

        const schema: ProtoSchema = {
          protoDescriptor: protoDescriptor,
        };

        const root = protobufjs.Root.fromJSON(customerRecordProtoJson);
        if (!root) {
          throw Error('Proto must not be undefined');
        }

        const CustomerRecordProto = root.lookupType(
          'customer_record.CustomerRecord'
        );
        // Row 1
        const row1: CustomerRecord = {
          customerName: 'Lovelace',
          rowNum: 1,
        };
        const row1Message = new CustomerRecordMessage(
          row1.rowNum,
          row1.customerName
        ).createCustomerRecord();

        const serializedRow1Message: Uint8Array =
          CustomerRecordProto.encode(row1Message).finish();

        // Row 2
        const row2: CustomerRecord = {
          customerName: 'Turing',
          rowNum: 2,
        };
        const row2Message = new CustomerRecordMessage(
          row2.rowNum,
          row2.customerName
        ).createCustomerRecord();

        const serializedRow2Message: Uint8Array =
          CustomerRecordProto.encode(row2Message).finish();
        console.log(serializedRow1Message);
        console.log(typeof serializedRow2Message);
        const serializedRowData: ProtoData = {
          writerSchema: schema,
          rows: {
            serializedRows: [serializedRow1Message, serializedRow2Message],
          },
        };

        const offset: IInt64Value = {
          value: 0,
        };

        const appendRowsResponsesResult: AppendRowsResponse[] = [
          {
            appendResult: {
              offset: offset,
            },
            writeStream: streamId,
          },
        ];
        await client.initializeStreamConnection();
        const appendRowResponses = await client.appendRowsToStream(
          streamId,
          serializedRowData,
          offset
        );
        assert.strictEqual(appendRowsResponsesResult, appendRowResponses);
      });

      /*it('should invoke appendRowsToStream with errors', () => {

    })*/

      /*it('should invoke appendRowsToStream with closed client', () => {

    })*/
    });

    describe('closeStream', () => {
      it('should invoke closeStream without errors', async () => {
        await bqWriteClient.initialize();
        writeStreamType = 'PENDING';
        const client = new bigquerywriterModule.managedwriter.WriterClient(
          parent,
          bqWriteClient,
          undefined,
          writeStreamType
        );

        const streamId = 'fake-stream-id';

        type CustomerRecord = customer_record.customer_record.ICustomerRecord;
        const protoDescriptor: ProtoDescriptor = {};
        protoDescriptor.name = 'CustomerRecord';
        protoDescriptor.field = [
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

        const schema: ProtoSchema = {
          protoDescriptor: protoDescriptor,
        };

        const root = protobufjs.Root.fromJSON(customerRecordProtoJson);
        if (!root) {
          throw Error('Proto must not be undefined');
        }

        const CustomerRecordProto = root.lookupType(
          'customer_record.CustomerRecord'
        );
        // Row 1
        const row1: CustomerRecord = {
          customerName: 'Lovelace',
          rowNum: 1,
        };
        const row1Message = new CustomerRecordMessage(
          row1.rowNum,
          row1.customerName
        ).createCustomerRecord();

        const serializedRow1Message: Uint8Array =
          CustomerRecordProto.encode(row1Message).finish();

        // Row 2
        const row2: CustomerRecord = {
          customerName: 'Turing',
          rowNum: 2,
        };
        const row2Message = new CustomerRecordMessage(
          row2.rowNum,
          row2.customerName
        ).createCustomerRecord();

        const serializedRow2Message: Uint8Array =
          CustomerRecordProto.encode(row2Message).finish();
        console.log(serializedRow1Message);
        console.log(typeof serializedRow2Message);
        const serializedRowData: ProtoData = {
          writerSchema: schema,
          rows: {
            serializedRows: [serializedRow1Message, serializedRow2Message],
          },
        };

        const offset: IInt64Value = {
          value: 0,
        };

        const appendRowsResponsesResult: AppendRowsResponse[] = [
          {
            appendResult: {
              offset: offset,
            },
            writeStream: streamId,
          },
        ];
        await client.initializeStreamConnection();
        await client.appendRowsToStream(streamId, serializedRowData, offset);
        await client.closeStream();

        assert.strictEqual(client.getClientClosedStatus, true);
      });

      /*it('should invoke closeStream with errors', () => {

    })*/

      /*it('should invoke closeStream with closed client', () => {

    })*/
    });
  });
});

// Copyright 2023 Google LLC
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

import * as assert from 'assert';
import {describe, it} from 'mocha';
import * as uuid from 'uuid';
import {BigQuery} from '@google-cloud/bigquery';
import * as protos from '../../protos/protos';
import * as bigquerywriterModule from '../../src';
import {ClientOptions, protobuf} from 'google-gax';
import * as customerprotos from './test_protos/customer_record';
import * as customerRecordProtoJson from './test_protos/customer_record.json';

type WriteStream = protos.google.cloud.bigquery.storage.v1.IWriteStream;
type ProtoDescriptor = protos.google.protobuf.IDescriptorProto;
type IInt64Value = protos.google.protobuf.IInt64Value;
type AppendRowsResponse =
  protos.google.cloud.bigquery.storage.v1.IAppendRowsResponse;

type CustomerRecord = customerprotos.customer_record.ICustomerRecord;
const FieldDescriptorProtoType =
  protos.google.protobuf.FieldDescriptorProto.Type;

const GCLOUD_TESTS_PREFIX = 'nodejs_bqstorage_samples_test';
const bigquery = new BigQuery();
const generateUuid = () =>
  `${GCLOUD_TESTS_PREFIX}_${uuid.v4()}`.replace(/-/gi, '_');
const datasetId = generateUuid();
const tableId = generateUuid();

const root = protobuf.Root.fromJSON(customerRecordProtoJson);
if (!root) {
  throw Error('Proto must not be undefined');
}
const CustomerRecord = root.lookupType('customer_record.CustomerRecord');

describe('managedwriter.WriterClient', () => {
  let projectId: string;
  let parent: string;
  let bqWriteClient: bigquerywriterModule.BigQueryWriteClient;
  let clientOptions: ClientOptions;
  let writeStreamType: WriteStream['type'];

  before(async () => {
    await bigquery.createDataset(datasetId);
    const schema = [
      {
        name: 'customer_name',
        type: 'STRING',
      },
      {
        name: 'row_num',
        type: 'INT64',
      },
    ];

    const [table] = await bigquery
      .dataset(datasetId)
      .createTable(tableId, {schema});

    projectId = table.metadata.tableReference.projectId;

    parent = `projects/${projectId}/datasets/${datasetId}/tables/${tableId}`;
  });

  after(async () => {
    await bigquery.dataset(datasetId).delete({force: true}).catch(console.warn);
  });

  beforeEach(async () => {
    writeStreamType = 'TYPE_UNSPECIFIED';
    bqWriteClient = new bigquerywriterModule.BigQueryWriteClient({
      projectId: projectId,
    });
    clientOptions = {
      projectId: projectId,
    };
  });

  afterEach(async () => {
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

  /*describe('initializeStreamConnection', () => {
    it('should invoke initalizeStreamConnection with or without clientOptions without errors', async () => {
      await bqWriteClient.initialize();
      writeStreamType = 'PENDING';
      const client = new bigquerywriterModule.managedwriter.WriterClient(
        parent,
        bqWriteClient,
        undefined,
        writeStreamType
      );
      const numConnections: number =
        client.getConnections().connectionList.length;

      client.createWriteStream().then(() => {
        const streamId = 'fake-stream-id';
        const streamIdResult = sinon.replace(
          client,
          'getStreamId',
          sinon.fake.returns(streamId)
        );
        assert(client.getConnections().connectionList.length === 1);
        assert(client.getConnections().connections['streamId']);
        assert.strictEqual(streamIdResult, streamId);
      });

      // invokes initializeStreamConnection with CallOptions
      const callOptions: gax.CallOptions = {};
      const streamCallOptionsId = 'fake-stream-id-with-call-options';
      client.createWriteStream().then((streamId) => client.createManagedStream(streamId)).then(() => {
        const streamIdCallOptionsResult = sinon.replace(
          client,
          'getStreamId',
          sinon.fake.returns(streamCallOptionsId)
        );
        console.log(client.getConnections().connectionList.length);
        assert(
          client.getConnections().connectionList.length === numConnections + 2
        );
        assert(client.getConnections().connections['streamId']);
        assert.strictEqual(streamIdCallOptionsResult, streamCallOptionsId);
      });
    });

    it('should invoke initalizeStreamConnection with errors', () => {

    })
    it('should invoke initalizeStreamConnection with closed client', () => {

    })
  });*/

  describe('appendRowsToStream', () => {
    it('should invoke appendRowsToStream without errors', async () => {
      bqWriteClient.initialize();
      const writeStreamType: WriteStream['type'] = 'PENDING';
      const client = new bigquerywriterModule.managedwriter.WriterClient(
        parent,
        bqWriteClient,
        undefined,
        writeStreamType
      );

      const protoDescriptor: ProtoDescriptor = {};
      protoDescriptor.name = 'CustomerRecord';
      protoDescriptor.field = [
        {
          name: 'customer_name',
          number: 1,
          type: FieldDescriptorProtoType.TYPE_STRING,
        },
        {
          name: 'row_num',
          number: 2,
          type: FieldDescriptorProtoType.TYPE_INT64,
        },
      ];

      // Row 1
      const row1: CustomerRecord = {
        customerName: 'Ada Lovelace',
        rowNum: 1,
      };
      const row1Message = CustomerRecord.create(row1);
      const serializedRow1Message: Uint8Array =
        CustomerRecord.encode(row1Message).finish();

      // Row 2
      const row2: CustomerRecord = {
        customerName: 'Alan Turing',
        rowNum: 2,
      };
      const row2Message = CustomerRecord.create(row2);
      const serializedRow2Message: Uint8Array =
        CustomerRecord.encode(row2Message).finish();

      const offset: IInt64Value['value'] = '0';

      const streamName = await client.createWriteStream();
      const appendRowsResponsesResult: AppendRowsResponse[] = [
        {
          appendResult: {
            offset: {
              value: offset,
            },
          },
          writeStream: streamName,
        },
      ];
      try {
        const managedStream = await client.createManagedStream(
          streamName,
          protoDescriptor
        );
        const pw = managedStream.appendRows(
          {
            serializedRows: [serializedRow1Message, serializedRow2Message],
          },
          offset
        );
        const result = await pw.getResult();
        const responses: AppendRowsResponse[] = [
          {
            appendResult: result.appendResult,
            writeStream: result.writeStream,
          },
        ];

        assert.deepEqual(appendRowsResponsesResult, responses);

        const rowCount = await managedStream.finalize();
        managedStream.close();
        assert.equal(rowCount, 2);

        const commitResponse = await client.batchCommitWriteStream({
          parent: client.getParent(),
          writeStreams: [streamName],
        });
        assert.equal(commitResponse.streamErrors?.length, 0);
      } finally {
        client.close();
      }

      return Promise.resolve();
    });

    it('should invoke appendRows to default stream without errors', async () => {
      bqWriteClient.initialize();
      const client = new bigquerywriterModule.managedwriter.WriterClient(
        parent,
        bqWriteClient,
        undefined,
        'COMMITTED'
      );

      const protoDescriptor: ProtoDescriptor = {};
      protoDescriptor.name = 'CustomerRecord';
      protoDescriptor.field = [
        {
          name: 'customer_name',
          number: 1,
          type: FieldDescriptorProtoType.TYPE_STRING,
        },
        {
          name: 'row_num',
          number: 2,
          type: FieldDescriptorProtoType.TYPE_INT64,
        },
      ];

      // Row 1
      const row1: CustomerRecord = {
        customerName: 'Lovelace',
        rowNum: 1,
      };
      const row1Message = CustomerRecord.create(row1);
      const serializedRow1Message: Uint8Array =
        CustomerRecord.encode(row1Message).finish();

      // Row 2
      const row2: CustomerRecord = {
        customerName: 'Turing',
        rowNum: 2,
      };
      const row2Message = CustomerRecord.create(row2);
      const serializedRow2Message: Uint8Array =
        CustomerRecord.encode(row2Message).finish();

      const appendRowsResponsesResult: AppendRowsResponse[] = [
        {
          appendResult: {
            offset: null,
          },
          writeStream: parent + '/streams/_default',
        },
        {
          appendResult: {
            offset: null,
          },
          writeStream: parent + '/streams/_default',
        },
      ];
      try {
        const managedStream = await client.createManagedStream(
          bigquerywriterModule.managedwriter.DefaultStream,
          protoDescriptor
        );
        const pw1 = await managedStream.appendRows({
          serializedRows: [serializedRow1Message, serializedRow2Message],
        });
        const pw2 = await managedStream.appendRows({
          serializedRows: [serializedRow1Message, serializedRow2Message],
        });
        const results = await Promise.all([pw1.getResult(), pw2.getResult()]);
        const responses: AppendRowsResponse[] = results.map(result => ({
          appendResult: result.appendResult,
          writeStream: result.writeStream,
        }));

        assert.deepEqual(appendRowsResponsesResult, responses);

        managedStream.close();
        client.close();
      } finally {
        client.close();
      }

      return Promise.resolve();
    });

    /*it('should invoke appendRowsToStream with errors', () => {

    })*/

    /*it('should invoke appendRowsToStream with closed client', () => {

    })*/
  });

  describe('closeStream', () => {
    it('should invoke closeStream without errors', () => {
      bqWriteClient.initialize();
      const writeStreamType: WriteStream['type'] = 'PENDING';
      const client = new bigquerywriterModule.managedwriter.WriterClient(
        parent,
        bqWriteClient,
        undefined,
        writeStreamType
      );

      const protoDescriptor: ProtoDescriptor = {};
      protoDescriptor.name = 'CustomerRecord';
      protoDescriptor.field = [
        {
          name: 'customer_name',
          number: 1,
          type: FieldDescriptorProtoType.TYPE_STRING,
        },
        {
          name: 'row_num',
          number: 2,
          type: FieldDescriptorProtoType.TYPE_INT64,
        },
      ];

      // Row 1
      const row1: CustomerRecord = {
        customerName: 'Lovelace',
        rowNum: 1,
      };
      const row1Message = CustomerRecord.create(row1);
      const serializedRow1Message: Uint8Array =
        CustomerRecord.encode(row1Message).finish();

      // Row 2
      const row2: CustomerRecord = {
        customerName: 'Turing',
        rowNum: 2,
      };
      const row2Message = CustomerRecord.create(row2);
      const serializedRow2Message: Uint8Array =
        CustomerRecord.encode(row2Message).finish();

      const offset: number = 0;

      client
        .createWriteStream()
        .then(streamName => {
          return client.createManagedStream(streamName, protoDescriptor);
        })
        .then(ms => {
          return ms.appendRows(
            {
              serializedRows: [serializedRow1Message, serializedRow2Message],
            },
            offset
          );
        })
        .then(() => {
          client.close();
        })
        .finally(() => {
          assert.strictEqual(client.getClientClosedStatus, true);
        });
    });

    /*it('should invoke closeStream with errors', () => {

    })*/

    /*it('should invoke closeStream with closed client', () => {

    })*/
  });
});

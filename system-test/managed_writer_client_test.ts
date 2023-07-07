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
import {describe, it, xit} from 'mocha';
import * as uuid from 'uuid';
import * as gax from 'google-gax';
import {BigQuery, TableSchema} from '@google-cloud/bigquery';
import * as protos from '../protos/protos';
import * as bigquerywriter from '../src';
import {ClientOptions, protobuf} from 'google-gax';
import * as customerRecordProtoJson from '../samples/customer_record.json';

const {managedwriter, adapt} = bigquerywriter;
const {WriterClient, Writer, JSONWriter, parseStorageErrors} = managedwriter;
const {Type} = protobuf;

if (process.env.NODE_ENV === 'DEBUG') {
  managedwriter.setLogFunction(console.log);
}

type WriteStream = protos.google.cloud.bigquery.storage.v1.IWriteStream;
type DescriptorProto = protos.google.protobuf.IDescriptorProto;
type IInt64Value = protos.google.protobuf.IInt64Value;
type AppendRowsResponse =
  protos.google.cloud.bigquery.storage.v1.IAppendRowsResponse;

const FieldDescriptorProtoType =
  protos.google.protobuf.FieldDescriptorProto.Type;

const GCLOUD_TESTS_PREFIX = 'nodejs_bqstorage_samples_test';
const bigquery = new BigQuery();
const generateUuid = () =>
  `${GCLOUD_TESTS_PREFIX}_${uuid.v4()}`.replace(/-/gi, '_');
const datasetId = generateUuid();

const root = protobuf.Root.fromJSON(customerRecordProtoJson);
if (!root) {
  throw Error('Proto must not be undefined');
}
const CustomerRecord = root.lookupType('CustomerRecord');

describe('managedwriter.WriterClient', () => {
  let projectId: string;
  let parent: string;
  let tableId: string;
  let bqWriteClient: bigquerywriter.BigQueryWriteClient;
  let clientOptions: ClientOptions;
  const schema: TableSchema = {
    fields: [
      {
        name: 'customer_name',
        type: 'STRING',
        mode: 'REQUIRED',
      },
      {
        name: 'row_num',
        type: 'INTEGER',
        mode: 'REQUIRED',
      },
    ],
  };
  const protoDescriptor: DescriptorProto = {
    name: 'CustomerRecord',
    field: [
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
    ],
  };

  before(async () => {
    await bigquery.createDataset(datasetId);
  });

  beforeEach(async () => {
    tableId = generateUuid();

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
    clientOptions = {
      projectId: projectId,
      'grpc.keepalive_time_ms': 30 * 1000,
      'grpc.keepalive_timeout_ms': 10 * 1000,
    };
    bqWriteClient = new bigquerywriter.BigQueryWriteClient(clientOptions);
  });

  afterEach(async () => {
    await bqWriteClient.close();
  });

  describe('Common methods', () => {
    it('should create a client without arguments', () => {
      const client = new WriterClient();
      assert(client.getClient());
    });

    it('should create a client with arguments: parent, client, opts, writeStream', async () => {
      const client = new WriterClient(clientOptions);
      assert(client.getClient());
      const clientId = await client.getClient().getProjectId();
      assert.strictEqual(clientId, clientOptions.projectId);
    });
  });

  describe('Writer', () => {
    it('should invoke appendRows without errors', async () => {
      bqWriteClient.initialize();
      const streamType: WriteStream['type'] = managedwriter.PendingStream;
      const client = new WriterClient();
      client.setClient(bqWriteClient);

      // Row 1
      const row1 = {
        customer_name: 'Ada Lovelace',
        row_num: 1,
      };
      const row1Message = CustomerRecord.create(row1);
      const serializedRow1Message: Uint8Array =
        CustomerRecord.encode(row1Message).finish();

      // Row 2
      const row2 = {
        customer_name: 'Alan Turing',
        row_num: 2,
      };
      const row2Message = CustomerRecord.create(row2);
      const serializedRow2Message: Uint8Array =
        CustomerRecord.encode(row2Message).finish();

      const offset: IInt64Value['value'] = '0';

      const streamId = await client.createWriteStream({
        streamType,
        destinationTable: parent,
      });
      const appendRowsResponsesResult: AppendRowsResponse[] = [
        {
          appendResult: {
            offset: {
              value: offset,
            },
          },
          writeStream: streamId,
        },
      ];
      try {
        const connection = await client.createStreamConnection({
          streamId,
        });
        const writer = new Writer({
          connection,
          protoDescriptor,
        });
        const pw = writer.appendRows(
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

        const res = await connection.finalize();
        connection.close();
        assert.equal(res?.rowCount, 2);

        const commitResponse = await client.batchCommitWriteStream({
          parent,
          writeStreams: [streamId],
        });
        assert.equal(commitResponse.streamErrors?.length, 0);
      } finally {
        client.close();
      }
    });

    it('should invoke appendRows to default stream without errors', async () => {
      bqWriteClient.initialize();
      const client = new WriterClient();
      client.setClient(bqWriteClient);

      // Row 1
      const row1 = {
        customer_name: 'Lovelace',
        row_num: 1,
      };
      const row1Message = CustomerRecord.create(row1);
      const serializedRow1Message: Uint8Array =
        CustomerRecord.encode(row1Message).finish();

      // Row 2
      const row2 = {
        customer_name: 'Turing',
        row_num: 2,
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
        const connection = await client.createStreamConnection({
          streamId: managedwriter.DefaultStream,
          destinationTable: parent,
        });
        const writer = new Writer({
          connection,
          protoDescriptor,
        });
        const pw1 = await writer.appendRows({
          serializedRows: [serializedRow1Message, serializedRow2Message],
        });
        const pw2 = await writer.appendRows({
          serializedRows: [serializedRow1Message, serializedRow2Message],
        });
        const results = await Promise.all([pw1.getResult(), pw2.getResult()]);
        const responses: AppendRowsResponse[] = results.map(result => ({
          appendResult: result.appendResult,
          writeStream: result.writeStream,
        }));

        assert.deepEqual(appendRowsResponsesResult, responses);

        writer.close();
        client.close();
      } finally {
        client.close();
      }
    });

    it('should invoke createWriteStream when streamType and destination table informed to createStreamConnection', async () => {
      bqWriteClient.initialize();
      const streamType: WriteStream['type'] = managedwriter.PendingStream;
      const client = new WriterClient();
      client.setClient(bqWriteClient);

      // Row 1
      const row1 = {
        customer_name: 'Lovelace',
        row_num: 1,
      };
      const row1Message = CustomerRecord.create(row1);
      const serializedRow1Message: Uint8Array =
        CustomerRecord.encode(row1Message).finish();

      // Row 2
      const row2 = {
        customer_name: 'Turing',
        row_num: 2,
      };
      const row2Message = CustomerRecord.create(row2);
      const serializedRow2Message: Uint8Array =
        CustomerRecord.encode(row2Message).finish();

      try {
        const connection = await client.createStreamConnection({
          streamType,
          destinationTable: parent,
        });
        const streamId = connection.getStreamId();
        const writer = new Writer({
          connection,
          protoDescriptor,
        });
        const pw1 = await writer.appendRows({
          serializedRows: [serializedRow1Message, serializedRow2Message],
        });
        const pw2 = await writer.appendRows({
          serializedRows: [serializedRow1Message, serializedRow2Message],
        });
        const results = await Promise.all([pw1.getResult(), pw2.getResult()]);
        const responses: AppendRowsResponse[] = results.map(result => ({
          appendResult: result.appendResult,
          writeStream: result.writeStream,
        }));

        const appendRowsResponsesResult: AppendRowsResponse[] = [
          {
            appendResult: {
              offset: {
                value: '0',
              },
            },
            writeStream: streamId,
          },
          {
            appendResult: {
              offset: {
                value: '2',
              },
            },
            writeStream: streamId,
          },
        ];
        assert.deepEqual(appendRowsResponsesResult, responses);

        const res = await connection.finalize();
        connection.close();
        assert.equal(res?.rowCount, 4);

        const commitResponse = await client.batchCommitWriteStream({
          parent,
          writeStreams: [streamId],
        });
        assert.equal(commitResponse.streamErrors?.length, 0);
      } finally {
        client.close();
      }
    });
  });

  describe('JSONWriter', () => {
    it('should invoke appendRows without errors', async () => {
      bqWriteClient.initialize();
      const streamType: WriteStream['type'] = managedwriter.PendingStream;
      const client = new WriterClient();
      client.setClient(bqWriteClient);

      const storageSchema =
        adapt.convertBigQuerySchemaToStorageTableSchema(schema);
      const protoDescriptor: DescriptorProto =
        adapt.convertStorageSchemaToProto2Descriptor(storageSchema, 'root');

      // Row 1
      const row1 = {
        customer_name: 'Ada Lovelace',
        row_num: 1,
      };

      // Row 2
      const row2 = {
        customer_name: 'Alan Turing',
        row_num: 2,
      };

      const offset: IInt64Value['value'] = '0';

      const streamId = await client.createWriteStream({
        streamType,
        destinationTable: parent,
      });
      const appendRowsResponsesResult: AppendRowsResponse[] = [
        {
          appendResult: {
            offset: {
              value: offset,
            },
          },
          writeStream: streamId,
        },
      ];
      try {
        const connection = await client.createStreamConnection({
          streamId,
        });
        const writer = new JSONWriter({
          connection,
          protoDescriptor,
        });
        const pw = writer.appendRows([row1, row2], offset);
        const result = await pw.getResult();
        const responses: AppendRowsResponse[] = [
          {
            appendResult: result.appendResult,
            writeStream: result.writeStream,
          },
        ];

        assert.deepEqual(appendRowsResponsesResult, responses);

        const res = await connection.finalize();
        connection.close();
        assert.equal(res?.rowCount, 2);

        const commitResponse = await client.batchCommitWriteStream({
          parent,
          writeStreams: [streamId],
        });
        assert.equal(commitResponse.streamErrors?.length, 0);

        writer.close();
      } finally {
        client.close();
      }
    });

    it('should update proto descriptor automatically with appendRows without errors', async () => {
      bqWriteClient.initialize();
      const client = new WriterClient();
      client.setClient(bqWriteClient);

      const storageSchema =
        adapt.convertBigQuerySchemaToStorageTableSchema(schema);
      const protoDescriptor: DescriptorProto =
        adapt.convertStorageSchemaToProto2Descriptor(storageSchema, 'root');

      // Row 1
      const row1 = {
        customer_name: 'Ada Lovelace',
        row_num: 1,
      };

      // Row 2
      const row2 = {
        customer_name: 'Alan Turing',
        row_num: 2,
      };

      let receivedSchemaNotification = false;
      try {
        const connection = await client.createStreamConnection({
          streamType: managedwriter.PendingStream,
          destinationTable: parent,
        });
        connection.onSchemaUpdated(schema => {
          receivedSchemaNotification = !!schema;
        });
        connection.onConnectionError(err => {
          throw err;
        });

        const streamId = connection.getStreamId();
        const writer = new JSONWriter({
          connection,
          protoDescriptor,
        });

        let offset: IInt64Value['value'] = 0;
        let pw = writer.appendRows([row1, row2], offset);
        let result = await pw.getResult();

        assert.equal(result.error, null);

        const updatedSchema = {
          fields: [
            ...(schema.fields || []),
            {
              name: 'customer_email',
              type: 'STRING',
            },
          ],
        };
        const [md] = await bigquery
          .dataset(datasetId)
          .table(tableId)
          .setMetadata({
            schema: updatedSchema,
          });
        assert.deepEqual(md.schema, updatedSchema);

        // Row with new field
        const rowUpdated = {
          customer_name: 'Charles Babbage',
          row_num: 3,
          customer_email: 'charles@babbage.com',
        };
        offset = 2;

        while (!result.updatedSchema) {
          pw = writer.appendRows([rowUpdated], offset);
          rowUpdated.row_num++;
          offset++;
          result = await pw.getResult();
        }

        const updatedStorageSchema =
          adapt.convertBigQuerySchemaToStorageTableSchema(updatedSchema);
        assert.equal(
          result.updatedSchema.fields?.length,
          updatedStorageSchema.fields?.length
        );
        assert.equal(receivedSchemaNotification, true);

        pw = writer.appendRows([rowUpdated], offset);
        offset++;
        result = await pw.getResult();

        const res = await connection.finalize();
        connection.close();
        assert.equal(res?.rowCount, offset);

        const commitResponse = await client.batchCommitWriteStream({
          parent,
          writeStreams: [streamId],
        });
        assert.equal(commitResponse.streamErrors?.length, 0);

        const [rows] = await bigquery.query(
          `SELECT * FROM \`${projectId}.${datasetId}.${tableId}\` order by row_num`
        );

        assert.strictEqual(rows.length, offset);
        assert.deepEqual(rows[rows.length - 1], rowUpdated);

        writer.close();
      } finally {
        client.close();
      }
    }).timeout(30 * 1000);
  });

  describe('Error Scenarios', () => {
    it('send request with mismatched proto descriptor', async () => {
      bqWriteClient.initialize();
      const client = new WriterClient();
      client.setClient(bqWriteClient);

      const storageSchema =
        adapt.convertBigQuerySchemaToStorageTableSchema(schema);
      const protoDescriptor: DescriptorProto =
        adapt.convertStorageSchemaToProto2Descriptor(storageSchema, 'root');

      // Row 1
      const row1 = {
        customer_name: 'Ada Lovelace',
        row_num: 1,
      };

      // Row 2
      const row2 = {
        customer_name: 'Alan Turing',
        row_num: 2,
      };

      let storageErrors: protos.google.cloud.bigquery.storage.v1.IStorageError[] =
        [];
      try {
        const connection = await client.createStreamConnection({
          streamType: managedwriter.PendingStream,
          destinationTable: parent,
        });

        connection.onConnectionError((err: gax.GoogleError) => {
          storageErrors = parseStorageErrors(err);
        });

        const writer = new JSONWriter({
          connection,
          protoDescriptor,
        });

        let offset: IInt64Value['value'] = 0;
        let pw = writer.appendRows([row1, row2], offset);
        await pw.getResult();

        protoDescriptor.field = [
          ...(protoDescriptor.field || []),
          {
            name: 'customer_email',
            number: 3,
            type: FieldDescriptorProtoType.TYPE_STRING,
          },
        ];
        writer.setProtoDescriptor(protoDescriptor);

        const row3 = {
          customer_name: 'Test',
          row_num: 3,
          customer_email: 'test@example.com',
        };
        offset = 2;

        pw = writer.appendRows([row3], offset);
        try {
          await pw.getResult();
        } catch (err) {
          assert.notEqual(err, null);
        }

        assert.equal(storageErrors.length, 1);
        assert.equal(
          storageErrors[0].errorMessage,
          'Schema mismatch due to extra fields in user schema'
        );

        writer.close();
      } finally {
        client.close();
      }
    });

    it('send request with invalid protobuf row', async () => {
      bqWriteClient.initialize();
      const client = new WriterClient();
      client.setClient(bqWriteClient);

      const storageSchema =
        adapt.convertBigQuerySchemaToStorageTableSchema(schema);
      const protoDescriptor: DescriptorProto =
        adapt.convertStorageSchemaToProto2Descriptor(storageSchema, 'root');

      try {
        const connection = await client.createStreamConnection({
          streamType: managedwriter.PendingStream,
          destinationTable: parent,
        });

        const writer = new Writer({
          connection,
          protoDescriptor,
        });

        protoDescriptor.field = protoDescriptor.field?.slice(0, 1); // leave just first field
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const invalidProto = (Type as any).fromDescriptor(
          protoDescriptor
        ) as protobuf.Type;
        const row = {
          customer_name: 'Test',
        };
        const serialized = invalidProto.encode(row).finish();

        const pw = writer.appendRows(
          {
            serializedRows: [serialized],
          },
          0
        );
        const res = await pw.getResult();
        assert.notEqual(res.error, null);
        assert.equal(
          res.error?.message?.split('.')[0],
          'Errors found while processing rows'
        );

        writer.close();
      } finally {
        client.close();
      }
    });

    it('send empty rows request should return an error', async () => {
      bqWriteClient.initialize();
      const client = new WriterClient();
      client.setClient(bqWriteClient);

      const storageSchema =
        adapt.convertBigQuerySchemaToStorageTableSchema(schema);
      const protoDescriptor: DescriptorProto =
        adapt.convertStorageSchemaToProto2Descriptor(storageSchema, 'root');

      try {
        const connection = await client.createStreamConnection({
          streamType: managedwriter.PendingStream,
          destinationTable: parent,
        });

        const writer = new JSONWriter({
          connection,
          protoDescriptor,
        });

        const pw = writer.appendRows([], 0);
        const res = await pw.getResult();
        assert.notEqual(res.error, null);
        assert.equal(
          res.error?.message?.split('.')[0],
          'Rows must be specified'
        );

        writer.close();
      } finally {
        client.close();
      }
    });

    it('send large request should return an error', async () => {
      bqWriteClient.initialize();
      const client = new WriterClient();
      client.setClient(bqWriteClient);

      const storageSchema =
        adapt.convertBigQuerySchemaToStorageTableSchema(schema);
      const protoDescriptor: DescriptorProto =
        adapt.convertStorageSchemaToProto2Descriptor(storageSchema, 'root');

      try {
        const connection = await client.createStreamConnection({
          streamType: managedwriter.PendingStream,
          destinationTable: parent,
        });

        const writer = new Writer({
          connection,
          protoDescriptor,
        });

        const row = {
          customer_name: 'Lovelace',
          row_num: 1,
        };
        const rowMessage = CustomerRecord.create(row);
        const serializedRowMessage: Uint8Array =
          CustomerRecord.encode(rowMessage).finish();

        const rows: Uint8Array[] = [];
        const targetSize = 11 * 1024 * 1024; // 11 MB;
        const numRows = targetSize / serializedRowMessage.length;
        for (let i = 0; i < numRows; i++) {
          rows.push(serializedRowMessage);
        }
        const badPw = writer.appendRows(
          {
            serializedRows: rows,
          },
          0
        );
        let foundErr: Error | null = null;
        try {
          await badPw.getResult();
        } catch (err) {
          foundErr = err as Error;
        }
        assert.notEqual(foundErr, null);
        assert.equal(
          foundErr?.message.includes('contains an invalid argument.'),
          true
        );

        const goodPw = writer.appendRows(
          {
            serializedRows: [serializedRowMessage],
          },
          0
        );
        const res = await goodPw.getResult();
        assert.equal(res.appendResult?.offset?.value, '0');

        writer.close();
      } finally {
        client.close();
      }
    });

    xit('reconnect on idle connection', async () => {
      bqWriteClient.initialize();
      const client = new WriterClient();
      client.setClient(bqWriteClient);

      // Row 1
      const row1 = {
        customer_name: 'Ada Lovelace',
        row_num: 1,
      };

      // Row 2
      const row2 = {
        customer_name: 'Alan Turing',
        row_num: 2,
      };

      try {
        const connection = await client.createStreamConnection({
          streamType: managedwriter.PendingStream,
          destinationTable: parent,
        });

        connection.onConnectionError(err => {
          console.log('idle conn err', err);
        });

        const writer = new JSONWriter({
          connection,
          protoDescriptor,
        });

        let pw = writer.appendRows([row1, row2], 0);
        await pw.getResult();

        const sleep = (ms: number) =>
          new Promise(resolve => {
            setTimeout(resolve, ms);
          });
        const minutes = 10;
        for (let i = 0; i <= minutes; i++) {
          console.log('sleeping for a minute: ', minutes - i, 'to go');
          await sleep(60 * 1000);
        }

        const row3 = {
          customer_name: 'Test',
          row_num: 3,
          customer_email: 'test@example.com',
        };

        pw = writer.appendRows([row3], 2);
        await pw.getResult();

        const res = await connection.finalize();
        connection.close();
        assert.equal(res?.rowCount, 3);

        writer.close();
      } finally {
        client.close();
      }
    }).timeout(20 * 60 * 1000);
  });

  describe('close', () => {
    it('should invoke close without errors', async () => {
      bqWriteClient.initialize();
      const streamType: WriteStream['type'] = managedwriter.PendingStream;
      const client = new WriterClient();
      client.setClient(bqWriteClient);

      // Row 1
      const row1 = {
        customer_name: 'Lovelace',
        row_num: 1,
      };
      const row1Message = CustomerRecord.create(row1);
      const serializedRow1Message: Uint8Array =
        CustomerRecord.encode(row1Message).finish();

      // Row 2
      const row2 = {
        customer_name: 'Turing',
        row_num: 2,
      };
      const row2Message = CustomerRecord.create(row2);
      const serializedRow2Message: Uint8Array =
        CustomerRecord.encode(row2Message).finish();

      const offset = 0;
      try {
        const streamId = await client.createWriteStream({
          streamType,
          destinationTable: parent,
        });
        const connection = await client.createStreamConnection({streamId});
        const writer = new Writer({
          connection,
          protoDescriptor,
        });
        const pw = writer.appendRows(
          {
            serializedRows: [serializedRow1Message, serializedRow2Message],
          },
          offset
        );
        await pw.getResult();

        writer.close();
        client.close();
        assert.strictEqual(client.isOpen(), false);
      } finally {
        client.close();
      }
    });
  });
});

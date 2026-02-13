// Copyright 2025 Google LLC
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

import * as protos from '../protos/protos';
import * as assert from 'assert';
import * as sinon from 'sinon';
import {describe, it} from 'mocha';
import * as bigqueryreadModule from '../src';

describe('Picosecond Precision Support', () => {
  it('falls back to microsecond precision when picosecond precision is requested for Arrow', async () => {
    const client = new bigqueryreadModule.v1.BigQueryReadClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    await client.initialize();

    const request: protos.google.cloud.bigquery.storage.v1.ICreateReadSessionRequest = {
      parent: 'projects/bogus',
      readSession: {
        table: 'projects/bogus/datasets/bogus/tables/bogus',
        dataFormat: protos.google.cloud.bigquery.storage.v1.DataFormat.ARROW,
        readOptions: {
          arrowSerializationOptions: {
            timestampPrecision: protos.google.cloud.bigquery.storage.v1.ArrowSerializationOptions.PicosecondTimestampPrecision.PICOSECOND
          }
        }
      }
    };

    const expectedResponse = new protos.google.cloud.bigquery.storage.v1.ReadSession();
    const stub = sinon.stub().resolves([expectedResponse]);
    client.innerApiCalls.createReadSession = stub;

    const consoleWarnStub = sinon.stub(console, 'warn');

    await client.createReadSession(request);

    assert(consoleWarnStub.calledOnce);
    assert(consoleWarnStub.calledWith('Apache Arrow does not support picosecond precision. Falling back to microsecond precision.'));

    const actualRequest = stub.getCall(0).args[0];
    assert.strictEqual(
      actualRequest.readSession.readOptions.arrowSerializationOptions.timestampPrecision,
      protos.google.cloud.bigquery.storage.v1.ArrowSerializationOptions.PicosecondTimestampPrecision.MICROSECOND
    );

    consoleWarnStub.restore();
  });

  it('falls back to microsecond precision when picosecond precision is requested as a string for Arrow', async () => {
    const client = new bigqueryreadModule.v1.BigQueryReadClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    await client.initialize();

    const request: any = {
      parent: 'projects/bogus',
      readSession: {
        table: 'projects/bogus/datasets/bogus/tables/bogus',
        dataFormat: protos.google.cloud.bigquery.storage.v1.DataFormat.ARROW,
        readOptions: {
          arrowSerializationOptions: {
            timestampPrecision: 'PICOSECOND'
          }
        }
      }
    };

    const expectedResponse = new protos.google.cloud.bigquery.storage.v1.ReadSession();
    const stub = sinon.stub().resolves([expectedResponse]);
    client.innerApiCalls.createReadSession = stub;

    const consoleWarnStub = sinon.stub(console, 'warn');

    await client.createReadSession(request);

    assert(consoleWarnStub.calledOnce);
    assert(consoleWarnStub.calledWith('Apache Arrow does not support picosecond precision. Falling back to microsecond precision.'));

    const actualRequest = stub.getCall(0).args[0];
    assert.strictEqual(
      actualRequest.readSession.readOptions.arrowSerializationOptions.timestampPrecision,
      protos.google.cloud.bigquery.storage.v1.ArrowSerializationOptions.PicosecondTimestampPrecision.MICROSECOND
    );

    consoleWarnStub.restore();
  });

  it('does not fall back when microsecond precision is requested', async () => {
    const client = new bigqueryreadModule.v1.BigQueryReadClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    await client.initialize();

    const request: protos.google.cloud.bigquery.storage.v1.ICreateReadSessionRequest = {
      parent: 'projects/bogus',
      readSession: {
        table: 'projects/bogus/datasets/bogus/tables/bogus',
        dataFormat: protos.google.cloud.bigquery.storage.v1.DataFormat.ARROW,
        readOptions: {
          arrowSerializationOptions: {
            timestampPrecision: protos.google.cloud.bigquery.storage.v1.ArrowSerializationOptions.PicosecondTimestampPrecision.MICROSECOND
          }
        }
      }
    };

    const expectedResponse = new protos.google.cloud.bigquery.storage.v1.ReadSession();
    const stub = sinon.stub().resolves([expectedResponse]);
    client.innerApiCalls.createReadSession = stub;

    const consoleWarnStub = sinon.stub(console, 'warn');

    await client.createReadSession(request);

    assert(consoleWarnStub.notCalled);

    const actualRequest = stub.getCall(0).args[0];
    assert.strictEqual(
      actualRequest.readSession.readOptions.arrowSerializationOptions.timestampPrecision,
      protos.google.cloud.bigquery.storage.v1.ArrowSerializationOptions.PicosecondTimestampPrecision.MICROSECOND
    );

    consoleWarnStub.restore();
  });
});

// Copyright 2021 Google LLC
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

import * as protos from '../protos/protos';
import * as assert from 'assert';
import * as sinon from 'sinon';
import {SinonStub} from 'sinon';
import { describe, it } from 'mocha';
import * as bigquerystorageModule from '../src';

import {PassThrough} from 'stream';

import {protobuf} from 'google-gax';

function generateSampleMessage<T extends object>(instance: T) {
    const filledObject = (instance.constructor as typeof protobuf.Message)
        .toObject(instance as protobuf.Message<T>, {defaults: true});
    return (instance.constructor as typeof protobuf.Message).fromObject(filledObject) as T;
}

function stubSimpleCall<ResponseType>(response?: ResponseType, error?: Error) {
    return error ? sinon.stub().rejects(error) : sinon.stub().resolves([response]);
}

function stubSimpleCallWithCallback<ResponseType>(response?: ResponseType, error?: Error) {
    return error ? sinon.stub().callsArgWith(2, error) : sinon.stub().callsArgWith(2, null, response);
}

function stubServerStreamingCall<ResponseType>(response?: ResponseType, error?: Error) {
    const transformStub = error ? sinon.stub().callsArgWith(2, error) : sinon.stub().callsArgWith(2, null, response);
    const mockStream = new PassThrough({
        objectMode: true,
        transform: transformStub,
    });
    // write something to the stream to trigger transformStub and send the response back to the client
    setImmediate(() => { mockStream.write({}); });
    setImmediate(() => { mockStream.end(); });
    return sinon.stub().returns(mockStream);
}

describe('v1beta1.BigQueryStorageClient', () => {
    it('has servicePath', () => {
        const servicePath = bigquerystorageModule.v1beta1.BigQueryStorageClient.servicePath;
        assert(servicePath);
    });

    it('has apiEndpoint', () => {
        const apiEndpoint = bigquerystorageModule.v1beta1.BigQueryStorageClient.apiEndpoint;
        assert(apiEndpoint);
    });

    it('has port', () => {
        const port = bigquerystorageModule.v1beta1.BigQueryStorageClient.port;
        assert(port);
        assert(typeof port === 'number');
    });

    it('should create a client with no option', () => {
        const client = new bigquerystorageModule.v1beta1.BigQueryStorageClient();
        assert(client);
    });

    it('should create a client with gRPC fallback', () => {
        const client = new bigquerystorageModule.v1beta1.BigQueryStorageClient({
            fallback: true,
        });
        assert(client);
    });

    it('has initialize method and supports deferred initialization', async () => {
        const client = new bigquerystorageModule.v1beta1.BigQueryStorageClient({
            credentials: { client_email: 'bogus', private_key: 'bogus' },
            projectId: 'bogus',
        });
        assert.strictEqual(client.bigQueryStorageStub, undefined);
        await client.initialize();
        assert(client.bigQueryStorageStub);
    });

    it('has close method', () => {
        const client = new bigquerystorageModule.v1beta1.BigQueryStorageClient({
            credentials: { client_email: 'bogus', private_key: 'bogus' },
            projectId: 'bogus',
        });
        client.close();
    });

    it('has getProjectId method', async () => {
        const fakeProjectId = 'fake-project-id';
        const client = new bigquerystorageModule.v1beta1.BigQueryStorageClient({
            credentials: { client_email: 'bogus', private_key: 'bogus' },
            projectId: 'bogus',
        });
        client.auth.getProjectId = sinon.stub().resolves(fakeProjectId);
        const result = await client.getProjectId();
        assert.strictEqual(result, fakeProjectId);
        assert((client.auth.getProjectId as SinonStub).calledWithExactly());
    });

    it('has getProjectId method with callback', async () => {
        const fakeProjectId = 'fake-project-id';
        const client = new bigquerystorageModule.v1beta1.BigQueryStorageClient({
            credentials: { client_email: 'bogus', private_key: 'bogus' },
            projectId: 'bogus',
        });
        client.auth.getProjectId = sinon.stub().callsArgWith(0, null, fakeProjectId);
        const promise = new Promise((resolve, reject) => {
            client.getProjectId((err?: Error|null, projectId?: string|null) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(projectId);
                }
            });
        });
        const result = await promise;
        assert.strictEqual(result, fakeProjectId);
    });

    describe('createReadSession', () => {
        it('invokes createReadSession without error', async () => {
            const client = new bigquerystorageModule.v1beta1.BigQueryStorageClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1beta1.CreateReadSessionRequest());
            request.tableReference = {};
            request.tableReference.projectId = '';
            request.tableReference = {};
            request.tableReference.datasetId = '';
            const expectedHeaderRequestParams = "table_reference.project_id=&table_reference.dataset_id=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1beta1.ReadSession());
            client.innerApiCalls.createReadSession = stubSimpleCall(expectedResponse);
            const [response] = await client.createReadSession(request);
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.createReadSession as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes createReadSession without error using callback', async () => {
            const client = new bigquerystorageModule.v1beta1.BigQueryStorageClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1beta1.CreateReadSessionRequest());
            request.tableReference = {};
            request.tableReference.projectId = '';
            request.tableReference = {};
            request.tableReference.datasetId = '';
            const expectedHeaderRequestParams = "table_reference.project_id=&table_reference.dataset_id=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1beta1.ReadSession());
            client.innerApiCalls.createReadSession = stubSimpleCallWithCallback(expectedResponse);
            const promise = new Promise((resolve, reject) => {
                 client.createReadSession(
                    request,
                    (err?: Error|null, result?: protos.google.cloud.bigquery.storage.v1beta1.IReadSession|null) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
            });
            const response = await promise;
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.createReadSession as SinonStub)
                .getCall(0).calledWith(request, expectedOptions /*, callback defined above */));
        });

        it('invokes createReadSession with error', async () => {
            const client = new bigquerystorageModule.v1beta1.BigQueryStorageClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1beta1.CreateReadSessionRequest());
            request.tableReference = {};
            request.tableReference.projectId = '';
            request.tableReference = {};
            request.tableReference.datasetId = '';
            const expectedHeaderRequestParams = "table_reference.project_id=&table_reference.dataset_id=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedError = new Error('expected');
            client.innerApiCalls.createReadSession = stubSimpleCall(undefined, expectedError);
            await assert.rejects(client.createReadSession(request), expectedError);
            assert((client.innerApiCalls.createReadSession as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });
    });

    describe('batchCreateReadSessionStreams', () => {
        it('invokes batchCreateReadSessionStreams without error', async () => {
            const client = new bigquerystorageModule.v1beta1.BigQueryStorageClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1beta1.BatchCreateReadSessionStreamsRequest());
            request.session = {};
            request.session.name = '';
            const expectedHeaderRequestParams = "session.name=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1beta1.BatchCreateReadSessionStreamsResponse());
            client.innerApiCalls.batchCreateReadSessionStreams = stubSimpleCall(expectedResponse);
            const [response] = await client.batchCreateReadSessionStreams(request);
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.batchCreateReadSessionStreams as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes batchCreateReadSessionStreams without error using callback', async () => {
            const client = new bigquerystorageModule.v1beta1.BigQueryStorageClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1beta1.BatchCreateReadSessionStreamsRequest());
            request.session = {};
            request.session.name = '';
            const expectedHeaderRequestParams = "session.name=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1beta1.BatchCreateReadSessionStreamsResponse());
            client.innerApiCalls.batchCreateReadSessionStreams = stubSimpleCallWithCallback(expectedResponse);
            const promise = new Promise((resolve, reject) => {
                 client.batchCreateReadSessionStreams(
                    request,
                    (err?: Error|null, result?: protos.google.cloud.bigquery.storage.v1beta1.IBatchCreateReadSessionStreamsResponse|null) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
            });
            const response = await promise;
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.batchCreateReadSessionStreams as SinonStub)
                .getCall(0).calledWith(request, expectedOptions /*, callback defined above */));
        });

        it('invokes batchCreateReadSessionStreams with error', async () => {
            const client = new bigquerystorageModule.v1beta1.BigQueryStorageClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1beta1.BatchCreateReadSessionStreamsRequest());
            request.session = {};
            request.session.name = '';
            const expectedHeaderRequestParams = "session.name=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedError = new Error('expected');
            client.innerApiCalls.batchCreateReadSessionStreams = stubSimpleCall(undefined, expectedError);
            await assert.rejects(client.batchCreateReadSessionStreams(request), expectedError);
            assert((client.innerApiCalls.batchCreateReadSessionStreams as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });
    });

    describe('finalizeStream', () => {
        it('invokes finalizeStream without error', async () => {
            const client = new bigquerystorageModule.v1beta1.BigQueryStorageClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1beta1.FinalizeStreamRequest());
            request.stream = {};
            request.stream.name = '';
            const expectedHeaderRequestParams = "stream.name=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.protobuf.Empty());
            client.innerApiCalls.finalizeStream = stubSimpleCall(expectedResponse);
            const [response] = await client.finalizeStream(request);
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.finalizeStream as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes finalizeStream without error using callback', async () => {
            const client = new bigquerystorageModule.v1beta1.BigQueryStorageClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1beta1.FinalizeStreamRequest());
            request.stream = {};
            request.stream.name = '';
            const expectedHeaderRequestParams = "stream.name=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.protobuf.Empty());
            client.innerApiCalls.finalizeStream = stubSimpleCallWithCallback(expectedResponse);
            const promise = new Promise((resolve, reject) => {
                 client.finalizeStream(
                    request,
                    (err?: Error|null, result?: protos.google.protobuf.IEmpty|null) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
            });
            const response = await promise;
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.finalizeStream as SinonStub)
                .getCall(0).calledWith(request, expectedOptions /*, callback defined above */));
        });

        it('invokes finalizeStream with error', async () => {
            const client = new bigquerystorageModule.v1beta1.BigQueryStorageClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1beta1.FinalizeStreamRequest());
            request.stream = {};
            request.stream.name = '';
            const expectedHeaderRequestParams = "stream.name=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedError = new Error('expected');
            client.innerApiCalls.finalizeStream = stubSimpleCall(undefined, expectedError);
            await assert.rejects(client.finalizeStream(request), expectedError);
            assert((client.innerApiCalls.finalizeStream as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });
    });

    describe('splitReadStream', () => {
        it('invokes splitReadStream without error', async () => {
            const client = new bigquerystorageModule.v1beta1.BigQueryStorageClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1beta1.SplitReadStreamRequest());
            request.originalStream = {};
            request.originalStream.name = '';
            const expectedHeaderRequestParams = "original_stream.name=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1beta1.SplitReadStreamResponse());
            client.innerApiCalls.splitReadStream = stubSimpleCall(expectedResponse);
            const [response] = await client.splitReadStream(request);
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.splitReadStream as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes splitReadStream without error using callback', async () => {
            const client = new bigquerystorageModule.v1beta1.BigQueryStorageClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1beta1.SplitReadStreamRequest());
            request.originalStream = {};
            request.originalStream.name = '';
            const expectedHeaderRequestParams = "original_stream.name=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1beta1.SplitReadStreamResponse());
            client.innerApiCalls.splitReadStream = stubSimpleCallWithCallback(expectedResponse);
            const promise = new Promise((resolve, reject) => {
                 client.splitReadStream(
                    request,
                    (err?: Error|null, result?: protos.google.cloud.bigquery.storage.v1beta1.ISplitReadStreamResponse|null) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
            });
            const response = await promise;
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.splitReadStream as SinonStub)
                .getCall(0).calledWith(request, expectedOptions /*, callback defined above */));
        });

        it('invokes splitReadStream with error', async () => {
            const client = new bigquerystorageModule.v1beta1.BigQueryStorageClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1beta1.SplitReadStreamRequest());
            request.originalStream = {};
            request.originalStream.name = '';
            const expectedHeaderRequestParams = "original_stream.name=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedError = new Error('expected');
            client.innerApiCalls.splitReadStream = stubSimpleCall(undefined, expectedError);
            await assert.rejects(client.splitReadStream(request), expectedError);
            assert((client.innerApiCalls.splitReadStream as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });
    });

    describe('readRows', () => {
        it('invokes readRows without error', async () => {
            const client = new bigquerystorageModule.v1beta1.BigQueryStorageClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1beta1.ReadRowsRequest());
            request.readPosition = {};
            request.readPosition.stream = {};
            request.readPosition.stream.name = '';
            const expectedHeaderRequestParams = "read_position.stream.name=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1beta1.ReadRowsResponse());
            client.innerApiCalls.readRows = stubServerStreamingCall(expectedResponse);
            const stream = client.readRows(request);
            const promise = new Promise((resolve, reject) => {
                stream.on('data', (response: protos.google.cloud.bigquery.storage.v1beta1.ReadRowsResponse) => {
                    resolve(response);
                });
                stream.on('error', (err: Error) => {
                    reject(err);
                });
            });
            const response = await promise;
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.readRows as SinonStub)
                .getCall(0).calledWith(request, expectedOptions));
        });

        it('invokes readRows with error', async () => {
            const client = new bigquerystorageModule.v1beta1.BigQueryStorageClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1beta1.ReadRowsRequest());
            request.readPosition = {};
            request.readPosition.stream = {};
            request.readPosition.stream.name = '';
            const expectedHeaderRequestParams = "read_position.stream.name=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedError = new Error('expected');
            client.innerApiCalls.readRows = stubServerStreamingCall(undefined, expectedError);
            const stream = client.readRows(request);
            const promise = new Promise((resolve, reject) => {
                stream.on('data', (response: protos.google.cloud.bigquery.storage.v1beta1.ReadRowsResponse) => {
                    resolve(response);
                });
                stream.on('error', (err: Error) => {
                    reject(err);
                });
            });
            await assert.rejects(promise, expectedError);
            assert((client.innerApiCalls.readRows as SinonStub)
                .getCall(0).calledWith(request, expectedOptions));
        });
    });

    describe('Path templates', () => {

        describe('project', () => {
            const fakePath = "/rendered/path/project";
            const expectedParameters = {
                project: "projectValue",
            };
            const client = new bigquerystorageModule.v1beta1.BigQueryStorageClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            client.pathTemplates.projectPathTemplate.render =
                sinon.stub().returns(fakePath);
            client.pathTemplates.projectPathTemplate.match =
                sinon.stub().returns(expectedParameters);

            it('projectPath', () => {
                const result = client.projectPath("projectValue");
                assert.strictEqual(result, fakePath);
                assert((client.pathTemplates.projectPathTemplate.render as SinonStub)
                    .getCall(-1).calledWith(expectedParameters));
            });

            it('matchProjectFromProjectName', () => {
                const result = client.matchProjectFromProjectName(fakePath);
                assert.strictEqual(result, "projectValue");
                assert((client.pathTemplates.projectPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });
        });

        describe('readSession', () => {
            const fakePath = "/rendered/path/readSession";
            const expectedParameters = {
                project: "projectValue",
                location: "locationValue",
                session: "sessionValue",
            };
            const client = new bigquerystorageModule.v1beta1.BigQueryStorageClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            client.pathTemplates.readSessionPathTemplate.render =
                sinon.stub().returns(fakePath);
            client.pathTemplates.readSessionPathTemplate.match =
                sinon.stub().returns(expectedParameters);

            it('readSessionPath', () => {
                const result = client.readSessionPath("projectValue", "locationValue", "sessionValue");
                assert.strictEqual(result, fakePath);
                assert((client.pathTemplates.readSessionPathTemplate.render as SinonStub)
                    .getCall(-1).calledWith(expectedParameters));
            });

            it('matchProjectFromReadSessionName', () => {
                const result = client.matchProjectFromReadSessionName(fakePath);
                assert.strictEqual(result, "projectValue");
                assert((client.pathTemplates.readSessionPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchLocationFromReadSessionName', () => {
                const result = client.matchLocationFromReadSessionName(fakePath);
                assert.strictEqual(result, "locationValue");
                assert((client.pathTemplates.readSessionPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchSessionFromReadSessionName', () => {
                const result = client.matchSessionFromReadSessionName(fakePath);
                assert.strictEqual(result, "sessionValue");
                assert((client.pathTemplates.readSessionPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });
        });

        describe('stream', () => {
            const fakePath = "/rendered/path/stream";
            const expectedParameters = {
                project: "projectValue",
                location: "locationValue",
                stream: "streamValue",
            };
            const client = new bigquerystorageModule.v1beta1.BigQueryStorageClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            client.pathTemplates.streamPathTemplate.render =
                sinon.stub().returns(fakePath);
            client.pathTemplates.streamPathTemplate.match =
                sinon.stub().returns(expectedParameters);

            it('streamPath', () => {
                const result = client.streamPath("projectValue", "locationValue", "streamValue");
                assert.strictEqual(result, fakePath);
                assert((client.pathTemplates.streamPathTemplate.render as SinonStub)
                    .getCall(-1).calledWith(expectedParameters));
            });

            it('matchProjectFromStreamName', () => {
                const result = client.matchProjectFromStreamName(fakePath);
                assert.strictEqual(result, "projectValue");
                assert((client.pathTemplates.streamPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchLocationFromStreamName', () => {
                const result = client.matchLocationFromStreamName(fakePath);
                assert.strictEqual(result, "locationValue");
                assert((client.pathTemplates.streamPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchStreamFromStreamName', () => {
                const result = client.matchStreamFromStreamName(fakePath);
                assert.strictEqual(result, "streamValue");
                assert((client.pathTemplates.streamPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });
        });
    });
});

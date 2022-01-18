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

import * as protos from '../protos/protos';
import * as assert from 'assert';
import * as sinon from 'sinon';
import {SinonStub} from 'sinon';
import { describe, it } from 'mocha';
import * as bigquerywriteModule from '../src';

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

function stubBidiStreamingCall<ResponseType>(response?: ResponseType, error?: Error) {
    const transformStub = error ? sinon.stub().callsArgWith(2, error) : sinon.stub().callsArgWith(2, null, response);
    const mockStream = new PassThrough({
        objectMode: true,
        transform: transformStub,
    });
    return sinon.stub().returns(mockStream);
}

describe('v1.BigQueryWriteClient', () => {
    it('has servicePath', () => {
        const servicePath = bigquerywriteModule.v1.BigQueryWriteClient.servicePath;
        assert(servicePath);
    });

    it('has apiEndpoint', () => {
        const apiEndpoint = bigquerywriteModule.v1.BigQueryWriteClient.apiEndpoint;
        assert(apiEndpoint);
    });

    it('has port', () => {
        const port = bigquerywriteModule.v1.BigQueryWriteClient.port;
        assert(port);
        assert(typeof port === 'number');
    });

    it('should create a client with no option', () => {
        const client = new bigquerywriteModule.v1.BigQueryWriteClient();
        assert(client);
    });

    it('should create a client with gRPC fallback', () => {
        const client = new bigquerywriteModule.v1.BigQueryWriteClient({
            fallback: true,
        });
        assert(client);
    });

    it('has initialize method and supports deferred initialization', async () => {
        const client = new bigquerywriteModule.v1.BigQueryWriteClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
        assert.strictEqual(client.bigQueryWriteStub, undefined);
        await client.initialize();
        assert(client.bigQueryWriteStub);
    });

    it('has close method', () => {
        const client = new bigquerywriteModule.v1.BigQueryWriteClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
        client.close();
    });

    it('has getProjectId method', async () => {
        const fakeProjectId = 'fake-project-id';
        const client = new bigquerywriteModule.v1.BigQueryWriteClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
        client.auth.getProjectId = sinon.stub().resolves(fakeProjectId);
        const result = await client.getProjectId();
        assert.strictEqual(result, fakeProjectId);
        assert((client.auth.getProjectId as SinonStub).calledWithExactly());
    });

    it('has getProjectId method with callback', async () => {
        const fakeProjectId = 'fake-project-id';
        const client = new bigquerywriteModule.v1.BigQueryWriteClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
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

    describe('createWriteStream', () => {
        it('invokes createWriteStream without error', async () => {
            const client = new bigquerywriteModule.v1.BigQueryWriteClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.CreateWriteStreamRequest());
            request.parent = '';
            const expectedHeaderRequestParams = "parent=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.WriteStream());
            client.innerApiCalls.createWriteStream = stubSimpleCall(expectedResponse);
            const [response] = await client.createWriteStream(request);
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.createWriteStream as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes createWriteStream without error using callback', async () => {
            const client = new bigquerywriteModule.v1.BigQueryWriteClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.CreateWriteStreamRequest());
            request.parent = '';
            const expectedHeaderRequestParams = "parent=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.WriteStream());
            client.innerApiCalls.createWriteStream = stubSimpleCallWithCallback(expectedResponse);
            const promise = new Promise((resolve, reject) => {
                 client.createWriteStream(
                    request,
                    (err?: Error|null, result?: protos.google.cloud.bigquery.storage.v1.IWriteStream|null) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
            });
            const response = await promise;
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.createWriteStream as SinonStub)
                .getCall(0).calledWith(request, expectedOptions /*, callback defined above */));
        });

        it('invokes createWriteStream with error', async () => {
            const client = new bigquerywriteModule.v1.BigQueryWriteClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.CreateWriteStreamRequest());
            request.parent = '';
            const expectedHeaderRequestParams = "parent=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedError = new Error('expected');
            client.innerApiCalls.createWriteStream = stubSimpleCall(undefined, expectedError);
            await assert.rejects(client.createWriteStream(request), expectedError);
            assert((client.innerApiCalls.createWriteStream as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });
    });

    describe('getWriteStream', () => {
        it('invokes getWriteStream without error', async () => {
            const client = new bigquerywriteModule.v1.BigQueryWriteClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.GetWriteStreamRequest());
            request.name = '';
            const expectedHeaderRequestParams = "name=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.WriteStream());
            client.innerApiCalls.getWriteStream = stubSimpleCall(expectedResponse);
            const [response] = await client.getWriteStream(request);
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.getWriteStream as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes getWriteStream without error using callback', async () => {
            const client = new bigquerywriteModule.v1.BigQueryWriteClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.GetWriteStreamRequest());
            request.name = '';
            const expectedHeaderRequestParams = "name=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.WriteStream());
            client.innerApiCalls.getWriteStream = stubSimpleCallWithCallback(expectedResponse);
            const promise = new Promise((resolve, reject) => {
                 client.getWriteStream(
                    request,
                    (err?: Error|null, result?: protos.google.cloud.bigquery.storage.v1.IWriteStream|null) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
            });
            const response = await promise;
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.getWriteStream as SinonStub)
                .getCall(0).calledWith(request, expectedOptions /*, callback defined above */));
        });

        it('invokes getWriteStream with error', async () => {
            const client = new bigquerywriteModule.v1.BigQueryWriteClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.GetWriteStreamRequest());
            request.name = '';
            const expectedHeaderRequestParams = "name=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedError = new Error('expected');
            client.innerApiCalls.getWriteStream = stubSimpleCall(undefined, expectedError);
            await assert.rejects(client.getWriteStream(request), expectedError);
            assert((client.innerApiCalls.getWriteStream as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });
    });

    describe('finalizeWriteStream', () => {
        it('invokes finalizeWriteStream without error', async () => {
            const client = new bigquerywriteModule.v1.BigQueryWriteClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.FinalizeWriteStreamRequest());
            request.name = '';
            const expectedHeaderRequestParams = "name=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.FinalizeWriteStreamResponse());
            client.innerApiCalls.finalizeWriteStream = stubSimpleCall(expectedResponse);
            const [response] = await client.finalizeWriteStream(request);
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.finalizeWriteStream as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes finalizeWriteStream without error using callback', async () => {
            const client = new bigquerywriteModule.v1.BigQueryWriteClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.FinalizeWriteStreamRequest());
            request.name = '';
            const expectedHeaderRequestParams = "name=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.FinalizeWriteStreamResponse());
            client.innerApiCalls.finalizeWriteStream = stubSimpleCallWithCallback(expectedResponse);
            const promise = new Promise((resolve, reject) => {
                 client.finalizeWriteStream(
                    request,
                    (err?: Error|null, result?: protos.google.cloud.bigquery.storage.v1.IFinalizeWriteStreamResponse|null) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
            });
            const response = await promise;
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.finalizeWriteStream as SinonStub)
                .getCall(0).calledWith(request, expectedOptions /*, callback defined above */));
        });

        it('invokes finalizeWriteStream with error', async () => {
            const client = new bigquerywriteModule.v1.BigQueryWriteClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.FinalizeWriteStreamRequest());
            request.name = '';
            const expectedHeaderRequestParams = "name=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedError = new Error('expected');
            client.innerApiCalls.finalizeWriteStream = stubSimpleCall(undefined, expectedError);
            await assert.rejects(client.finalizeWriteStream(request), expectedError);
            assert((client.innerApiCalls.finalizeWriteStream as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });
    });

    describe('batchCommitWriteStreams', () => {
        it('invokes batchCommitWriteStreams without error', async () => {
            const client = new bigquerywriteModule.v1.BigQueryWriteClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.BatchCommitWriteStreamsRequest());
            request.parent = '';
            const expectedHeaderRequestParams = "parent=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.BatchCommitWriteStreamsResponse());
            client.innerApiCalls.batchCommitWriteStreams = stubSimpleCall(expectedResponse);
            const [response] = await client.batchCommitWriteStreams(request);
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.batchCommitWriteStreams as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes batchCommitWriteStreams without error using callback', async () => {
            const client = new bigquerywriteModule.v1.BigQueryWriteClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.BatchCommitWriteStreamsRequest());
            request.parent = '';
            const expectedHeaderRequestParams = "parent=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.BatchCommitWriteStreamsResponse());
            client.innerApiCalls.batchCommitWriteStreams = stubSimpleCallWithCallback(expectedResponse);
            const promise = new Promise((resolve, reject) => {
                 client.batchCommitWriteStreams(
                    request,
                    (err?: Error|null, result?: protos.google.cloud.bigquery.storage.v1.IBatchCommitWriteStreamsResponse|null) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
            });
            const response = await promise;
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.batchCommitWriteStreams as SinonStub)
                .getCall(0).calledWith(request, expectedOptions /*, callback defined above */));
        });

        it('invokes batchCommitWriteStreams with error', async () => {
            const client = new bigquerywriteModule.v1.BigQueryWriteClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.BatchCommitWriteStreamsRequest());
            request.parent = '';
            const expectedHeaderRequestParams = "parent=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedError = new Error('expected');
            client.innerApiCalls.batchCommitWriteStreams = stubSimpleCall(undefined, expectedError);
            await assert.rejects(client.batchCommitWriteStreams(request), expectedError);
            assert((client.innerApiCalls.batchCommitWriteStreams as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });
    });

    describe('flushRows', () => {
        it('invokes flushRows without error', async () => {
            const client = new bigquerywriteModule.v1.BigQueryWriteClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.FlushRowsRequest());
            request.writeStream = '';
            const expectedHeaderRequestParams = "write_stream=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.FlushRowsResponse());
            client.innerApiCalls.flushRows = stubSimpleCall(expectedResponse);
            const [response] = await client.flushRows(request);
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.flushRows as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes flushRows without error using callback', async () => {
            const client = new bigquerywriteModule.v1.BigQueryWriteClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.FlushRowsRequest());
            request.writeStream = '';
            const expectedHeaderRequestParams = "write_stream=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.FlushRowsResponse());
            client.innerApiCalls.flushRows = stubSimpleCallWithCallback(expectedResponse);
            const promise = new Promise((resolve, reject) => {
                 client.flushRows(
                    request,
                    (err?: Error|null, result?: protos.google.cloud.bigquery.storage.v1.IFlushRowsResponse|null) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
            });
            const response = await promise;
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.flushRows as SinonStub)
                .getCall(0).calledWith(request, expectedOptions /*, callback defined above */));
        });

        it('invokes flushRows with error', async () => {
            const client = new bigquerywriteModule.v1.BigQueryWriteClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.FlushRowsRequest());
            request.writeStream = '';
            const expectedHeaderRequestParams = "write_stream=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedError = new Error('expected');
            client.innerApiCalls.flushRows = stubSimpleCall(undefined, expectedError);
            await assert.rejects(client.flushRows(request), expectedError);
            assert((client.innerApiCalls.flushRows as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });
    });

    describe('appendRows', () => {
        it('invokes appendRows without error', async () => {
            const client = new bigquerywriteModule.v1.BigQueryWriteClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.AppendRowsRequest());
            const expectedResponse = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.AppendRowsResponse());
            client.innerApiCalls.appendRows = stubBidiStreamingCall(expectedResponse);
            const stream = client.appendRows();
            const promise = new Promise((resolve, reject) => {
                stream.on('data', (response: protos.google.cloud.bigquery.storage.v1.AppendRowsResponse) => {
                    resolve(response);
                });
                stream.on('error', (err: Error) => {
                    reject(err);
                });
                stream.write(request);
                stream.end();
            });
            const response = await promise;
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.appendRows as SinonStub)
                .getCall(0).calledWithExactly(undefined));
            assert.deepStrictEqual(((stream as unknown as PassThrough)
                ._transform as SinonStub).getCall(0).args[0], request);
        });

        it('invokes appendRows with error', async () => {
            const client = new bigquerywriteModule.v1.BigQueryWriteClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.bigquery.storage.v1.AppendRowsRequest());
            request.writeStream = '';
            const expectedHeaderRequestParams = "write_stream=";const expectedError = new Error('expected');
            client.innerApiCalls.appendRows = stubBidiStreamingCall(undefined, expectedError);
            const stream = client.appendRows();
            const promise = new Promise((resolve, reject) => {
                stream.on('data', (response: protos.google.cloud.bigquery.storage.v1.AppendRowsResponse) => {
                    resolve(response);
                });
                stream.on('error', (err: Error) => {
                    reject(err);
                });
                stream.write(request);
                stream.end();
            });
            await assert.rejects(promise, expectedError);
            assert((client.innerApiCalls.appendRows as SinonStub)
                .getCall(0).calledWithExactly(undefined));
            assert.deepStrictEqual(((stream as unknown as PassThrough)
                ._transform as SinonStub).getCall(0).args[0], request);
        });
    });

    describe('Path templates', () => {

        describe('project', () => {
            const fakePath = "/rendered/path/project";
            const expectedParameters = {
                project: "projectValue",
            };
            const client = new bigquerywriteModule.v1.BigQueryWriteClient({
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
            const client = new bigquerywriteModule.v1.BigQueryWriteClient({
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

        describe('readStream', () => {
            const fakePath = "/rendered/path/readStream";
            const expectedParameters = {
                project: "projectValue",
                location: "locationValue",
                session: "sessionValue",
                stream: "streamValue",
            };
            const client = new bigquerywriteModule.v1.BigQueryWriteClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            client.pathTemplates.readStreamPathTemplate.render =
                sinon.stub().returns(fakePath);
            client.pathTemplates.readStreamPathTemplate.match =
                sinon.stub().returns(expectedParameters);

            it('readStreamPath', () => {
                const result = client.readStreamPath("projectValue", "locationValue", "sessionValue", "streamValue");
                assert.strictEqual(result, fakePath);
                assert((client.pathTemplates.readStreamPathTemplate.render as SinonStub)
                    .getCall(-1).calledWith(expectedParameters));
            });

            it('matchProjectFromReadStreamName', () => {
                const result = client.matchProjectFromReadStreamName(fakePath);
                assert.strictEqual(result, "projectValue");
                assert((client.pathTemplates.readStreamPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchLocationFromReadStreamName', () => {
                const result = client.matchLocationFromReadStreamName(fakePath);
                assert.strictEqual(result, "locationValue");
                assert((client.pathTemplates.readStreamPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchSessionFromReadStreamName', () => {
                const result = client.matchSessionFromReadStreamName(fakePath);
                assert.strictEqual(result, "sessionValue");
                assert((client.pathTemplates.readStreamPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchStreamFromReadStreamName', () => {
                const result = client.matchStreamFromReadStreamName(fakePath);
                assert.strictEqual(result, "streamValue");
                assert((client.pathTemplates.readStreamPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });
        });

        describe('table', () => {
            const fakePath = "/rendered/path/table";
            const expectedParameters = {
                project: "projectValue",
                dataset: "datasetValue",
                table: "tableValue",
            };
            const client = new bigquerywriteModule.v1.BigQueryWriteClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            client.pathTemplates.tablePathTemplate.render =
                sinon.stub().returns(fakePath);
            client.pathTemplates.tablePathTemplate.match =
                sinon.stub().returns(expectedParameters);

            it('tablePath', () => {
                const result = client.tablePath("projectValue", "datasetValue", "tableValue");
                assert.strictEqual(result, fakePath);
                assert((client.pathTemplates.tablePathTemplate.render as SinonStub)
                    .getCall(-1).calledWith(expectedParameters));
            });

            it('matchProjectFromTableName', () => {
                const result = client.matchProjectFromTableName(fakePath);
                assert.strictEqual(result, "projectValue");
                assert((client.pathTemplates.tablePathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchDatasetFromTableName', () => {
                const result = client.matchDatasetFromTableName(fakePath);
                assert.strictEqual(result, "datasetValue");
                assert((client.pathTemplates.tablePathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchTableFromTableName', () => {
                const result = client.matchTableFromTableName(fakePath);
                assert.strictEqual(result, "tableValue");
                assert((client.pathTemplates.tablePathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });
        });

        describe('writeStream', () => {
            const fakePath = "/rendered/path/writeStream";
            const expectedParameters = {
                project: "projectValue",
                dataset: "datasetValue",
                table: "tableValue",
                stream: "streamValue",
            };
            const client = new bigquerywriteModule.v1.BigQueryWriteClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            client.pathTemplates.writeStreamPathTemplate.render =
                sinon.stub().returns(fakePath);
            client.pathTemplates.writeStreamPathTemplate.match =
                sinon.stub().returns(expectedParameters);

            it('writeStreamPath', () => {
                const result = client.writeStreamPath("projectValue", "datasetValue", "tableValue", "streamValue");
                assert.strictEqual(result, fakePath);
                assert((client.pathTemplates.writeStreamPathTemplate.render as SinonStub)
                    .getCall(-1).calledWith(expectedParameters));
            });

            it('matchProjectFromWriteStreamName', () => {
                const result = client.matchProjectFromWriteStreamName(fakePath);
                assert.strictEqual(result, "projectValue");
                assert((client.pathTemplates.writeStreamPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchDatasetFromWriteStreamName', () => {
                const result = client.matchDatasetFromWriteStreamName(fakePath);
                assert.strictEqual(result, "datasetValue");
                assert((client.pathTemplates.writeStreamPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchTableFromWriteStreamName', () => {
                const result = client.matchTableFromWriteStreamName(fakePath);
                assert.strictEqual(result, "tableValue");
                assert((client.pathTemplates.writeStreamPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchStreamFromWriteStreamName', () => {
                const result = client.matchStreamFromWriteStreamName(fakePath);
                assert.strictEqual(result, "streamValue");
                assert((client.pathTemplates.writeStreamPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });
        });
    });
});

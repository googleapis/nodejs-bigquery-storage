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

/* global window */
import type * as gax from 'google-gax';
import type {Callback, CallOptions, Descriptors, ClientOptions} from 'google-gax';
import {PassThrough} from 'stream';
import * as protos from '../../protos/protos';
import jsonProtos = require('../../protos/protos.json');
/**
 * Client JSON configuration object, loaded from
 * `src/v1beta1/big_query_storage_client_config.json`.
 * This file defines retry strategy and timeouts for all API methods in this library.
 */
import * as gapicConfig from './big_query_storage_client_config.json';
const version = require('../../../package.json').version;

/**
 *  BigQuery storage API.
 *
 *  The BigQuery storage API can be used to read data stored in BigQuery.
 * @class
 * @memberof v1beta1
 */
export class BigQueryStorageClient {
  private _terminated = false;
  private _opts: ClientOptions;
  private _providedCustomServicePath: boolean;
  private _gaxModule: typeof gax | typeof gax.fallback;
  private _gaxGrpc: gax.GrpcClient | gax.fallback.GrpcClient;
  private _protos: {};
  private _defaults: {[method: string]: gax.CallSettings};
  auth: gax.GoogleAuth;
  descriptors: Descriptors = {
    page: {},
    stream: {},
    longrunning: {},
    batching: {},
  };
  warn: (code: string, message: string, warnType?: string) => void;
  innerApiCalls: {[name: string]: Function};
  pathTemplates: {[name: string]: gax.PathTemplate};
  bigQueryStorageStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of BigQueryStorageClient.
   *
   * @param {object} [options] - The configuration object.
   * The options accepted by the constructor are described in detail
   * in [this document](https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#creating-the-client-instance).
   * The common options are:
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   * @param {gax.ClientConfig} [options.clientConfig] - Client configuration override.
   *     Follows the structure of {@link gapicConfig}.
   * @param {boolean | "rest"} [options.fallback] - Use HTTP fallback mode.
   *     Pass "rest" to use HTTP/1.1 REST API instead of gRPC.
   *     For more information, please check the
   *     {@link https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#http11-rest-api-mode documentation}.
   * @param {gax} [gaxInstance]: loaded instance of `google-gax`. Useful if you
   *     need to avoid loading the default gRPC version and want to use the fallback
   *     HTTP implementation. Load only fallback version and pass it to the constructor:
   *     ```
   *     const gax = require('google-gax/build/src/fallback'); // avoids loading google-gax with gRPC
   *     const client = new BigQueryStorageClient({fallback: 'rest'}, gax);
   *     ```
   */
  constructor(opts?: ClientOptions, gaxInstance?: typeof gax | typeof gax.fallback) {
    // Ensure that options include all the required fields.
    const staticMembers = this.constructor as typeof BigQueryStorageClient;
    const servicePath = opts?.servicePath || opts?.apiEndpoint || staticMembers.servicePath;
    this._providedCustomServicePath = !!(opts?.servicePath || opts?.apiEndpoint);
    const port = opts?.port || staticMembers.port;
    const clientConfig = opts?.clientConfig ?? {};
    const fallback = opts?.fallback ?? (typeof window !== 'undefined' && typeof window?.fetch === 'function');
    opts = Object.assign({servicePath, port, clientConfig, fallback}, opts);

    // If scopes are unset in options and we're connecting to a non-default endpoint, set scopes just in case.
    if (servicePath !== staticMembers.servicePath && !('scopes' in opts)) {
      opts['scopes'] = staticMembers.scopes;
    }

    // Load google-gax module synchronously if needed
    if (!gaxInstance) {
      gaxInstance = require('google-gax') as typeof gax;
    }

    // Choose either gRPC or proto-over-HTTP implementation of google-gax.
    this._gaxModule = opts.fallback ? gaxInstance.fallback : gaxInstance;

    // Create a `gaxGrpc` object, with any grpc-specific options sent to the client.
    this._gaxGrpc = new this._gaxModule.GrpcClient(opts);

    // Save options to use in initialize() method.
    this._opts = opts;

    // Save the auth object to the client, for use by other methods.
    this.auth = (this._gaxGrpc.auth as gax.GoogleAuth);

    // Set useJWTAccessWithScope on the auth object.
    this.auth.useJWTAccessWithScope = true;

    // Set defaultServicePath on the auth object.
    this.auth.defaultServicePath = staticMembers.servicePath;

    // Set the default scopes in auth client if needed.
    if (servicePath === staticMembers.servicePath) {
      this.auth.defaultScopes = staticMembers.scopes;
    }

    // Determine the client header string.
    const clientHeader = [
      `gax/${this._gaxModule.version}`,
      `gapic/${version}`,
    ];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${this._gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${this._gaxGrpc.grpcVersion}`);
    } else if (opts.fallback === 'rest' ) {
      clientHeader.push(`rest/${this._gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    this._protos = this._gaxGrpc.loadProtoJSON(jsonProtos);

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this.pathTemplates = {
      projectPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}'
      ),
      readSessionPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/sessions/{session}'
      ),
      streamPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/streams/{stream}'
      ),
    };

    // Some of the methods on this service provide streaming responses.
    // Provide descriptors for these.
    this.descriptors.stream = {
      readRows: new this._gaxModule.StreamDescriptor(this._gaxModule.StreamType.SERVER_STREAMING, opts.fallback === 'rest')
    };

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
        'google.cloud.bigquery.storage.v1beta1.BigQueryStorage', gapicConfig as gax.ClientConfig,
        opts.clientConfig || {}, {'x-goog-api-client': clientHeader.join(' ')});

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this.innerApiCalls = {};

    // Add a warn function to the client constructor so it can be easily tested.
    this.warn = this._gaxModule.warn;
  }

  /**
   * Initialize the client.
   * Performs asynchronous operations (such as authentication) and prepares the client.
   * This function will be called automatically when any class method is called for the
   * first time, but if you need to initialize it before calling an actual method,
   * feel free to call initialize() directly.
   *
   * You can await on this method if you want to make sure the client is initialized.
   *
   * @returns {Promise} A promise that resolves to an authenticated service stub.
   */
  initialize() {
    // If the client stub promise is already initialized, return immediately.
    if (this.bigQueryStorageStub) {
      return this.bigQueryStorageStub;
    }

    // Put together the "service stub" for
    // google.cloud.bigquery.storage.v1beta1.BigQueryStorage.
    this.bigQueryStorageStub = this._gaxGrpc.createStub(
        this._opts.fallback ?
          (this._protos as protobuf.Root).lookupService('google.cloud.bigquery.storage.v1beta1.BigQueryStorage') :
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this._protos as any).google.cloud.bigquery.storage.v1beta1.BigQueryStorage,
        this._opts, this._providedCustomServicePath) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const bigQueryStorageStubMethods =
        ['createReadSession', 'readRows', 'batchCreateReadSessionStreams', 'finalizeStream', 'splitReadStream'];
    for (const methodName of bigQueryStorageStubMethods) {
      const callPromise = this.bigQueryStorageStub.then(
        stub => (...args: Array<{}>) => {
          if (this._terminated) {
            if (methodName in this.descriptors.stream) {
              const stream = new PassThrough();
              setImmediate(() => {
                stream.emit('error', new this._gaxModule.GoogleError('The client has already been closed.'));
              });
              return stream;
            }
            return Promise.reject('The client has already been closed.');
          }
          const func = stub[methodName];
          return func.apply(stub, args);
        },
        (err: Error|null|undefined) => () => {
          throw err;
        });

      const descriptor =
        this.descriptors.stream[methodName] ||
        undefined;
      const apiCall = this._gaxModule.createApiCall(
        callPromise,
        this._defaults[methodName],
        descriptor,
        this._opts.fallback
      );

      this.innerApiCalls[methodName] = apiCall;
    }

    return this.bigQueryStorageStub;
  }

  /**
   * The DNS address for this API service.
   * @returns {string} The DNS address for this service.
   */
  static get servicePath() {
    return 'bigquerystorage.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   * @returns {string} The DNS address for this service.
   */
  static get apiEndpoint() {
    return 'bigquerystorage.googleapis.com';
  }

  /**
   * The port for this API service.
   * @returns {number} The default port for this service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   * @returns {string[]} List of default scopes.
   */
  static get scopes() {
    return [
      'https://www.googleapis.com/auth/bigquery',
      'https://www.googleapis.com/auth/cloud-platform'
    ];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @returns {Promise} A promise that resolves to string containing the project ID.
   */
  getProjectId(callback?: Callback<string, undefined, undefined>):
      Promise<string>|void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------
/**
 * Creates a new read session. A read session divides the contents of a
 * BigQuery table into one or more streams, which can then be used to read
 * data from the table. The read session also specifies properties of the
 * data to be read, such as a list of columns or a push-down filter describing
 * the rows to be returned.
 *
 * A particular row can be read by at most one stream. When the caller has
 * reached the end of each stream in the session, then all the data in the
 * table has been read.
 *
 * Read sessions automatically expire 24 hours after they are created and do
 * not require manual clean-up by the caller.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {google.cloud.bigquery.storage.v1beta1.TableReference} request.tableReference
 *   Required. Reference to the table to read.
 * @param {string} request.parent
 *   Required. String of the form `projects/{project_id}` indicating the
 *   project this ReadSession is associated with. This is the project that will
 *   be billed for usage.
 * @param {google.cloud.bigquery.storage.v1beta1.TableModifiers} request.tableModifiers
 *   Any modifiers to the Table (e.g. snapshot timestamp).
 * @param {number} request.requestedStreams
 *   Initial number of streams. If unset or 0, we will
 *   provide a value of streams so as to produce reasonable throughput. Must be
 *   non-negative. The number of streams may be lower than the requested number,
 *   depending on the amount parallelism that is reasonable for the table and
 *   the maximum amount of parallelism allowed by the system.
 *
 *   Streams must be read starting from offset 0.
 * @param {google.cloud.bigquery.storage.v1beta1.TableReadOptions} request.readOptions
 *   Read options for this session (e.g. column selection, filters).
 * @param {google.cloud.bigquery.storage.v1beta1.DataFormat} request.format
 *   Data output format. Currently default to Avro.
 * @param {google.cloud.bigquery.storage.v1beta1.ShardingStrategy} request.shardingStrategy
 *   The strategy to use for distributing data among multiple streams. Currently
 *   defaults to liquid sharding.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [ReadSession]{@link google.cloud.bigquery.storage.v1beta1.ReadSession}.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
 *   for more details and examples.
 * @example <caption>include:samples/generated/v1beta1/big_query_storage.create_read_session.js</caption>
 * region_tag:bigquerystorage_v1beta1_generated_BigQueryStorage_CreateReadSession_async
 */
  createReadSession(
      request?: protos.google.cloud.bigquery.storage.v1beta1.ICreateReadSessionRequest,
      options?: CallOptions):
      Promise<[
        protos.google.cloud.bigquery.storage.v1beta1.IReadSession,
        protos.google.cloud.bigquery.storage.v1beta1.ICreateReadSessionRequest|undefined, {}|undefined
      ]>;
  createReadSession(
      request: protos.google.cloud.bigquery.storage.v1beta1.ICreateReadSessionRequest,
      options: CallOptions,
      callback: Callback<
          protos.google.cloud.bigquery.storage.v1beta1.IReadSession,
          protos.google.cloud.bigquery.storage.v1beta1.ICreateReadSessionRequest|null|undefined,
          {}|null|undefined>): void;
  createReadSession(
      request: protos.google.cloud.bigquery.storage.v1beta1.ICreateReadSessionRequest,
      callback: Callback<
          protos.google.cloud.bigquery.storage.v1beta1.IReadSession,
          protos.google.cloud.bigquery.storage.v1beta1.ICreateReadSessionRequest|null|undefined,
          {}|null|undefined>): void;
  createReadSession(
      request?: protos.google.cloud.bigquery.storage.v1beta1.ICreateReadSessionRequest,
      optionsOrCallback?: CallOptions|Callback<
          protos.google.cloud.bigquery.storage.v1beta1.IReadSession,
          protos.google.cloud.bigquery.storage.v1beta1.ICreateReadSessionRequest|null|undefined,
          {}|null|undefined>,
      callback?: Callback<
          protos.google.cloud.bigquery.storage.v1beta1.IReadSession,
          protos.google.cloud.bigquery.storage.v1beta1.ICreateReadSessionRequest|null|undefined,
          {}|null|undefined>):
      Promise<[
        protos.google.cloud.bigquery.storage.v1beta1.IReadSession,
        protos.google.cloud.bigquery.storage.v1beta1.ICreateReadSessionRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = this._gaxModule.routingHeader.fromParams({
      'table_reference.project_id': request.tableReference!.projectId || '',
      'table_reference.dataset_id': request.tableReference!.datasetId || '',
    });
    this.initialize();
    return this.innerApiCalls.createReadSession(request, options, callback);
  }
/**
 * Creates additional streams for a ReadSession. This API can be used to
 * dynamically adjust the parallelism of a batch processing task upwards by
 * adding additional workers.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {google.cloud.bigquery.storage.v1beta1.ReadSession} request.session
 *   Required. Must be a non-expired session obtained from a call to
 *   CreateReadSession. Only the name field needs to be set.
 * @param {number} request.requestedStreams
 *   Required. Number of new streams requested. Must be positive.
 *   Number of added streams may be less than this, see CreateReadSessionRequest
 *   for more information.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [BatchCreateReadSessionStreamsResponse]{@link google.cloud.bigquery.storage.v1beta1.BatchCreateReadSessionStreamsResponse}.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
 *   for more details and examples.
 * @example <caption>include:samples/generated/v1beta1/big_query_storage.batch_create_read_session_streams.js</caption>
 * region_tag:bigquerystorage_v1beta1_generated_BigQueryStorage_BatchCreateReadSessionStreams_async
 */
  batchCreateReadSessionStreams(
      request?: protos.google.cloud.bigquery.storage.v1beta1.IBatchCreateReadSessionStreamsRequest,
      options?: CallOptions):
      Promise<[
        protos.google.cloud.bigquery.storage.v1beta1.IBatchCreateReadSessionStreamsResponse,
        protos.google.cloud.bigquery.storage.v1beta1.IBatchCreateReadSessionStreamsRequest|undefined, {}|undefined
      ]>;
  batchCreateReadSessionStreams(
      request: protos.google.cloud.bigquery.storage.v1beta1.IBatchCreateReadSessionStreamsRequest,
      options: CallOptions,
      callback: Callback<
          protos.google.cloud.bigquery.storage.v1beta1.IBatchCreateReadSessionStreamsResponse,
          protos.google.cloud.bigquery.storage.v1beta1.IBatchCreateReadSessionStreamsRequest|null|undefined,
          {}|null|undefined>): void;
  batchCreateReadSessionStreams(
      request: protos.google.cloud.bigquery.storage.v1beta1.IBatchCreateReadSessionStreamsRequest,
      callback: Callback<
          protos.google.cloud.bigquery.storage.v1beta1.IBatchCreateReadSessionStreamsResponse,
          protos.google.cloud.bigquery.storage.v1beta1.IBatchCreateReadSessionStreamsRequest|null|undefined,
          {}|null|undefined>): void;
  batchCreateReadSessionStreams(
      request?: protos.google.cloud.bigquery.storage.v1beta1.IBatchCreateReadSessionStreamsRequest,
      optionsOrCallback?: CallOptions|Callback<
          protos.google.cloud.bigquery.storage.v1beta1.IBatchCreateReadSessionStreamsResponse,
          protos.google.cloud.bigquery.storage.v1beta1.IBatchCreateReadSessionStreamsRequest|null|undefined,
          {}|null|undefined>,
      callback?: Callback<
          protos.google.cloud.bigquery.storage.v1beta1.IBatchCreateReadSessionStreamsResponse,
          protos.google.cloud.bigquery.storage.v1beta1.IBatchCreateReadSessionStreamsRequest|null|undefined,
          {}|null|undefined>):
      Promise<[
        protos.google.cloud.bigquery.storage.v1beta1.IBatchCreateReadSessionStreamsResponse,
        protos.google.cloud.bigquery.storage.v1beta1.IBatchCreateReadSessionStreamsRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = this._gaxModule.routingHeader.fromParams({
      'session.name': request.session!.name || '',
    });
    this.initialize();
    return this.innerApiCalls.batchCreateReadSessionStreams(request, options, callback);
  }
/**
 * Triggers the graceful termination of a single stream in a ReadSession. This
 * API can be used to dynamically adjust the parallelism of a batch processing
 * task downwards without losing data.
 *
 * This API does not delete the stream -- it remains visible in the
 * ReadSession, and any data processed by the stream is not released to other
 * streams. However, no additional data will be assigned to the stream once
 * this call completes. Callers must continue reading data on the stream until
 * the end of the stream is reached so that data which has already been
 * assigned to the stream will be processed.
 *
 * This method will return an error if there are no other live streams
 * in the Session, or if SplitReadStream() has been called on the given
 * Stream.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {google.cloud.bigquery.storage.v1beta1.Stream} request.stream
 *   Required. Stream to finalize.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [Empty]{@link google.protobuf.Empty}.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
 *   for more details and examples.
 * @example <caption>include:samples/generated/v1beta1/big_query_storage.finalize_stream.js</caption>
 * region_tag:bigquerystorage_v1beta1_generated_BigQueryStorage_FinalizeStream_async
 */
  finalizeStream(
      request?: protos.google.cloud.bigquery.storage.v1beta1.IFinalizeStreamRequest,
      options?: CallOptions):
      Promise<[
        protos.google.protobuf.IEmpty,
        protos.google.cloud.bigquery.storage.v1beta1.IFinalizeStreamRequest|undefined, {}|undefined
      ]>;
  finalizeStream(
      request: protos.google.cloud.bigquery.storage.v1beta1.IFinalizeStreamRequest,
      options: CallOptions,
      callback: Callback<
          protos.google.protobuf.IEmpty,
          protos.google.cloud.bigquery.storage.v1beta1.IFinalizeStreamRequest|null|undefined,
          {}|null|undefined>): void;
  finalizeStream(
      request: protos.google.cloud.bigquery.storage.v1beta1.IFinalizeStreamRequest,
      callback: Callback<
          protos.google.protobuf.IEmpty,
          protos.google.cloud.bigquery.storage.v1beta1.IFinalizeStreamRequest|null|undefined,
          {}|null|undefined>): void;
  finalizeStream(
      request?: protos.google.cloud.bigquery.storage.v1beta1.IFinalizeStreamRequest,
      optionsOrCallback?: CallOptions|Callback<
          protos.google.protobuf.IEmpty,
          protos.google.cloud.bigquery.storage.v1beta1.IFinalizeStreamRequest|null|undefined,
          {}|null|undefined>,
      callback?: Callback<
          protos.google.protobuf.IEmpty,
          protos.google.cloud.bigquery.storage.v1beta1.IFinalizeStreamRequest|null|undefined,
          {}|null|undefined>):
      Promise<[
        protos.google.protobuf.IEmpty,
        protos.google.cloud.bigquery.storage.v1beta1.IFinalizeStreamRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = this._gaxModule.routingHeader.fromParams({
      'stream.name': request.stream!.name || '',
    });
    this.initialize();
    return this.innerApiCalls.finalizeStream(request, options, callback);
  }
/**
 * Splits a given read stream into two Streams. These streams are referred to
 * as the primary and the residual of the split. The original stream can still
 * be read from in the same manner as before. Both of the returned streams can
 * also be read from, and the total rows return by both child streams will be
 * the same as the rows read from the original stream.
 *
 * Moreover, the two child streams will be allocated back to back in the
 * original Stream. Concretely, it is guaranteed that for streams Original,
 * Primary, and Residual, that Original[0-j] = Primary[0-j] and
 * Original[j-n] = Residual[0-m] once the streams have been read to
 * completion.
 *
 * This method is guaranteed to be idempotent.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {google.cloud.bigquery.storage.v1beta1.Stream} request.originalStream
 *   Required. Stream to split.
 * @param {number} request.fraction
 *   A value in the range (0.0, 1.0) that specifies the fractional point at
 *   which the original stream should be split. The actual split point is
 *   evaluated on pre-filtered rows, so if a filter is provided, then there is
 *   no guarantee that the division of the rows between the new child streams
 *   will be proportional to this fractional value. Additionally, because the
 *   server-side unit for assigning data is collections of rows, this fraction
 *   will always map to to a data storage boundary on the server side.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [SplitReadStreamResponse]{@link google.cloud.bigquery.storage.v1beta1.SplitReadStreamResponse}.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
 *   for more details and examples.
 * @example <caption>include:samples/generated/v1beta1/big_query_storage.split_read_stream.js</caption>
 * region_tag:bigquerystorage_v1beta1_generated_BigQueryStorage_SplitReadStream_async
 */
  splitReadStream(
      request?: protos.google.cloud.bigquery.storage.v1beta1.ISplitReadStreamRequest,
      options?: CallOptions):
      Promise<[
        protos.google.cloud.bigquery.storage.v1beta1.ISplitReadStreamResponse,
        protos.google.cloud.bigquery.storage.v1beta1.ISplitReadStreamRequest|undefined, {}|undefined
      ]>;
  splitReadStream(
      request: protos.google.cloud.bigquery.storage.v1beta1.ISplitReadStreamRequest,
      options: CallOptions,
      callback: Callback<
          protos.google.cloud.bigquery.storage.v1beta1.ISplitReadStreamResponse,
          protos.google.cloud.bigquery.storage.v1beta1.ISplitReadStreamRequest|null|undefined,
          {}|null|undefined>): void;
  splitReadStream(
      request: protos.google.cloud.bigquery.storage.v1beta1.ISplitReadStreamRequest,
      callback: Callback<
          protos.google.cloud.bigquery.storage.v1beta1.ISplitReadStreamResponse,
          protos.google.cloud.bigquery.storage.v1beta1.ISplitReadStreamRequest|null|undefined,
          {}|null|undefined>): void;
  splitReadStream(
      request?: protos.google.cloud.bigquery.storage.v1beta1.ISplitReadStreamRequest,
      optionsOrCallback?: CallOptions|Callback<
          protos.google.cloud.bigquery.storage.v1beta1.ISplitReadStreamResponse,
          protos.google.cloud.bigquery.storage.v1beta1.ISplitReadStreamRequest|null|undefined,
          {}|null|undefined>,
      callback?: Callback<
          protos.google.cloud.bigquery.storage.v1beta1.ISplitReadStreamResponse,
          protos.google.cloud.bigquery.storage.v1beta1.ISplitReadStreamRequest|null|undefined,
          {}|null|undefined>):
      Promise<[
        protos.google.cloud.bigquery.storage.v1beta1.ISplitReadStreamResponse,
        protos.google.cloud.bigquery.storage.v1beta1.ISplitReadStreamRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = this._gaxModule.routingHeader.fromParams({
      'original_stream.name': request.originalStream!.name || '',
    });
    this.initialize();
    return this.innerApiCalls.splitReadStream(request, options, callback);
  }

/**
 * Reads rows from the table in the format prescribed by the read session.
 * Each response contains one or more table rows, up to a maximum of 10 MiB
 * per response; read requests which attempt to read individual rows larger
 * than this will fail.
 *
 * Each request also returns a set of stream statistics reflecting the
 * estimated total number of rows in the read stream. This number is computed
 * based on the total table size and the number of active streams in the read
 * session, and may change as other streams continue to read data.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {google.cloud.bigquery.storage.v1beta1.StreamPosition} request.readPosition
 *   Required. Identifier of the position in the stream to start reading from.
 *   The offset requested must be less than the last row read from ReadRows.
 *   Requesting a larger offset is undefined.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Stream}
 *   An object stream which emits [ReadRowsResponse]{@link google.cloud.bigquery.storage.v1beta1.ReadRowsResponse} on 'data' event.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#server-streaming)
 *   for more details and examples.
 * @example <caption>include:samples/generated/v1beta1/big_query_storage.read_rows.js</caption>
 * region_tag:bigquerystorage_v1beta1_generated_BigQueryStorage_ReadRows_async
 */
  readRows(
      request?: protos.google.cloud.bigquery.storage.v1beta1.IReadRowsRequest,
      options?: CallOptions):
    gax.CancellableStream{
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = this._gaxModule.routingHeader.fromParams({
      'read_position.stream.name': request.readPosition!.stream!.name || '',
    });
    this.initialize();
    return this.innerApiCalls.readRows(request, options);
  }

  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified project resource name string.
   *
   * @param {string} project
   * @returns {string} Resource name string.
   */
  projectPath(project:string) {
    return this.pathTemplates.projectPathTemplate.render({
      project: project,
    });
  }

  /**
   * Parse the project from Project resource.
   *
   * @param {string} projectName
   *   A fully-qualified path representing Project resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProjectName(projectName: string) {
    return this.pathTemplates.projectPathTemplate.match(projectName).project;
  }

  /**
   * Return a fully-qualified readSession resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} session
   * @returns {string} Resource name string.
   */
  readSessionPath(project:string,location:string,session:string) {
    return this.pathTemplates.readSessionPathTemplate.render({
      project: project,
      location: location,
      session: session,
    });
  }

  /**
   * Parse the project from ReadSession resource.
   *
   * @param {string} readSessionName
   *   A fully-qualified path representing ReadSession resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromReadSessionName(readSessionName: string) {
    return this.pathTemplates.readSessionPathTemplate.match(readSessionName).project;
  }

  /**
   * Parse the location from ReadSession resource.
   *
   * @param {string} readSessionName
   *   A fully-qualified path representing ReadSession resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromReadSessionName(readSessionName: string) {
    return this.pathTemplates.readSessionPathTemplate.match(readSessionName).location;
  }

  /**
   * Parse the session from ReadSession resource.
   *
   * @param {string} readSessionName
   *   A fully-qualified path representing ReadSession resource.
   * @returns {string} A string representing the session.
   */
  matchSessionFromReadSessionName(readSessionName: string) {
    return this.pathTemplates.readSessionPathTemplate.match(readSessionName).session;
  }

  /**
   * Return a fully-qualified stream resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} stream
   * @returns {string} Resource name string.
   */
  streamPath(project:string,location:string,stream:string) {
    return this.pathTemplates.streamPathTemplate.render({
      project: project,
      location: location,
      stream: stream,
    });
  }

  /**
   * Parse the project from Stream resource.
   *
   * @param {string} streamName
   *   A fully-qualified path representing Stream resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromStreamName(streamName: string) {
    return this.pathTemplates.streamPathTemplate.match(streamName).project;
  }

  /**
   * Parse the location from Stream resource.
   *
   * @param {string} streamName
   *   A fully-qualified path representing Stream resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromStreamName(streamName: string) {
    return this.pathTemplates.streamPathTemplate.match(streamName).location;
  }

  /**
   * Parse the stream from Stream resource.
   *
   * @param {string} streamName
   *   A fully-qualified path representing Stream resource.
   * @returns {string} A string representing the stream.
   */
  matchStreamFromStreamName(streamName: string) {
    return this.pathTemplates.streamPathTemplate.match(streamName).stream;
  }

  /**
   * Terminate the gRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   * @returns {Promise} A promise that resolves when the client is closed.
   */
  close(): Promise<void> {
    if (this.bigQueryStorageStub && !this._terminated) {
      return this.bigQueryStorageStub.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}

// Copyright 2024 Google LLC
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
import type {
  Callback,
  CallOptions,
  Descriptors,
  ClientOptions,
} from 'google-gax';
import {PassThrough} from 'stream';
import * as protos from '../../protos/protos';
import jsonProtos = require('../../protos/protos.json');

/**
 * Client JSON configuration object, loaded from
 * `src/v1/big_query_read_client_config.json`.
 * This file defines retry strategy and timeouts for all API methods in this library.
 */
import * as gapicConfig from './big_query_read_client_config.json';
const version = require('../../../package.json').version;

/**
 *  BigQuery Read API.
 *
 *  The Read API can be used to read data from BigQuery.
 * @class
 * @memberof v1
 */
export class BigQueryReadClient {
  private _terminated = false;
  private _opts: ClientOptions;
  private _providedCustomServicePath: boolean;
  private _gaxModule: typeof gax | typeof gax.fallback;
  private _gaxGrpc: gax.GrpcClient | gax.fallback.GrpcClient;
  private _protos: {};
  private _defaults: {[method: string]: gax.CallSettings};
  private _universeDomain: string;
  private _servicePath: string;
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
  bigQueryReadStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of BigQueryReadClient.
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
   * @param {boolean} [options.fallback] - Use HTTP/1.1 REST mode.
   *     For more information, please check the
   *     {@link https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#http11-rest-api-mode documentation}.
   * @param {gax} [gaxInstance]: loaded instance of `google-gax`. Useful if you
   *     need to avoid loading the default gRPC version and want to use the fallback
   *     HTTP implementation. Load only fallback version and pass it to the constructor:
   *     ```
   *     const gax = require('google-gax/build/src/fallback'); // avoids loading google-gax with gRPC
   *     const client = new BigQueryReadClient({fallback: true}, gax);
   *     ```
   */
  constructor(
    opts?: ClientOptions,
    gaxInstance?: typeof gax | typeof gax.fallback,
  ) {
    // Ensure that options include all the required fields.
    const staticMembers = this.constructor as typeof BigQueryReadClient;
    if (
      opts?.universe_domain &&
      opts?.universeDomain &&
      opts?.universe_domain !== opts?.universeDomain
    ) {
      throw new Error(
        'Please set either universe_domain or universeDomain, but not both.',
      );
    }
    const universeDomainEnvVar =
      typeof process === 'object' && typeof process.env === 'object'
        ? process.env['GOOGLE_CLOUD_UNIVERSE_DOMAIN']
        : undefined;
    this._universeDomain =
      opts?.universeDomain ??
      opts?.universe_domain ??
      universeDomainEnvVar ??
      'googleapis.com';
    this._servicePath = 'bigquerystorage.' + this._universeDomain;
    const servicePath =
      opts?.servicePath || opts?.apiEndpoint || this._servicePath;
    this._providedCustomServicePath = !!(
      opts?.servicePath || opts?.apiEndpoint
    );
    const port = opts?.port || staticMembers.port;
    const clientConfig = opts?.clientConfig ?? {};
    const fallback =
      opts?.fallback ??
      (typeof window !== 'undefined' && typeof window?.fetch === 'function');
    opts = Object.assign({servicePath, port, clientConfig, fallback}, opts);

    // If scopes are unset in options and we're connecting to a non-default endpoint, set scopes just in case.
    if (servicePath !== this._servicePath && !('scopes' in opts)) {
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
    this.auth = this._gaxGrpc.auth as gax.GoogleAuth;

    // Set useJWTAccessWithScope on the auth object.
    this.auth.useJWTAccessWithScope = true;

    // Set defaultServicePath on the auth object.
    this.auth.defaultServicePath = this._servicePath;

    // Set the default scopes in auth client if needed.
    if (servicePath === this._servicePath) {
      this.auth.defaultScopes = staticMembers.scopes;
    }

    // Determine the client header string.
    const clientHeader = [`gax/${this._gaxModule.version}`, `gapic/${version}`];
    if (typeof process === 'object' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${this._gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${this._gaxGrpc.grpcVersion}`);
    } else {
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
        'projects/{project}',
      ),
      readSessionPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/sessions/{session}',
      ),
      readStreamPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/sessions/{session}/streams/{stream}',
      ),
      tablePathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/datasets/{dataset}/tables/{table}',
      ),
      writeStreamPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/datasets/{dataset}/tables/{table}/streams/{stream}',
      ),
    };

    // Some of the methods on this service provide streaming responses.
    // Provide descriptors for these.
    this.descriptors.stream = {
      readRows: new this._gaxModule.StreamDescriptor(
        this._gaxModule.StreamType.SERVER_STREAMING,
        !!opts.fallback,
        !!opts.gaxServerStreamingRetries,
      ),
    };

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
      'google.cloud.bigquery.storage.v1.BigQueryRead',
      gapicConfig as gax.ClientConfig,
      opts.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')},
    );

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
    if (this.bigQueryReadStub) {
      return this.bigQueryReadStub;
    }

    // Put together the "service stub" for
    // google.cloud.bigquery.storage.v1.BigQueryRead.
    this.bigQueryReadStub = this._gaxGrpc.createStub(
      this._opts.fallback
        ? (this._protos as protobuf.Root).lookupService(
            'google.cloud.bigquery.storage.v1.BigQueryRead',
          )
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this._protos as any).google.cloud.bigquery.storage.v1.BigQueryRead,
      this._opts,
      this._providedCustomServicePath,
    ) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const bigQueryReadStubMethods = [
      'createReadSession',
      'readRows',
      'splitReadStream',
    ];
    for (const methodName of bigQueryReadStubMethods) {
      const callPromise = this.bigQueryReadStub.then(
        stub =>
          (...args: Array<{}>) => {
            if (this._terminated) {
              if (methodName in this.descriptors.stream) {
                const stream = new PassThrough();
                setImmediate(() => {
                  stream.emit(
                    'error',
                    new this._gaxModule.GoogleError(
                      'The client has already been closed.',
                    ),
                  );
                });
                return stream;
              }
              return Promise.reject('The client has already been closed.');
            }
            const func = stub[methodName];
            return func.apply(stub, args);
          },
        (err: Error | null | undefined) => () => {
          throw err;
        },
      );

      const descriptor = this.descriptors.stream[methodName] || undefined;
      const apiCall = this._gaxModule.createApiCall(
        callPromise,
        this._defaults[methodName],
        descriptor,
        this._opts.fallback,
      );

      this.innerApiCalls[methodName] = apiCall;
    }

    return this.bigQueryReadStub;
  }

  /**
   * The DNS address for this API service.
   * @deprecated Use the apiEndpoint method of the client instance.
   * @returns {string} The DNS address for this service.
   */
  static get servicePath() {
    if (
      typeof process === 'object' &&
      typeof process.emitWarning === 'function'
    ) {
      process.emitWarning(
        'Static servicePath is deprecated, please use the instance method instead.',
        'DeprecationWarning',
      );
    }
    return 'bigquerystorage.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath.
   * @deprecated Use the apiEndpoint method of the client instance.
   * @returns {string} The DNS address for this service.
   */
  static get apiEndpoint() {
    if (
      typeof process === 'object' &&
      typeof process.emitWarning === 'function'
    ) {
      process.emitWarning(
        'Static apiEndpoint is deprecated, please use the instance method instead.',
        'DeprecationWarning',
      );
    }
    return 'bigquerystorage.googleapis.com';
  }

  /**
   * The DNS address for this API service.
   * @returns {string} The DNS address for this service.
   */
  get apiEndpoint() {
    return this._servicePath;
  }

  get universeDomain() {
    return this._universeDomain;
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
      'https://www.googleapis.com/auth/cloud-platform',
    ];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @returns {Promise} A promise that resolves to string containing the project ID.
   */
  getProjectId(
    callback?: Callback<string, undefined, undefined>,
  ): Promise<string> | void {
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
   * Data is assigned to each stream such that roughly the same number of
   * rows can be read from each stream. Because the server-side unit for
   * assigning data is collections of rows, the API does not guarantee that
   * each stream will return the same number or rows. Additionally, the
   * limits are enforced based on the number of pre-filtered rows, so some
   * filters can lead to lopsided assignments.
   *
   * Read sessions automatically expire 6 hours after they are created and do
   * not require manual clean-up by the caller.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The request project that owns the session, in the form of
   *   `projects/{project_id}`.
   * @param {google.cloud.bigquery.storage.v1.ReadSession} request.readSession
   *   Required. Session to be created.
   * @param {number} request.maxStreamCount
   *   Max initial number of streams. If unset or zero, the server will
   *   provide a value of streams so as to produce reasonable throughput. Must be
   *   non-negative. The number of streams may be lower than the requested number,
   *   depending on the amount parallelism that is reasonable for the table.
   *   There is a default system max limit of 1,000.
   *
   *   This must be greater than or equal to preferred_min_stream_count.
   *   Typically, clients should either leave this unset to let the system to
   *   determine an upper bound OR set this a size for the maximum "units of work"
   *   it can gracefully handle.
   * @param {number} request.preferredMinStreamCount
   *   The minimum preferred stream count. This parameter can be used to inform
   *   the service that there is a desired lower bound on the number of streams.
   *   This is typically a target parallelism of the client (e.g. a Spark
   *   cluster with N-workers would set this to a low multiple of N to ensure
   *   good cluster utilization).
   *
   *   The system will make a best effort to provide at least this number of
   *   streams, but in some cases might provide less.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing {@link protos.google.cloud.bigquery.storage.v1.ReadSession|ReadSession}.
   *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods | documentation }
   *   for more details and examples.
   * @example <caption>include:samples/generated/v1/big_query_read.create_read_session.js</caption>
   * region_tag:bigquerystorage_v1_generated_BigQueryRead_CreateReadSession_async
   */
  createReadSession(
    request?: protos.google.cloud.bigquery.storage.v1.ICreateReadSessionRequest,
    options?: CallOptions,
  ): Promise<
    [
      protos.google.cloud.bigquery.storage.v1.IReadSession,
      (
        | protos.google.cloud.bigquery.storage.v1.ICreateReadSessionRequest
        | undefined
      ),
      {} | undefined,
    ]
  >;
  createReadSession(
    request: protos.google.cloud.bigquery.storage.v1.ICreateReadSessionRequest,
    options: CallOptions,
    callback: Callback<
      protos.google.cloud.bigquery.storage.v1.IReadSession,
      | protos.google.cloud.bigquery.storage.v1.ICreateReadSessionRequest
      | null
      | undefined,
      {} | null | undefined
    >,
  ): void;
  createReadSession(
    request: protos.google.cloud.bigquery.storage.v1.ICreateReadSessionRequest,
    callback: Callback<
      protos.google.cloud.bigquery.storage.v1.IReadSession,
      | protos.google.cloud.bigquery.storage.v1.ICreateReadSessionRequest
      | null
      | undefined,
      {} | null | undefined
    >,
  ): void;
  createReadSession(
    request?: protos.google.cloud.bigquery.storage.v1.ICreateReadSessionRequest,
    optionsOrCallback?:
      | CallOptions
      | Callback<
          protos.google.cloud.bigquery.storage.v1.IReadSession,
          | protos.google.cloud.bigquery.storage.v1.ICreateReadSessionRequest
          | null
          | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      protos.google.cloud.bigquery.storage.v1.IReadSession,
      | protos.google.cloud.bigquery.storage.v1.ICreateReadSessionRequest
      | null
      | undefined,
      {} | null | undefined
    >,
  ): Promise<
    [
      protos.google.cloud.bigquery.storage.v1.IReadSession,
      (
        | protos.google.cloud.bigquery.storage.v1.ICreateReadSessionRequest
        | undefined
      ),
      {} | undefined,
    ]
  > | void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers['x-goog-request-params'] =
      this._gaxModule.routingHeader.fromParams({
        'read_session.table': request.readSession!.table ?? '',
      });
    this.initialize();
    return this.innerApiCalls.createReadSession(request, options, callback);
  }
  /**
   * Splits a given `ReadStream` into two `ReadStream` objects. These
   * `ReadStream` objects are referred to as the primary and the residual
   * streams of the split. The original `ReadStream` can still be read from in
   * the same manner as before. Both of the returned `ReadStream` objects can
   * also be read from, and the rows returned by both child streams will be
   * the same as the rows read from the original stream.
   *
   * Moreover, the two child streams will be allocated back-to-back in the
   * original `ReadStream`. Concretely, it is guaranteed that for streams
   * original, primary, and residual, that original[0-j] = primary[0-j] and
   * original[j-n] = residual[0-m] once the streams have been read to
   * completion.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   Required. Name of the stream to split.
   * @param {number} request.fraction
   *   A value in the range (0.0, 1.0) that specifies the fractional point at
   *   which the original stream should be split. The actual split point is
   *   evaluated on pre-filtered rows, so if a filter is provided, then there is
   *   no guarantee that the division of the rows between the new child streams
   *   will be proportional to this fractional value. Additionally, because the
   *   server-side unit for assigning data is collections of rows, this fraction
   *   will always map to a data storage boundary on the server side.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing {@link protos.google.cloud.bigquery.storage.v1.SplitReadStreamResponse|SplitReadStreamResponse}.
   *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods | documentation }
   *   for more details and examples.
   * @example <caption>include:samples/generated/v1/big_query_read.split_read_stream.js</caption>
   * region_tag:bigquerystorage_v1_generated_BigQueryRead_SplitReadStream_async
   */
  splitReadStream(
    request?: protos.google.cloud.bigquery.storage.v1.ISplitReadStreamRequest,
    options?: CallOptions,
  ): Promise<
    [
      protos.google.cloud.bigquery.storage.v1.ISplitReadStreamResponse,
      (
        | protos.google.cloud.bigquery.storage.v1.ISplitReadStreamRequest
        | undefined
      ),
      {} | undefined,
    ]
  >;
  splitReadStream(
    request: protos.google.cloud.bigquery.storage.v1.ISplitReadStreamRequest,
    options: CallOptions,
    callback: Callback<
      protos.google.cloud.bigquery.storage.v1.ISplitReadStreamResponse,
      | protos.google.cloud.bigquery.storage.v1.ISplitReadStreamRequest
      | null
      | undefined,
      {} | null | undefined
    >,
  ): void;
  splitReadStream(
    request: protos.google.cloud.bigquery.storage.v1.ISplitReadStreamRequest,
    callback: Callback<
      protos.google.cloud.bigquery.storage.v1.ISplitReadStreamResponse,
      | protos.google.cloud.bigquery.storage.v1.ISplitReadStreamRequest
      | null
      | undefined,
      {} | null | undefined
    >,
  ): void;
  splitReadStream(
    request?: protos.google.cloud.bigquery.storage.v1.ISplitReadStreamRequest,
    optionsOrCallback?:
      | CallOptions
      | Callback<
          protos.google.cloud.bigquery.storage.v1.ISplitReadStreamResponse,
          | protos.google.cloud.bigquery.storage.v1.ISplitReadStreamRequest
          | null
          | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      protos.google.cloud.bigquery.storage.v1.ISplitReadStreamResponse,
      | protos.google.cloud.bigquery.storage.v1.ISplitReadStreamRequest
      | null
      | undefined,
      {} | null | undefined
    >,
  ): Promise<
    [
      protos.google.cloud.bigquery.storage.v1.ISplitReadStreamResponse,
      (
        | protos.google.cloud.bigquery.storage.v1.ISplitReadStreamRequest
        | undefined
      ),
      {} | undefined,
    ]
  > | void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers['x-goog-request-params'] =
      this._gaxModule.routingHeader.fromParams({
        name: request.name ?? '',
      });
    this.initialize();
    return this.innerApiCalls.splitReadStream(request, options, callback);
  }

  /**
   * Reads rows from the stream in the format prescribed by the ReadSession.
   * Each response contains one or more table rows, up to a maximum of 100 MiB
   * per response; read requests which attempt to read individual rows larger
   * than 100 MiB will fail.
   *
   * Each request also returns a set of stream statistics reflecting the current
   * state of the stream.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.readStream
   *   Required. Stream to read rows from.
   * @param {number} request.offset
   *   The offset requested must be less than the last row read from Read.
   *   Requesting a larger offset is undefined. If not specified, start reading
   *   from offset zero.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Stream}
   *   An object stream which emits {@link protos.google.cloud.bigquery.storage.v1.ReadRowsResponse|ReadRowsResponse} on 'data' event.
   *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#server-streaming | documentation }
   *   for more details and examples.
   * @example <caption>include:samples/generated/v1/big_query_read.read_rows.js</caption>
   * region_tag:bigquerystorage_v1_generated_BigQueryRead_ReadRows_async
   */
  readRows(
    request?: protos.google.cloud.bigquery.storage.v1.IReadRowsRequest,
    options?: CallOptions,
  ): gax.CancellableStream {
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers['x-goog-request-params'] =
      this._gaxModule.routingHeader.fromParams({
        read_stream: request.readStream ?? '',
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
  projectPath(project: string) {
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
  readSessionPath(project: string, location: string, session: string) {
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
    return this.pathTemplates.readSessionPathTemplate.match(readSessionName)
      .project;
  }

  /**
   * Parse the location from ReadSession resource.
   *
   * @param {string} readSessionName
   *   A fully-qualified path representing ReadSession resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromReadSessionName(readSessionName: string) {
    return this.pathTemplates.readSessionPathTemplate.match(readSessionName)
      .location;
  }

  /**
   * Parse the session from ReadSession resource.
   *
   * @param {string} readSessionName
   *   A fully-qualified path representing ReadSession resource.
   * @returns {string} A string representing the session.
   */
  matchSessionFromReadSessionName(readSessionName: string) {
    return this.pathTemplates.readSessionPathTemplate.match(readSessionName)
      .session;
  }

  /**
   * Return a fully-qualified readStream resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} session
   * @param {string} stream
   * @returns {string} Resource name string.
   */
  readStreamPath(
    project: string,
    location: string,
    session: string,
    stream: string,
  ) {
    return this.pathTemplates.readStreamPathTemplate.render({
      project: project,
      location: location,
      session: session,
      stream: stream,
    });
  }

  /**
   * Parse the project from ReadStream resource.
   *
   * @param {string} readStreamName
   *   A fully-qualified path representing ReadStream resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromReadStreamName(readStreamName: string) {
    return this.pathTemplates.readStreamPathTemplate.match(readStreamName)
      .project;
  }

  /**
   * Parse the location from ReadStream resource.
   *
   * @param {string} readStreamName
   *   A fully-qualified path representing ReadStream resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromReadStreamName(readStreamName: string) {
    return this.pathTemplates.readStreamPathTemplate.match(readStreamName)
      .location;
  }

  /**
   * Parse the session from ReadStream resource.
   *
   * @param {string} readStreamName
   *   A fully-qualified path representing ReadStream resource.
   * @returns {string} A string representing the session.
   */
  matchSessionFromReadStreamName(readStreamName: string) {
    return this.pathTemplates.readStreamPathTemplate.match(readStreamName)
      .session;
  }

  /**
   * Parse the stream from ReadStream resource.
   *
   * @param {string} readStreamName
   *   A fully-qualified path representing ReadStream resource.
   * @returns {string} A string representing the stream.
   */
  matchStreamFromReadStreamName(readStreamName: string) {
    return this.pathTemplates.readStreamPathTemplate.match(readStreamName)
      .stream;
  }

  /**
   * Return a fully-qualified table resource name string.
   *
   * @param {string} project
   * @param {string} dataset
   * @param {string} table
   * @returns {string} Resource name string.
   */
  tablePath(project: string, dataset: string, table: string) {
    return this.pathTemplates.tablePathTemplate.render({
      project: project,
      dataset: dataset,
      table: table,
    });
  }

  /**
   * Parse the project from Table resource.
   *
   * @param {string} tableName
   *   A fully-qualified path representing Table resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromTableName(tableName: string) {
    return this.pathTemplates.tablePathTemplate.match(tableName).project;
  }

  /**
   * Parse the dataset from Table resource.
   *
   * @param {string} tableName
   *   A fully-qualified path representing Table resource.
   * @returns {string} A string representing the dataset.
   */
  matchDatasetFromTableName(tableName: string) {
    return this.pathTemplates.tablePathTemplate.match(tableName).dataset;
  }

  /**
   * Parse the table from Table resource.
   *
   * @param {string} tableName
   *   A fully-qualified path representing Table resource.
   * @returns {string} A string representing the table.
   */
  matchTableFromTableName(tableName: string) {
    return this.pathTemplates.tablePathTemplate.match(tableName).table;
  }

  /**
   * Return a fully-qualified writeStream resource name string.
   *
   * @param {string} project
   * @param {string} dataset
   * @param {string} table
   * @param {string} stream
   * @returns {string} Resource name string.
   */
  writeStreamPath(
    project: string,
    dataset: string,
    table: string,
    stream: string,
  ) {
    return this.pathTemplates.writeStreamPathTemplate.render({
      project: project,
      dataset: dataset,
      table: table,
      stream: stream,
    });
  }

  /**
   * Parse the project from WriteStream resource.
   *
   * @param {string} writeStreamName
   *   A fully-qualified path representing WriteStream resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromWriteStreamName(writeStreamName: string) {
    return this.pathTemplates.writeStreamPathTemplate.match(writeStreamName)
      .project;
  }

  /**
   * Parse the dataset from WriteStream resource.
   *
   * @param {string} writeStreamName
   *   A fully-qualified path representing WriteStream resource.
   * @returns {string} A string representing the dataset.
   */
  matchDatasetFromWriteStreamName(writeStreamName: string) {
    return this.pathTemplates.writeStreamPathTemplate.match(writeStreamName)
      .dataset;
  }

  /**
   * Parse the table from WriteStream resource.
   *
   * @param {string} writeStreamName
   *   A fully-qualified path representing WriteStream resource.
   * @returns {string} A string representing the table.
   */
  matchTableFromWriteStreamName(writeStreamName: string) {
    return this.pathTemplates.writeStreamPathTemplate.match(writeStreamName)
      .table;
  }

  /**
   * Parse the stream from WriteStream resource.
   *
   * @param {string} writeStreamName
   *   A fully-qualified path representing WriteStream resource.
   * @returns {string} A string representing the stream.
   */
  matchStreamFromWriteStreamName(writeStreamName: string) {
    return this.pathTemplates.writeStreamPathTemplate.match(writeStreamName)
      .stream;
  }

  /**
   * Terminate the gRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   * @returns {Promise} A promise that resolves when the client is closed.
   */
  close(): Promise<void> {
    if (this.bigQueryReadStub && !this._terminated) {
      return this.bigQueryReadStub.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}

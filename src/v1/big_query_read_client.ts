// Copyright 2020 Google LLC
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

import * as gax from 'google-gax';
import {Callback, CallOptions, Descriptors, ClientOptions} from 'google-gax';
import * as path from 'path';

import * as protos from '../../protos/protos';
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
  innerApiCalls: {[name: string]: Function};
  pathTemplates: {[name: string]: gax.PathTemplate};
  bigQueryReadStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of BigQueryReadClient.
   *
   * @param {object} [options] - The configuration object. See the subsequent
   *   parameters for more details.
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
   */

  constructor(opts?: ClientOptions) {
    // Ensure that options include the service address and port.
    const staticMembers = this.constructor as typeof BigQueryReadClient;
    const servicePath =
      opts && opts.servicePath
        ? opts.servicePath
        : opts && opts.apiEndpoint
        ? opts.apiEndpoint
        : staticMembers.servicePath;
    const port = opts && opts.port ? opts.port : staticMembers.port;

    if (!opts) {
      opts = {servicePath, port};
    }
    opts.servicePath = opts.servicePath || servicePath;
    opts.port = opts.port || port;

    // users can override the config from client side, like retry codes name.
    // The detailed structure of the clientConfig can be found here: https://github.com/googleapis/gax-nodejs/blob/master/src/gax.ts#L546
    // The way to override client config for Showcase API:
    //
    // const customConfig = {"interfaces": {"google.showcase.v1beta1.Echo": {"methods": {"Echo": {"retry_codes_name": "idempotent", "retry_params_name": "default"}}}}}
    // const showcaseClient = new showcaseClient({ projectId, customConfig });
    opts.clientConfig = opts.clientConfig || {};

    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      opts.fallback = true;
    }
    // If we are in browser, we are already using fallback because of the
    // "browser" field in package.json.
    // But if we were explicitly requested to use fallback, let's do it now.
    this._gaxModule = !isBrowser && opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options
    // sent to the client.
    opts.scopes = (this.constructor as typeof BigQueryReadClient).scopes;
    this._gaxGrpc = new this._gaxModule.GrpcClient(opts);

    // Save options to use in initialize() method.
    this._opts = opts;

    // Save the auth object to the client, for use by other methods.
    this.auth = this._gaxGrpc.auth as gax.GoogleAuth;

    // Determine the client header string.
    const clientHeader = [`gax/${this._gaxModule.version}`, `gapic/${version}`];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${this._gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${this._gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    // For Node.js, pass the path to JSON proto file.
    // For browsers, pass the JSON content.

    const nodejsProtoPath = path.join(
      __dirname,
      '..',
      '..',
      'protos',
      'protos.json'
    );
    this._protos = this._gaxGrpc.loadProto(
      opts.fallback
        ? // eslint-disable-next-line @typescript-eslint/no-var-requires
          require('../../protos/protos.json')
        : nodejsProtoPath
    );

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this.pathTemplates = {
      readSessionPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/sessions/{session}'
      ),
      readStreamPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/sessions/{session}/streams/{stream}'
      ),
    };

    // Some of the methods on this service provide streaming responses.
    // Provide descriptors for these.
    this.descriptors.stream = {
      readRows: new this._gaxModule.StreamDescriptor(
        gax.StreamType.SERVER_STREAMING
      ),
    };

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
      'google.cloud.bigquery.storage.v1.BigQueryRead',
      gapicConfig as gax.ClientConfig,
      opts.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this.innerApiCalls = {};
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
            'google.cloud.bigquery.storage.v1.BigQueryRead'
          )
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this._protos as any).google.cloud.bigquery.storage.v1.BigQueryRead,
      this._opts
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
        stub => (...args: Array<{}>) => {
          if (this._terminated) {
            return Promise.reject('The client has already been closed.');
          }
          const func = stub[methodName];
          return func.apply(stub, args);
        },
        (err: Error | null | undefined) => () => {
          throw err;
        }
      );

      const apiCall = this._gaxModule.createApiCall(
        callPromise,
        this._defaults[methodName],
        this.descriptors.page[methodName] ||
          this.descriptors.stream[methodName] ||
          this.descriptors.longrunning[methodName]
      );

      this.innerApiCalls[methodName] = apiCall;
    }

    return this.bigQueryReadStub;
  }

  /**
   * The DNS address for this API service.
   */
  static get servicePath() {
    return 'bigquerystorage.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   */
  static get apiEndpoint() {
    return 'bigquerystorage.googleapis.com';
  }

  /**
   * The port for this API service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   */
  static get scopes() {
    return [
      'https://www.googleapis.com/auth/bigquery',
      'https://www.googleapis.com/auth/bigquery.readonly',
      'https://www.googleapis.com/auth/cloud-platform',
    ];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @param {function(Error, string)} callback - the callback to
   *   be called with the current project Id.
   */
  getProjectId(
    callback?: Callback<string, undefined, undefined>
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
  createReadSession(
    request: protos.google.cloud.bigquery.storage.v1.ICreateReadSessionRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protos.google.cloud.bigquery.storage.v1.IReadSession,
      (
        | protos.google.cloud.bigquery.storage.v1.ICreateReadSessionRequest
        | undefined
      ),
      {} | undefined
    ]
  >;
  createReadSession(
    request: protos.google.cloud.bigquery.storage.v1.ICreateReadSessionRequest,
    options: gax.CallOptions,
    callback: Callback<
      protos.google.cloud.bigquery.storage.v1.IReadSession,
      | protos.google.cloud.bigquery.storage.v1.ICreateReadSessionRequest
      | null
      | undefined,
      {} | null | undefined
    >
  ): void;
  createReadSession(
    request: protos.google.cloud.bigquery.storage.v1.ICreateReadSessionRequest,
    callback: Callback<
      protos.google.cloud.bigquery.storage.v1.IReadSession,
      | protos.google.cloud.bigquery.storage.v1.ICreateReadSessionRequest
      | null
      | undefined,
      {} | null | undefined
    >
  ): void;
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
   * Read sessions automatically expire 24 hours after they are created and do
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
   *   depending on the amount parallelism that is reasonable for the table. Error
   *   will be returned if the max count is greater than the current system
   *   max limit of 1,000.
   *
   *   Streams must be read starting from offset 0.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [ReadSession]{@link google.cloud.bigquery.storage.v1.ReadSession}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  createReadSession(
    request: protos.google.cloud.bigquery.storage.v1.ICreateReadSessionRequest,
    optionsOrCallback?:
      | gax.CallOptions
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
    >
  ): Promise<
    [
      protos.google.cloud.bigquery.storage.v1.IReadSession,
      (
        | protos.google.cloud.bigquery.storage.v1.ICreateReadSessionRequest
        | undefined
      ),
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'read_session.table': request.readSession!.table || '',
    });
    this.initialize();
    return this.innerApiCalls.createReadSession(request, options, callback);
  }
  splitReadStream(
    request: protos.google.cloud.bigquery.storage.v1.ISplitReadStreamRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protos.google.cloud.bigquery.storage.v1.ISplitReadStreamResponse,
      (
        | protos.google.cloud.bigquery.storage.v1.ISplitReadStreamRequest
        | undefined
      ),
      {} | undefined
    ]
  >;
  splitReadStream(
    request: protos.google.cloud.bigquery.storage.v1.ISplitReadStreamRequest,
    options: gax.CallOptions,
    callback: Callback<
      protos.google.cloud.bigquery.storage.v1.ISplitReadStreamResponse,
      | protos.google.cloud.bigquery.storage.v1.ISplitReadStreamRequest
      | null
      | undefined,
      {} | null | undefined
    >
  ): void;
  splitReadStream(
    request: protos.google.cloud.bigquery.storage.v1.ISplitReadStreamRequest,
    callback: Callback<
      protos.google.cloud.bigquery.storage.v1.ISplitReadStreamResponse,
      | protos.google.cloud.bigquery.storage.v1.ISplitReadStreamRequest
      | null
      | undefined,
      {} | null | undefined
    >
  ): void;
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
   *   The first element of the array is an object representing [SplitReadStreamResponse]{@link google.cloud.bigquery.storage.v1.SplitReadStreamResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  splitReadStream(
    request: protos.google.cloud.bigquery.storage.v1.ISplitReadStreamRequest,
    optionsOrCallback?:
      | gax.CallOptions
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
    >
  ): Promise<
    [
      protos.google.cloud.bigquery.storage.v1.ISplitReadStreamResponse,
      (
        | protos.google.cloud.bigquery.storage.v1.ISplitReadStreamRequest
        | undefined
      ),
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name || '',
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
   *   An object stream which emits [ReadRowsResponse]{@link google.cloud.bigquery.storage.v1.ReadRowsResponse} on 'data' event.
   */
  readRows(
    request?: protos.google.cloud.bigquery.storage.v1.IReadRowsRequest,
    options?: gax.CallOptions
  ): gax.CancellableStream {
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      read_stream: request.readStream || '',
    });
    this.initialize();
    return this.innerApiCalls.readRows(request, options);
  }

  // --------------------
  // -- Path templates --
  // --------------------

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
    stream: string
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
   * Terminate the GRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   */
  close(): Promise<void> {
    this.initialize();
    if (!this._terminated) {
      return this.bigQueryReadStub!.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}

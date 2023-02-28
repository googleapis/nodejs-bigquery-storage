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

import * as gax from 'google-gax';
import type {CallOptions, ClientOptions} from 'google-gax';
import * as protos from '../../protos/protos';

import {BigQueryWriteClient} from '../v1';

/**
 *  BigQuery Write API.
 *
 *  The Write API can be used to write data to BigQuery.
 *
 *  For supplementary information about the Write API, see:
 *  https://cloud.google.com/bigquery/docs/write-api
 * @class
 * @memberof storage
 */

type StreamConnection = {
  write_stream: WriteStream;
  connection: gax.CancellableStream;
};
type streamConnectionsMap = Record<string, ManagedStream>;
type StreamConnections = {
  connectionList: ManagedStream[];
  connections: streamConnectionsMap;
};
type WriteStream = protos.google.cloud.bigquery.storage.v1.IWriteStream;
type WriteStreamType = WriteStream['type'] | 'DEFAULT';
type AppendRowsResponse =
  protos.google.cloud.bigquery.storage.v1.IAppendRowsResponse;
type AppendRowRequest =
  protos.google.cloud.bigquery.storage.v1.IAppendRowsRequest;
type BatchCommitWriteStreamsRequest =
  protos.google.cloud.bigquery.storage.v1.IBatchCommitWriteStreamsRequest;
type BatchCommitWriteStreamsResponse =
  protos.google.cloud.bigquery.storage.v1.IBatchCommitWriteStreamsResponse;
type IInt64Value = protos.google.protobuf.IInt64Value;
type ProtoData =
  protos.google.cloud.bigquery.storage.v1.AppendRowsRequest.IProtoData;
type DescriptorProto = protos.google.protobuf.IDescriptorProto;

export const DefaultStream = 'DEFAULT';
export class WriterClient {
  private _opts: ClientOptions | undefined;
  private _parent: string;
  private _writeStreamType: WriteStreamType = 'TYPE_UNSPECIFIED';
  private _client: BigQueryWriteClient;
  private _connections: StreamConnections;
  private _client_closed: boolean;

  constructor(
    parent?: string,
    client?: BigQueryWriteClient,
    bqWriteClientOpts?: ClientOptions,
    writeStreamType?: WriteStreamType
  ) {
    this._parent = parent ? parent : 'Please set a parent path';
    this._client = client || new BigQueryWriteClient(bqWriteClientOpts);
    this._writeStreamType = writeStreamType || this._writeStreamType;
    this._connections = {
      connectionList: [],
      connections: {},
    };
    this._client_closed = false;
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
   * @returns {Promise} A promise that resolves when auth is complete.
   */
  initialize = async (): Promise<void> => {
    await this._client.initialize();
  };

  setParent = (projectId: string, datasetId: string, tableId: string): void => {
    const parent = `projects/${projectId}/datasets/${datasetId}/tables/${tableId}`;
    this._parent = parent;
  };

  getParent = (): string => {
    return this._parent;
  };

  getClient = (): BigQueryWriteClient => {
    return this._client;
  };

  setClient = (client: BigQueryWriteClient): void => {
    this._client = client;
  };

  getWriteStreams = (writeStream: WriteStream): undefined | null | string[] => {
    if (writeStream === undefined || writeStream.name === undefined) {
      return undefined;
    }
    if (writeStream.name === null) {
      return null;
    }
    return new Array(writeStream.name);
  };

  setWriteStreamType(streamType: WriteStream['type']): void {
    this._writeStreamType = streamType;
  }

  getWriteStreamType(): WriteStreamType {
    return this._writeStreamType;
  }

  getConnections(): StreamConnections {
    return this._connections;
  }

  getClientClosedStatus(): boolean {
    return this._client_closed;
  }

  private resolveStreamId(streamId: string): string {
    if (streamId === DefaultStream) {
      const parent = this.getParent();
      return `${parent}/streams/_default`;
    }
    return streamId;
  }

  async createWriteStream(): Promise<string> {
    if (this._client_closed) {
      this._client_closed = false;
    }
    await this.initialize();
    const streamType = this.getWriteStreamType();
    const request: protos.google.cloud.bigquery.storage.v1.ICreateWriteStreamRequest =
      {
        parent: this.getParent(),
        writeStream: {
          type: streamTypeToEnum(streamType),
        },
      };
    const [response] = await this._client.createWriteStream(request);
    if (typeof [response] === undefined) {
      throw new gax.GoogleError(`${response}`);
    }
    try {
      if (response.name) {
        const streamId = response.name;
        return streamId;
      }
      return '';
    } catch {
      throw new Error('Stream connection failed');
    }
  }

  async createManagedStream(
    streamId: string,
    protoDescriptor: protos.google.protobuf.IDescriptorProto,
    clientOptions?: CallOptions
  ): Promise<ManagedStream> {
    if (this._client_closed) {
      this._client_closed = false;
    }
    await this.initialize();
    const streamType = this.getWriteStreamType();
    try {
      const fullStreamId = this.resolveStreamId(streamId);
      const writeStream: WriteStream = {
        name: fullStreamId,
        type: streamTypeToEnum(streamType),
      };
      const streamConnection: StreamConnection = {
        write_stream: writeStream,
        connection: clientOptions
          ? this._client.appendRows(clientOptions)
          : this._client.appendRows(),
      };
      const managedStream = new ManagedStream(
        fullStreamId,
        streamConnection,
        streamType,
        protoDescriptor,
        this
      );
      this._connections.connectionList.push(managedStream);
      this._connections.connections[`${streamId}`] = managedStream;
      return managedStream;
    } catch {
      throw new Error('Stream connection failed');
    }
  }

  async batchCommitWriteStream(
    req: BatchCommitWriteStreamsRequest
  ): Promise<BatchCommitWriteStreamsResponse> {
    await this.initialize();
    const [res] = await this._client.batchCommitWriteStreams(req);
    return res;
  }

  async close() {
    this._connections.connectionList.map(ms => {
      return ms.close();
    });
  }

  async finalize(): Promise<
    protos.google.cloud.bigquery.storage.v1.IFinalizeWriteStreamResponse['rowCount']
  > {
    const rowCounts = await Promise.all(
      this._connections.connectionList.map(ms => {
        return ms.finalize();
      })
    );

    return rowCounts.reduce((total: number, rowCount) => {
      const rowCountNum = Number.parseInt(`${rowCount}`, 10);
      return total + rowCountNum;
    }, 0);
  }
}

class PendingWrite {
  private result?: AppendRowsResponse;
  private promise: Promise<AppendRowsResponse>;
  private resolveFunc?: (response: AppendRowsResponse) => void;
  private rejectFunc?: (reason?: protos.google.rpc.IStatus) => void;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolveFunc = resolve;
      this.rejectFunc = reject;
    });
  }

  _setResult(result: AppendRowsResponse) {
    this.result = result;
  }

  _markDone() {
    if (this.result) {
      if (this.result.error) {
        this.rejectFunc && this.rejectFunc(this.result.error);
      }
      this.resolveFunc && this.resolveFunc(this.result);
    }
    this.rejectFunc && this.rejectFunc(new Error('ended with no status'));
  }

  getResult(): Promise<AppendRowsResponse> {
    return this.promise;
  }
}

export class ManagedStream {
  private _writeStreamType?: WriteStreamType = 'TYPE_UNSPECIFIED';
  private _streamId: string;
  private _protoDescriptor: protos.google.protobuf.IDescriptorProto;
  private _writeClient: WriterClient;
  private _streamConnection: StreamConnection;
  private _pendingWrites: PendingWrite[];
  private _open: boolean;

  constructor(
    streamId: string,
    streamConnection: StreamConnection,
    writeStreamType: WriteStreamType,
    protoDescriptor: DescriptorProto,
    writeClient: WriterClient
  ) {
    this._streamId = streamId;
    this._protoDescriptor = protoDescriptor;
    this._writeClient = writeClient;
    this._streamConnection = streamConnection;
    this._writeStreamType = writeStreamType;
    this._pendingWrites = [];
    this._open = true;
    streamConnection.connection.on('data', this._handleData);
    streamConnection.connection.on('error', err => {
      console.log('error:', err);
    });
    streamConnection.connection.on('end', () => {
      this._open  = false;
    });
  }

  _handleData = (response: AppendRowsResponse) => {
    const pw = this._pendingWrites.pop();
    if (!pw) {
      console.log('data arrived with no pending write available', response);
      return;
    }

    pw._setResult(response);
    pw._markDone();
  };

  getStreamId = (): string => {
    return this._streamId;
  };

  setStreamId = (streamId: string): void => {
    this._streamId = streamId;
  };

  appendRows(
    rows: ProtoData['rows'],
    offsetValue?: IInt64Value['value']
  ): PendingWrite {
    let offset: AppendRowRequest['offset'];
    if (offsetValue) {
      offset = {
        value: offsetValue,
      };
    }
    const request: AppendRowRequest = {
      writeStream: this._streamId,
      protoRows: {
        rows,
        writerSchema: {
          protoDescriptor: this._protoDescriptor,
        },
      },
      offset,
    };

    const pw = new PendingWrite();
    this._streamConnection.connection.write(request, () => {
      this._pendingWrites.unshift(pw);
    });
    return pw;
  }

  isOpen(): boolean {
    return this._open;
  }

  async close() {
    this._streamConnection.connection.end();
  }

  async finalize(): Promise<
    protos.google.cloud.bigquery.storage.v1.IFinalizeWriteStreamResponse['rowCount']
  > {
    this.close();
    if (this._writeStreamType === DefaultStream) {
      return;
    }
    const finalizeStreamReq: protos.google.cloud.bigquery.storage.v1.IFinalizeWriteStreamRequest =
      {
        name: this._streamId,
      };

    return this._writeClient
      .getClient()
      .finalizeWriteStream(finalizeStreamReq)
      .then(result => {
        if (!result.includes(undefined)) {
          const [validResponse] = result;
          return validResponse.rowCount;
        }
        return null;
      });
  }
}

function streamTypeToEnum(streamType: WriteStreamType): WriteStream['type'] {
  return streamType === DefaultStream ? 'TYPE_UNSPECIFIED' : streamType;
}

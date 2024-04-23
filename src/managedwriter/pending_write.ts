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

import * as protos from '../../protos/protos';

type AppendRowsResponse =
  protos.google.cloud.bigquery.storage.v1.IAppendRowsResponse;
type AppendRowRequest =
  protos.google.cloud.bigquery.storage.v1.IAppendRowsRequest;

/**
 * PendingWrite tracks state for a set of rows that are part of a single
 * append request. PendingWrites have a Promise interface to await for
 * append results, as well as any errors encountered while processing
 * the request.
 */
export class PendingWrite {
  private request: AppendRowRequest;
  private response?: AppendRowsResponse;
  private retryAttempts: number;
  private promise: Promise<AppendRowsResponse>;
  private resolveFunc?: (response: AppendRowsResponse) => void;
  private rejectFunc?: (reason?: protos.google.rpc.IStatus) => void;

  constructor(request: AppendRowRequest) {
    this.request = request;
    this.retryAttempts = 0;
    this.promise = new Promise((resolve, reject) => {
      this.resolveFunc = resolve;
      this.rejectFunc = reject;
    });
  }

  _increaseRetryAttempts(): number {
    return this.retryAttempts++;
  }

  _markDone(err: Error | null, response?: AppendRowsResponse) {
    if (err) {
      this.rejectFunc && this.rejectFunc(err);
      return;
    }

    if (response) {
      this.response = response;
      this.resolveFunc && this.resolveFunc(response);
      return;
    }

    this.rejectFunc && this.rejectFunc(new Error('ended with no status'));
  }

  /**
   * Abort pending write so calls to GetResult can be unblocked/cancelled.
   */
  abort() {
    this.rejectFunc && this.rejectFunc(new Error('aborted'));
  }

  /**
   * Access the AppendRowRequest that generated this pending write request.
   */
  getRequest(): AppendRowRequest {
    return this.request;
  }

  /**
   * Promise interface to await for
   * append results, as well as any errors encountered while processing
   * the request.
   */
  getResult(): Promise<AppendRowsResponse> {
    if (this.response) {
      return Promise.resolve(this.response);
    }
    return this.promise;
  }
}

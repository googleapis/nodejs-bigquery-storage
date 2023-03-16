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

import * as protos from '../../protos/protos';

type AppendRowsResponse =
  protos.google.cloud.bigquery.storage.v1.IAppendRowsResponse;

export class PendingWrite {
  private promise: Promise<AppendRowsResponse>;
  private resolveFunc?: (response: AppendRowsResponse) => void;
  private rejectFunc?: (reason?: protos.google.rpc.IStatus) => void;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolveFunc = resolve;
      this.rejectFunc = reject;
    });
  }

  _markDone(result?: AppendRowsResponse) {
    if (result) {
      if (result.error) {
        this.rejectFunc && this.rejectFunc(result.error);
      } else {
        this.resolveFunc && this.resolveFunc(result);
      }
    } else {
      this.rejectFunc && this.rejectFunc(new Error('ended with no status'));
    }
  }

  getResult(): Promise<AppendRowsResponse> {
    return this.promise;
  }
}

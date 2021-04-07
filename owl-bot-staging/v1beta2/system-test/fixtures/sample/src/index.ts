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

import {BigQueryReadClient, BigQueryWriteClient} from 'storage';

// check that the client class type name can be used
function doStuffWithBigQueryReadClient(client: BigQueryReadClient) {
  client.close();
}
function doStuffWithBigQueryWriteClient(client: BigQueryWriteClient) {
  client.close();
}

function main() {
  // check that the client instance can be created
  const bigQueryReadClient = new BigQueryReadClient();
  doStuffWithBigQueryReadClient(bigQueryReadClient);
  // check that the client instance can be created
  const bigQueryWriteClient = new BigQueryWriteClient();
  doStuffWithBigQueryWriteClient(bigQueryWriteClient);
}

main();

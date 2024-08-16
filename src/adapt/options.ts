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

export type AdaptOptions = {
  changeSequenceNumberFieldName: string;
  addChangeSequenceNumber: boolean;
  changeTypeFieldName: string;
  addChangeType: boolean;
};

export type AdaptOption = (opts: AdaptOptions) => AdaptOptions;

export function withChangeType(fieldName?: string): AdaptOption {
  return (opts: AdaptOptions) => ({
    ...opts,
    changeTypeFieldName: fieldName || 'changeType',
    addChangeType: true,
  });
}

export function withChangeSequenceNumber(fieldName?: string): AdaptOption {
  return (opts: AdaptOptions) => ({
    ...opts,
    changeSequenceNumberFieldName: fieldName || 'changeSequenceNumber',
    addChangeSequenceNumber: true,
  });
}

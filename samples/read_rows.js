// Copyright 2024 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

function main(
  sqlQuery = 'SELECT repository_url as url, repository_owner as owner, repository_forks as forks FROM `bigquery-public-data.samples.github_timeline` where repository_url is not null'
) {
  // [START bigquerystorage_read_table]
  const {reader} = require('@google-cloud/bigquery-storage');
  const {ReadClient} = reader;
  const {BigQuery} = require('@google-cloud/bigquery');

  async function readRows() {
    const readClient = new ReadClient();
    const bigquery = new BigQuery();

    try {
      sqlQuery =
        'SELECT repository_url as url, repository_owner as owner, repository_forks as forks FROM `bigquery-public-data.samples.github_timeline` where repository_url is not null LIMIT 300000';

      const [job] = await bigquery.createQueryJob({
        query: sqlQuery,
        location: 'US',
      });
      console.log('job info: ', job.id);
      const [metadata] = await job.getMetadata();
      console.log('job metadata: ', metadata.configuration);
      const qconfig = metadata.configuration.query;
      const dstTableRef = qconfig.destinationTable;
      const table = bigquery
        .dataset(dstTableRef.datasetId, {
          projectId: dstTableRef.projectId,
        })
        .table(dstTableRef.tableId);
      const [md] = await table.getMetadata({
        view: 'BASIC',
      });

      console.log('table', table.dataset.projectId, table.dataset.id, table.id);
      const treader = await readClient.createTableReader({table});
      const [rawRows] = await treader.getRows();
      const rows = BigQuery.mergeSchemaWithRows_(md.schema, rawRows, {});
      rows.forEach(row => {
        const url = row['url'];
        const owner = row['owner'];
        const forks = row['forks'];
        console.log(`url: ${url}, owner: ${owner}, ${forks} forks`);
      });
      console.log('Query Results:', rows.length);
    } catch (err) {
      console.log(err);
    } finally {
      console.log('ended');
      readClient.close();
    }
  }
  // [END bigquerystorage_read_table]
  readRows().then(() => {
    console.log('Done');
  });
}
process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));

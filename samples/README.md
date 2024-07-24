[//]: # "This README.md file is auto-generated, all changes to this file will be lost."
[//]: # "To regenerate it, use `python -m synthtool`."
<img src="https://avatars2.githubusercontent.com/u/2810941?v=3&s=96" alt="Google Cloud Platform logo" title="Google Cloud Platform" align="right" height="96" width="96"/>

# [Google BigQuery Storage: Node.js Samples](https://github.com/googleapis/nodejs-bigquery-storage)

[![Open in Cloud Shell][shell_img]][shell_link]

> Node.js idiomatic client for [BigQuery Storage](https://cloud.google.com/bigquery).

The BigQuery Storage product is divided into two major APIs: Write and Read API. 
BigQuery Storage API does not provide functionality related to managing BigQuery 
resources such as datasets, jobs, or tables.

The BigQuery Storage Write API is a unified data-ingestion API for BigQuery. 
It combines streaming ingestion and batch loading into a single high-performance API.
You can use the Storage Write API to stream records into BigQuery in real time or 
to batch process an arbitrarily large number of records and commit them in a single 
atomic operation. 

Read more in our [introduction guide](https://cloud.google.com/bigquery/docs/write-api).

Using a system provided default stream, this code sample demonstrates using the 
schema of a destination stream/table to construct a writer, and send several 
batches of row data to the table.

```javascript
const {adapt, managedwriter} = require('@google-cloud/bigquery-storage');
const {WriterClient, JSONWriter} = managedwriter;

async function appendJSONRowsDefaultStream() {      
  const projectId = 'my_project';
  const datasetId = 'my_dataset';
  const tableId = 'my_table';

  const destinationTable = `projects/${projectId}/datasets/${datasetId}/tables/${tableId}`;
  const writeClient = new WriterClient({projectId});

  try {
    const writeStream = await writeClient.getWriteStream({
      streamId: `${destinationTable}/streams/_default`,
      view: 'FULL'
    });
    const protoDescriptor = adapt.convertStorageSchemaToProto2Descriptor(
      writeStream.tableSchema,
      'root'
    );

    const connection = await writeClient.createStreamConnection({
      streamId: managedwriter.DefaultStream,
      destinationTable,
    });
    const streamId = connection.getStreamId();

    const writer = new JSONWriter({
      streamId,
      connection,
      protoDescriptor,
    });

    let rows = [];
    const pendingWrites = [];

    // Row 1
    let row = {
      row_num: 1,
      customer_name: 'Octavia',
    };
    rows.push(row);

    // Row 2
    row = {
      row_num: 2,
      customer_name: 'Turing',
    };
    rows.push(row);

    // Send batch.
    let pw = writer.appendRows(rows);
    pendingWrites.push(pw);

    rows = [];

    // Row 3
    row = {
      row_num: 3,
      customer_name: 'Bell',
    };
    rows.push(row);

    // Send batch.
    pw = writer.appendRows(rows);
    pendingWrites.push(pw);

    const results = await Promise.all(
      pendingWrites.map(pw => pw.getResult())
    );
    console.log('Write results:', results);
  } catch (err) {
    console.log(err);
  } finally {
    writeClient.close();
  }
}
```

The BigQuery Storage Read API provides fast access to BigQuery-managed storage by 
using an gRPC based protocol. When you use the Storage Read API, structured data is 
sent over the wire in a binary serialization format. This allows for additional 
parallelism among multiple consumers for a set of results.

Read more how to [use the BigQuery Storage Read API](https://cloud.google.com/bigquery/docs/reference/storage).

See sample code on the [Quickstart section](#quickstart).

## Table of Contents

* [Before you begin](#before-you-begin)
* [Samples](#samples)
  * [Append_rows_buffered](#append_rows_buffered)
  * [Append_rows_json_writer_committed](#append_rows_json_writer_committed)
  * [Append_rows_json_writer_default](#append_rows_json_writer_default)
  * [Append_rows_pending](#append_rows_pending)
  * [Append_rows_proto2](#append_rows_proto2)
  * [Append_rows_table_to_proto2](#append_rows_table_to_proto2)
  * [Customer_record_pb](#customer_record_pb)
  * [BigQuery Storage Quickstart](#bigquery-storage-quickstart)
  * [Read_rows](#read_rows)
  * [Sample_data_pb](#sample_data_pb)

## Before you begin

Before running the samples, make sure you've followed the steps outlined in
[Using the client library](https://github.com/googleapis/nodejs-bigquery-storage#using-the-client-library).

`cd samples`

`npm install`

`cd ..`

## Samples



### Append_rows_buffered

View the [source code](https://github.com/googleapis/nodejs-bigquery-storage/blob/main/samples/append_rows_buffered.js).

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-bigquery-storage&page=editor&open_in_editor=samples/append_rows_buffered.js,samples/README.md)

__Usage:__


`node samples/append_rows_buffered.js`


-----




### Append_rows_json_writer_committed

View the [source code](https://github.com/googleapis/nodejs-bigquery-storage/blob/main/samples/append_rows_json_writer_committed.js).

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-bigquery-storage&page=editor&open_in_editor=samples/append_rows_json_writer_committed.js,samples/README.md)

__Usage:__


`node samples/append_rows_json_writer_committed.js`


-----




### Append_rows_json_writer_default

View the [source code](https://github.com/googleapis/nodejs-bigquery-storage/blob/main/samples/append_rows_json_writer_default.js).

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-bigquery-storage&page=editor&open_in_editor=samples/append_rows_json_writer_default.js,samples/README.md)

__Usage:__


`node samples/append_rows_json_writer_default.js`


-----




### Append_rows_pending

View the [source code](https://github.com/googleapis/nodejs-bigquery-storage/blob/main/samples/append_rows_pending.js).

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-bigquery-storage&page=editor&open_in_editor=samples/append_rows_pending.js,samples/README.md)

__Usage:__


`node samples/append_rows_pending.js`


-----




### Append_rows_proto2

View the [source code](https://github.com/googleapis/nodejs-bigquery-storage/blob/main/samples/append_rows_proto2.js).

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-bigquery-storage&page=editor&open_in_editor=samples/append_rows_proto2.js,samples/README.md)

__Usage:__


`node samples/append_rows_proto2.js`


-----




### Append_rows_table_to_proto2

View the [source code](https://github.com/googleapis/nodejs-bigquery-storage/blob/main/samples/append_rows_table_to_proto2.js).

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-bigquery-storage&page=editor&open_in_editor=samples/append_rows_table_to_proto2.js,samples/README.md)

__Usage:__


`node samples/append_rows_table_to_proto2.js`


-----




### Customer_record_pb

View the [source code](https://github.com/googleapis/nodejs-bigquery-storage/blob/main/samples/customer_record_pb.js).

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-bigquery-storage&page=editor&open_in_editor=samples/customer_record_pb.js,samples/README.md)

__Usage:__


`node samples/customer_record_pb.js`


-----




### BigQuery Storage Quickstart

Read data from a table via read stream.

View the [source code](https://github.com/googleapis/nodejs-bigquery-storage/blob/main/samples/quickstart.js).

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-bigquery-storage&page=editor&open_in_editor=samples/quickstart.js,samples/README.md)

__Usage:__


`node quickstart.js`


-----




### Read_rows

View the [source code](https://github.com/googleapis/nodejs-bigquery-storage/blob/main/samples/read_rows.js).

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-bigquery-storage&page=editor&open_in_editor=samples/read_rows.js,samples/README.md)

__Usage:__


`node samples/read_rows.js`


-----




### Sample_data_pb

View the [source code](https://github.com/googleapis/nodejs-bigquery-storage/blob/main/samples/sample_data_pb.js).

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-bigquery-storage&page=editor&open_in_editor=samples/sample_data_pb.js,samples/README.md)

__Usage:__


`node samples/sample_data_pb.js`






[shell_img]: https://gstatic.com/cloudssh/images/open-btn.png
[shell_link]: https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-bigquery-storage&page=editor&open_in_editor=samples/README.md
[product-docs]: https://cloud.google.com/bigquery/docs/reference/storage

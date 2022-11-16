import gax = require('google-gax');
import * as protos from '../../protos/protos';
const customer_record_pb = require('../../samples/customer_record_pb.js');

type WriteStream = protos.google.cloud.bigquery.storage.v1.IWriteStream;

/*const createWriterSchema = (protoPath, filename) => {
    gax.GrpcClient._resolveFile();
}*/ //not MVP

export const createSerializedRows = (rowData: any[]) => {
  const serializedRows: any = [];
  rowData.forEach(entry => {
    serializedRows.push(entry.serializeBinary());
  });
  return serializedRows;
};

export const createParent = (
  projectId: string,
  datasetId: string,
  tableId: string
): string => {
  const parent = `projects/${projectId}/datasets/${datasetId}/tables/${tableId}`;
  return parent;
};

export const writeStreams = (
  writeStream: WriteStream
): undefined | null | string[] => {
  if (writeStream === undefined || writeStream.name === undefined) {
    return undefined;
  }
  if (writeStream.name === null) {
    return null;
  }
  return new Array(writeStream.name);
};

// test serialize rows = works
// Row 1
const row1 = new customer_record_pb.CustomerRecord();
row1.row_num = 1;
row1.setCustomerName('Lovelace');

// Row 2
const row2 = new customer_record_pb.CustomerRecord();
row2.row_num = 2;
row2.setCustomerName('Turing');

const rowData: any = [row1, row2];

console.log(createSerializedRows(rowData));

// test parent path = works
console.log(createParent('my-project', 'my-dataset', 'my-table')); // works

// import gax = require("google-gax");
const customer_record_pb = require('../../samples/customer_record_pb.js');


/*const createWriterSchema = (protoPath, filename) => {
    gax.GrpcClient._resolveFile();
}*/ //not MVP

export const createSerializedRows: Uint8Array[] = (rowData: any[]) => {
    let serializedRows: any = [];
    rowData.forEach(entry => {
      serializedRows.push(entry.serializeBinary())
    })
    return serializedRows;
}

export const createParent = (projectId: string, datasetId: string, tableId: string): string => {
    const parent = `projects/${projectId}/datasets/${datasetId}/tables/${tableId}`;
    return parent;
}

// test serialize rows = works
// Row 1
let row1 = new customer_record_pb.CustomerRecord();
row1.row_num = 1;
row1.setCustomerName('Lovelace');

// Row 2
let row2 = new customer_record_pb.CustomerRecord();
row2.row_num = 2;
row2.setCustomerName('Turing');

let rowData: any = [row1, row2];

console.log(createSerializedRows(rowData));

// test parent path = works
console.log(createParent("my-project", "my-dataset", "my-table")) // works

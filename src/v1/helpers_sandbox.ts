const createWriterSchema = () => {

}

const createSerializedRows = () => {

}

const createParent = (projectId: string, datasetId: string, tableId: string): string => {
    const parent = `projects/${projectId}/datasets/${datasetId}/tables/${tableId}`;
    return parent;
}

const setClientOptions = () => {

}

console.log(createParent("my-project", "my-dataset", "my-table"))
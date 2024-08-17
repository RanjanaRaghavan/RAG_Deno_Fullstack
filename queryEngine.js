import { 
    VectorStoreIndex, 
    SimpleDirectoryReader 
} from "npm:llamaindex@0.1.8";

// Function to set up the query engine
export async function setupQueryEngine() {
    const documents = await new SimpleDirectoryReader().loadData({directoryPath: "./data"});
    const index = await VectorStoreIndex.fromDocuments(documents);
    return index.asQueryEngine();
}

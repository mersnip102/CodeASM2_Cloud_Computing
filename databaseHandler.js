const {MongoClient,ObjectId} = require('mongodb')

const DATABASE_URL = 'mongodb+srv://quyennxgch190732:quyen692001@cluster0.zmilp.mongodb.net/test';
const DATABASE_NAME = 'CodeASM';

async function getDatabase() {
    const client = await MongoClient.connect(DATABASE_URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}

async function deleteProduct(collectionName, id){
    const dbo = await getDatabase()
    await dbo.collection(collectionName).deleteOne({_id: ObjectId(id)})
}

async function getAllDocumentsFromCollection(collectionName) {
    const dbo = await getDatabase();
    const products = await dbo.collection(collectionName).find({}).toArray();
    return products;
}

async function getDocumentById(collectionName, id) {
    
    const dbo = await getDatabase();
    const productToEdit = await dbo.collection(collectionName).findOne({ _id: ObjectId(id) });
    return productToEdit;
}

async function insertObjectToCollection(collectionName, newP) {
    const dbo = await getDatabase();
    const result = await dbo.collection(collectionName).insertOne(newP);
    console.log("The newly product inserted id value is: ", result.insertedId.toHexString());
}

async function updateCollection(id, collectionName, newvalues) {
    const myquery = { _id: ObjectId(id) };
    const dbo = await getDatabase();
    await dbo.collection(collectionName).updateOne(myquery, newvalues);
}

module.exports = {getDatabase,deleteProduct, getAllDocumentsFromCollection,
    getDocumentById, insertObjectToCollection, updateCollection}
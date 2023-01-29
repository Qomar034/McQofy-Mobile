const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://admin:${process.env.MONGO_PASS}@cluster0.jx8ddsv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

let db;

async function mongoConnect() {
    try {
        const database = client.db('McQofy');
        db = database
        
        return db
    } catch(error) {
        console.log(error);
    }
}

function getDb(){
  return db
}
  
module.exports = { mongoConnect, getDb }
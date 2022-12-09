const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'myProject';

const findInDb = async () => {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('fruits');
  return collection.find({}).toArray();
}

const insertInDb = async (fruit) => {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('fruits');
  await collection.insertOne(fruit);
  return 'ok'
}

module.exports = {
  findInDb,
  insertInDb,
}

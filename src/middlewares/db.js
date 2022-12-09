const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'equipe-de-france';

const useDb = async (req, res, next) => {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        req.dao = (collectionName) => db.collection(collectionName);

    } catch (error) {
        console.log('Connected successfully to server');
    }
    next();
};

module.exports = useDb;


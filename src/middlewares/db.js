const { MongoClient } = require('mongodb');
const config = require('../config');
const { DB_URL_TEMPLATE } = require('../config');

const getDbName = (instance) => {
  return config.DB_NAME_TEMPLATE.replace('{{instance}}', instance);
}

const dbConnections = new Map();

const getConnection = async (instance) => {
  if (!dbConnections.has(instance)) {
    dbConnections.set(
      instance,
      await MongoClient.connect(
        DB_URL_TEMPLATE,
        { useNewUrlParser: true, useUnifiedTopology: true },
      )
    );
  }
  return dbConnections.get(instance);
}

const useDb = async (req, _res, next) => {
  try {
    const instance = req.headers['x-ib-instance'];
    const connection = await getConnection(instance);
    const db = connection.db(getDbName(instance));
    req.dao = (collectionName) => db.collection(collectionName);
  } catch (error) {
    console.error(error);
    console.log('Connected failure to server');
  }
  next();
};

module.exports = { useDb, getConnection };


const { getConnection } = require('../src/middlewares/db');
const config = require('../src/config');

let dbConnection = null;
let db = null;

const getDbName = (instance) => {
  return config.DB_NAME_TEMPLATE.replace('{{instance}}', instance);
}

const initDb = async (instance) => {
  try {
    dbConnection = await getConnection(instance);
    db = dbConnection.db(getDbName(instance));
    return db;
  } catch (error) {
    console.log(error)
    console.log('Connected failure to server');
  }
}

beforeEach(async () => {
  const instance = `equipe-de-france-${Math.ceil(Math.random() * 10000)}`;
  db = await initDb(instance);
  db.instance = instance;
})

afterEach(async () => {
  if (db !== null) {
    await db.dropDatabase();
  }
  const dbConnection = await getConnection(db?.instance)
  db = null;
  if (dbConnection) {
    await dbConnection.close();
  }
})

const getDao = () => {
  return (collectionName) => db.collection(collectionName);
}

const getInstanceName = () => {
  return db.instance;
}

module.exports = { getDao, getDbName, getInstanceName }
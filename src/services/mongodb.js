const ObjectId = require('mongodb').ObjectId;
const { DB_COLLECTION } = require('../constants');

const insertOneInDb = async (req) => req.dao(DB_COLLECTION)
  .insertOne(req.body);

const findInDb = async (req) => {
  const { query: { limit, skip } } = req;
  let players = req.dao(DB_COLLECTION).find({});
  if (limit) {
    players = players
      .sort()
      .skip(parseInt(skip))
      .limit(parseInt(limit))
  }
  return players.toArray();
}

const findManyInDb = async (req) => {
  return req.dao(DB_COLLECTION).find({
    _id: {
      $in: req.query.ids.map(id => ObjectId(id))
    }
  }).toArray()
}

const removeInDb = async (req) => req.dao(DB_COLLECTION)
  .deleteOne({ _id: ObjectId(req.params.id) });

const findOneInDb = async (req) => req.dao(DB_COLLECTION)
  .findOne({ _id: ObjectId(req.params.id) });

const updateOneInDb = async (req) => {
  const { firstName, lastName, age, position, ligue1 } = req.body;
  req.dao(DB_COLLECTION).updateOne(
    { _id: ObjectId(req.params.id) },
    { $set: { firstName, lastName, age, position, ligue1 } }
  );
}

module.exports = { findInDb, findOneInDb, findManyInDb, insertOneInDb, removeInDb, updateOneInDb };
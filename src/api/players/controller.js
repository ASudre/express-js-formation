const joi = require('joi');
const { findInDb, insertOneInDb, findManyInDb, removeInDb, updateOneInDb, findOneInDb } = require('../../services/mongodb');

const updatePlayer = async (req, res) => {
  await updateOneInDb(req);
  res.status(200).send(req.body);
}

const getPlayer = async (req, res) => {
  res.status(200).send(req.player);
}

const deletePlayer = async (req, res) => {
  await removeInDb(req);
  res.sendStatus(204);
}

const listPlayers = async (req, res) => {
  const { query: { ids } } = req;
  let players;
  if (Array.isArray(ids)) {
    try {
      joi.assert(req.query.ids, joi.array().items(joi.objectId()))
    } catch (error) {
      return res.status(400).send({ error: error.details[0].message })
    }
    players = await findManyInDb(req);
  } else {
    players = await findInDb(req);
  }
  res.status(200).send(players);
}

const createPlayer = async (req, res) => {
  const player = await insertOneInDb(req);
  res.status(200).send({ ...req.body, ...player.insertedId });
}

module.exports = {
  updatePlayer,
  getPlayer,
  deletePlayer,
  listPlayers,
  createPlayer,
}
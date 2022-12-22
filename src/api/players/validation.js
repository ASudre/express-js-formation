const createError = require('http-errors');
const { findOneInDb } = require('../../services/mongodb');

const checkPlayerExists = async (req, res, next) => {
  const player = await findOneInDb(req);
  if (player === null) {
    throw createError.NotFound({
      error: 'Player does no exist'
    })
  }
  req.player = player;
  next();
};

module.exports =
  { checkPlayerExists };
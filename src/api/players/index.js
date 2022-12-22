const express = require('express');
const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

const validation = require('../../middlewares/validation');
const paramsValidation = require('../../middlewares/params-validation');
const { checkPlayerExists } = require('./validation');
const { useDb } = require('../../middlewares/db');
const postSchema = require('../../schemas/post-schema');
const { updatePlayer, getPlayer, deletePlayer, listPlayers, createPlayer } = require('./controller');

const router = express.Router({ mergeParams: true });

router.use(useDb);

router
  .get('/', listPlayers)
  .post('/',
    validation(postSchema),
    createPlayer,
  )
  .patch('/:id',
    paramsValidation,
    checkPlayerExists,
    validation(postSchema),
    updatePlayer)
  .get('/:id',
    paramsValidation,
    checkPlayerExists,
    getPlayer)
  .delete('/:id',
    paramsValidation,
    checkPlayerExists,
    deletePlayer);;

module.exports = router;
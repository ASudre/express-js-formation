const express = require('express');
const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);
const validation = require('../middlewares/validation');
const paramsValidation = require('../middlewares/params-validation');
const useDb = require('../middlewares/db');

const postSchema = require('../schemas/post-schema');
const { findInDb, insertOneInDb, findManyInDb, removeInDb, updateOneInDb, findOneInDb } = require('../services/mongodb');

const router = express.Router({ mergeParams: true });

router.use(useDb);

const routerById = express
    .Router({ mergeParams: true })
    .patch('/', validation(postSchema), async (req, res) => {
        await updateOneInDb(req);
        res.status(200).send(req.body);
    })

    .get('/', async (req, res) => {
        const player = await findOneInDb(req);
        res.status(200).send(player);
    })

    .delete('/', async (req, res) => {
        await removeInDb(req);
        res.sendStatus(204);
    });

router.use('/:id', paramsValidation, routerById);

router.get('/', async (req, res) => {
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
});

router.post('/', validation(postSchema), async (req, res) => {
    const player = await insertOneInDb(req);
    res.status(200).send({ ...req.body, ...player.insertedId });
});

module.exports = router;
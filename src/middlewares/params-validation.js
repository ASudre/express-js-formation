const joi = require('joi');
const objectIdSchema = require('../schemas/objectid-schema');
const { findOneInDb } = require('../services/mongodb');

const paramsValidation = async (req, res, next) => {
    try {
        joi.assert(req.params, objectIdSchema);
    } catch (error) {
        return res.status(400).send({
            error: error.details[0].message
        })
    }
    const player = await findOneInDb(req);
    if (player === null) {
        return res.status(404).send({
            error: 'Player does no exist'
        })
    }
    next();
};

module.exports = paramsValidation;
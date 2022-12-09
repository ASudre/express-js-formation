const joi = require('joi');

const validation = (schema) => (req, res, next) => {
    try {
        joi.assert(req.body, schema);
    } catch (error) {
        return res.status(400).send({
            error: error.details[0].message
        })
    }
    next();
}

module.exports = validation;
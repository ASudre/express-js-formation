const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

const objectIdSchema = joi.object({
    id: joi.objectId().required()
});

module.exports = objectIdSchema;
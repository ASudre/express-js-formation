const createError = require('http-errors');
const joi = require('joi');

const objectIdSchema = require('../schemas/objectid-schema');

const paramsValidation = async (req, res, next) => {
  try {
    joi.assert(req.params, objectIdSchema);
  } catch (error) {
    throw createError.BadRequest({
      error: error.details[0].message
    })
  }
  next();
};

module.exports = paramsValidation;
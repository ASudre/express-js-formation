const createError = require('http-errors');
const joi = require('joi');

const validation = (schema) => (req, res, next) => {
  try {
    joi.assert(req.body, schema);
  } catch (error) {
    throw createError.BadRequest({
      error: error.details[0].message
    });
  }
  next();
}

module.exports = validation;
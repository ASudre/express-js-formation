const joi = require('joi');

const postSchema = joi.object({
    firstName: joi.string().alphanum().min(3).max(30).required(),
    lastName: joi.string().alphanum().min(3).max(30).required(),
    age: joi.number().integer().min(16).max(40).required(),
    position: joi.string().valid('GOALKEEPER', 'DEFENDER', 'MIDFIELDER', 'ATTACKER').required(),
    ligue1: joi.boolean().required(),
    firstSelection: joi.date().iso().less('now'),
});

module.exports = postSchema;
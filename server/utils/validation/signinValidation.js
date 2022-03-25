const Joi = require('joi');

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(8).required(),
});

module.exports = signinSchema;

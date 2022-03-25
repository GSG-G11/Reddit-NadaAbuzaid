const Joi = require('joi');

const signupSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().alphanum().min(8).required(),
  email: Joi.string().email().required(),
});

module.exports = signupSchema;

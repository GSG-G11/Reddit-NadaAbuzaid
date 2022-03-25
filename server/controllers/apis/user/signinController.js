const { getUsersByEmailQuery } = require('../../../database');
const {
  signinSchema,
  comparePassword,
  createToken,
} = require('../../../utils');
const { createError } = require('../../errors');

const signupController = (req, res, next) => {
  let reqData;
  // Validation
  signinSchema
    .validateAsync(req.body, { abortEarly: false })
    // Check if the email exist!
    .then(() => getUsersByEmailQuery(req.body.email))
    .then((data) => {
      if (!data.rowCount) {
        throw createError('Create Account First!', 401);
      } else {
        reqData = data.rows[0];
        // Check if the password correct!
        return comparePassword(req.body.password, data.rows[0].password);
      }
    })
    // Create token
    .then((isCorrect) => {
      const { id, email, username } = reqData;
      if (!isCorrect) {
        throw createError('Wrong Password!', 400);
      } else {
        return createToken(id, email, username);
      }
    })
    // Set cookies
    .then((token) => {
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json({ message: 'Login successfully' });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        const messages = error.details.map((err) => err.message);
        next(createError(messages, 400));
      } else {
        next(error);
      }
    });
};

module.exports = signupController;

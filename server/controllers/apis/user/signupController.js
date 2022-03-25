const {
  getUsersByEmailQuery,
  getUsersByUsernameQuery,
  addUserQuery,
} = require('../../../database');
const { signupSchema, hashPassword, createToken } = require('../../../utils');
const { createError } = require('../../errors');

const signupController = (req, res, next) => {
  const { username, password, email } = req.body;
  // Validation
  signupSchema
    .validateAsync(req.body, { abortEarly: false })
    // Check if the username already exist!
    .then(() => getUsersByUsernameQuery(username))
    .then((data) => {
      if (data.rowCount) {
        throw createError('Username Already Exist!', 400);
      } else {
        // Check if the email already exist!
        return getUsersByEmailQuery(email);
      }
    })
    .then((data) => {
      if (data.rowCount) {
        throw createError('Email Already Exist!', 401);
      } else {
        // Hash the Password
        return hashPassword(password);
      }
    })
    // Add user info to the database
    .then((hashedPassword) => addUserQuery(username, hashedPassword, email))
    // Create token
    .then((data) => createToken(data.rows[0].id, email, username))
    // Set cookies
    .then((token) => res.cookie('access_token', token, { httpOnly: true }).status(201).json({ message: 'Register successfully', status: 201 }))
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

const { getLoginPage, getSignupPage } = require('./views');
const { signinController, signupController } = require('./apis');
const createError = require('./errors');

module.exports = {
  getLoginPage,
  getSignupPage,
  signinController,
  signupController,
  createError,
};

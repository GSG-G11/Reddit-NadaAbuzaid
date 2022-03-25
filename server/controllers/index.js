const { getLoginPage, getSignupPage } = require('./views');
const { addUserController } = require('./apis');
const createError = require('./errors');

module.exports = {
  getLoginPage,
  getSignupPage,
  addUserController,
  createError,
};

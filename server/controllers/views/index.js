const getLoginPage = require('./getLoginPage');
const getSignupPage = require('./getSignupPage');
const getMainPage = require('./getMainPage');
const getProfilePage = require('./getProfilePage');
const getClientErrorPage = require('./get404Page');
const getSpecificPostPage = require('./getSpecificPostPage');

module.exports = {
  getLoginPage,
  getSignupPage,
  getProfilePage,
  getMainPage,
  getClientErrorPage,
  getSpecificPostPage,
};

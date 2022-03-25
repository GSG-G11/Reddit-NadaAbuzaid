const connection = require('./config');
const {
  addUserQuery,
  getUsersByEmailQuery,
  getUsersByUsernameQuery,
} = require('./queries');

module.exports = {
  connection,
  addUserQuery,
  getUsersByEmailQuery,
  getUsersByUsernameQuery,
};

const addUserQuery = require('./addUserQuery');
const {
  getUsersByEmailQuery,
  getUsersByUsernameQuery,
} = require('./getUsersQuery');

module.exports = {
  addUserQuery,
  getUsersByEmailQuery,
  getUsersByUsernameQuery,
};

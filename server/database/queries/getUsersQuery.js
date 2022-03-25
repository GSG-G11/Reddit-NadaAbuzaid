const { pool } = require('../config/connection');

const getUsersByEmailQuery = (email) => pool.query({
  text: 'SELECT email from users where email = ($1);',
  values: [email],
});

const getUsersByUsernameQuery = (username) => pool.query({
  text: 'SELECT username from users where username = ($1);',
  values: [username],
});

module.exports = { getUsersByEmailQuery, getUsersByUsernameQuery };

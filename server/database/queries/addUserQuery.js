const { pool } = require('../config/connection');

const addUserQuery = (username, password, email) => pool.query({
  text: 'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id;',
  values: [username, password, email],
});

module.exports = addUserQuery;

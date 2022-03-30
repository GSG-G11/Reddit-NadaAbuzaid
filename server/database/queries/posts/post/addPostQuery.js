const { pool } = require('../../../config');

const addPostQuery = (title, content, userId) => pool.query({
  text: 'INSERT INTO posts (title, content, user_id) values ($1, $2, $3) RETURNING *',
  values: [title, content, userId],
});

module.exports = addPostQuery;

const { pool } = require('../../../config/connection');

const getPostsQuery = () =>
  pool.query({
    text: 'SELECT u.username, p.title, p.content, p.id FROM posts p join users u on u.id = p.user_id',
    values: [],
  });

module.exports = getPostsQuery;

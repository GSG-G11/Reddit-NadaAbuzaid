const { pool } = require('../../../config/connection');

const getUserPostsQuery = (username) => pool.query({
  text: 'SELECT u.username, p.title, p.content, u.email, p.id FROM posts p join users u on u.id = p.user_id WHERE u.username = $1',
  values: [username],
});

module.exports = getUserPostsQuery;

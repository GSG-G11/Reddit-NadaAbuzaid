const { pool } = require('../../../config');

const getPostCommentsQuery = (postId) =>
  pool.query({
    text: `SELECT content , (SELECT username from users where id = comments.user_id) as username FROM comments WHERE post_id = $1`,
    values: [postId],
  });

module.exports = getPostCommentsQuery;

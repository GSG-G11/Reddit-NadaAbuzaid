const { pool } = require('../../../config');

const addCommentQuery = (userId, postId, content) =>
  pool.query({
    text: 'INSERT INTO comments (user_id, post_id,content ) VALUES ($1, $2, $3) RETURNING *',
    values: [userId, postId, content],
  });

module.exports = addCommentQuery;

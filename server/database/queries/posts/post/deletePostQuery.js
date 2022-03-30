const { pool } = require('../../../config');

const deletePostQuery = (postId) =>
  pool.query({
    text: `DELETE FROM posts WHERE id = $1`,
    values: [postId],
  });

module.exports = deletePostQuery;

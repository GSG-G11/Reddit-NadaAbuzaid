const { pool } = require('../../../config');

const getVotesQuery = (postId) =>
  pool.query({
    text: "SELECT count(*) FROM votes WHERE post_id = $1 and vote_type = 'up'",
    values: [postId],
  });

module.exports = getVotesQuery;

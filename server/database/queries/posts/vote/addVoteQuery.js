const { pool } = require('../../../config');

const addVoteQuery = (userId, postId, voteType) =>
  pool.query({
    text: 'INSERT INTO votes (user_id, post_id, vote_type) VALUES ($1,$2,$3) ON CONFLICT (user_id, post_id) DO UPDATE SET vote_type = $3 RETURNING *;',
    values: [userId, postId, voteType],
  });

module.exports = addVoteQuery;

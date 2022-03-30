const { pool, dbBuild } = require('./config');
const {
  addUserQuery,
  getUsersByEmailQuery,
  getUsersByUsernameQuery,
  getUserPostsQuery,
  getPostsQuery,
  getVotesQuery,
  addPostQuery,
  addVoteQuery,
  deletePostQuery,
  addCommentQuery,
  getPostByIdQuery,
  getPostCommentsQuery,
} = require('./queries');

module.exports = {
  pool,
  dbBuild,
  getUsersByEmailQuery,
  getUsersByUsernameQuery,
  getPostCommentsQuery,
  getUserPostsQuery,
  getPostByIdQuery,
  getPostsQuery,
  getVotesQuery,
  addUserQuery,
  addPostQuery,
  addVoteQuery,
  addCommentQuery,
  deletePostQuery,
};

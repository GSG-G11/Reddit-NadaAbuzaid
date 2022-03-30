const {
  getPostsQuery,
  addPostQuery,
  getUserPostsQuery,
  addVoteQuery,
  getVotesQuery,
  deletePostQuery,
  addCommentQuery,
  getPostByIdQuery,
  getPostCommentsQuery,
} = require('./posts');

const {
  addUserQuery,
  getUsersByEmailQuery,
  getUsersByUsernameQuery,
} = require('./users');

module.exports = {
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

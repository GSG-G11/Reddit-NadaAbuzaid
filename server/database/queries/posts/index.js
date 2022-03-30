const { getPostCommentsQuery, addCommentQuery } = require('./comment');
const {
  getUserPostsQuery,
  getPostsQuery,
  deletePostQuery,
  addPostQuery,
  getPostByIdQuery,
} = require('./post');
const { getVotesQuery, addVoteQuery } = require('./vote');

module.exports = {
  getPostCommentsQuery,
  getUserPostsQuery,
  getPostByIdQuery,
  getPostsQuery,
  getVotesQuery,
  addCommentQuery,
  addPostQuery,
  addVoteQuery,
  deletePostQuery,
};

const { addVotes, getVotesController } = require('./vote');
const {
  getPosts,
  getUserPosts,
  addPost,
  deletePost,
  getSpecificPostController,
} = require('./post');

const {
  addCommentController,
  getPostCommentsController,
} = require('./comment');

module.exports = {
  getPostCommentsController,
  getSpecificPostController,
  addCommentController,
  getVotesController,
  getUserPosts,
  getPosts,
  addVotes,
  addPost,
  deletePost,
};

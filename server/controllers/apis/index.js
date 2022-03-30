const {
  getPosts,
  addPost,
  getUserPosts,
  addVotes,
  getVotesController,
  deletePost,
  addCommentController,
  getSpecificPostController,
  getPostCommentsController,
} = require('./posts');

const {
  signupController,
  signinController,
  logoutController,
  userInfoHandler,
} = require('./users');

module.exports = {
  getPostCommentsController,
  getSpecificPostController,
  addCommentController,
  getVotesController,
  signinController,
  logoutController,
  signupController,
  userInfoHandler,
  getUserPosts,
  deletePost,
  getPosts,
  addPost,
  addVotes,
};

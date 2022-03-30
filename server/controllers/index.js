const {
  getLoginPage,
  getSignupPage,
  getMainPage,
  getProfilePage,
  getClientErrorPage,
  getSpecificPostPage,
} = require('./views');

const {
  signinController,
  signupController,
  logoutController,
  userInfoHandler,
  addPost,
  addVotes,
  getPosts,
  getUserPosts,
  getVotesController,
  deletePost,
  addCommentController,
  getSpecificPostController,
  getPostCommentsController,
} = require('./apis');

const { createError, clientError, serverError } = require('./errors');
const { isAuth, isLogged } = require('./auth');

module.exports = {
  getSpecificPostController,
  getPostCommentsController,
  getLoginPage,
  getSignupPage,
  getUserPosts,
  getProfilePage,
  getClientErrorPage,
  getVotesController,
  getSpecificPostPage,
  addCommentController,
  getMainPage,
  getPosts,
  signinController,
  signupController,
  createError,
  clientError,
  serverError,
  logoutController,
  userInfoHandler,
  isAuth,
  isLogged,
  addPost,
  addVotes,
  deletePost,
};

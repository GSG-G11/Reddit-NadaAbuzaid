const apisRouter = require('express').Router();

const {
  signinController,
  signupController,
  logoutController,
  userInfoHandler,
  getVotesController,
  isAuth,
  getPosts,
  addPost,
  getUserPosts,
  addVotes,
  deletePost,
  addCommentController,
  getSpecificPostController,
  getPostCommentsController,
} = require('../controllers');

apisRouter.post('/signup', signupController);
apisRouter.post('/signin', signinController);

apisRouter.get('/posts', getPosts);

apisRouter.get('/user/:username', getUserPosts);

apisRouter.post('/vote/:postId/', getVotesController);
apisRouter.post('/post/:postId/', getSpecificPostController);
apisRouter.get('/posts/:id/comments', getPostCommentsController);

apisRouter.use(isAuth);
apisRouter.delete('/post/:id', deletePost);
apisRouter.post('/logout', logoutController);
apisRouter.get('/cookie', userInfoHandler);
apisRouter.post('/post', addPost);
apisRouter.post('/vote/:postId/:voteType', addVotes);
apisRouter.post('/comment/:postId', addCommentController);

module.exports = apisRouter;

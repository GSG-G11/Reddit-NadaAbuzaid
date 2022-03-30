const viewsRouter = require('express').Router();

const {
  getLoginPage,
  getSignupPage,
  isLogged,
  getProfilePage,
  getClientErrorPage,
  getSpecificPostPage,
} = require('../controllers');

viewsRouter.get('/signin', isLogged, getLoginPage);
viewsRouter.get('/signup', isLogged, getSignupPage);
viewsRouter.get('/user/:username', getProfilePage);
viewsRouter.get('/posts/:postId/show', getSpecificPostPage);
viewsRouter.use('/error/404', getClientErrorPage);

module.exports = viewsRouter;

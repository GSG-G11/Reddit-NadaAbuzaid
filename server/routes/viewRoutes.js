const viewsRouter = require('express').Router();

const { getLoginPage, getSignupPage } = require('../controllers');

viewsRouter.get('/signin', getLoginPage);
viewsRouter.get('/signup', getSignupPage);

module.exports = viewsRouter;

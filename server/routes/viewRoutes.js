const viewsRouter = require('express').Router();

const { getLoginPage, getSignupPage } = require('../controllers');

viewsRouter.get('/login', getLoginPage);
viewsRouter.get('/signup', getSignupPage);

module.exports = viewsRouter;

const apisRouter = require('express').Router();

const { addUserController } = require('../controllers');

apisRouter.post('/signup', addUserController);

module.exports = apisRouter;

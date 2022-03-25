const apisRouter = require('express').Router();

const { signinController, signupController } = require('../controllers');

apisRouter.post('/signup', signupController);
apisRouter.post('/signin', signinController);

module.exports = apisRouter;

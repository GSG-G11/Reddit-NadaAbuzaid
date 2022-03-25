const apisRouter = require('express').Router();

const { signinController, signupController, logoutController } = require('../controllers');

apisRouter.post('/signup', signupController);
apisRouter.post('/signin', signinController);
apisRouter.delete('/logout', logoutController);

module.exports = apisRouter;

const { verifyPromise } = require('../../utils');
const { createError } = require('../errors');

const isAuth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    next(createError('Please, Login First!', 401));
  } else {
    verifyPromise(token)
      .then((decoded) => {
        req.userInformation = decoded;
        next();
      })
      .catch(() => {
        res
          .status(401)
          .clearCookie('token')
          .json({ message: 'not Auth', status: 401 });
      });
  }
};

module.exports = isAuth;

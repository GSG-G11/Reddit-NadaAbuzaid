const { verifyPromise } = require('../../utils');

const isLogged = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    next();
  } else {
    verifyPromise(token)
      .then(() => {
        res
          .status(401)
          .redirect('/');
      })
      .catch(() => {
        next();
      });
  }
};

module.exports = isLogged;

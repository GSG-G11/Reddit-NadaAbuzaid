const { verify } = require('jsonwebtoken');

const verifyPromise = (token) => new Promise((resolve, reject) => {
  verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      reject(err);
    } else {
      resolve(decoded);
    }
  });
});

module.exports = verifyPromise;

const { sign } = require('jsonwebtoken');

const createToken = (id, email, username) => new Promise((resolve, reject) => {
  sign({ id, email, username }, process.env.SECRET_KEY, (err, token) => {
    if (err) reject(err);
    else {
      resolve(token);
    }
  });
});

module.exports = createToken;

const { sign } = require('jsonwebtoken');

const createToken = ({ id, email }) =>
  new Promise((resolve, reject) => {
    sign({ id, email }, process.env.SECRET_KEY, (err, token) => {
      if (err) reject(err);
      else {
        resolve(token);
      }
    });
  });

module.exports = createToken;

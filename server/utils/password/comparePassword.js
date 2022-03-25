const { compare } = require('bcrypt');

const comparePassword = (password, hashedPassword) => compare(password, hashedPassword);

module.exports = comparePassword;

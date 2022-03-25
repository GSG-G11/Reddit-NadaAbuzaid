const bcrypt = require('bcrypt');

const comparePassword = (password, hashedPassword) => bcrypt.compare(password, hashedPassword);

module.exports = comparePassword;

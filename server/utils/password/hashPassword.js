const { hash } = require('bcrypt');

const hashPassword = (password) => hash(password, 10);

module.exports = hashPassword;

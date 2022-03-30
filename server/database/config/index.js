const dbBuild = require('./build');
const { pool } = require('./connection');

module.exports = { pool, dbBuild };

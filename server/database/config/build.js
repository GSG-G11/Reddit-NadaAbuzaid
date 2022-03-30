const { join } = require('path');
const { readFileSync } = require('fs');

const { pool } = require('./connection');

const dbBuild = () => {
  const sql = readFileSync(join(__dirname, 'build.sql')).toString();
  return pool.query(sql);
};

module.exports = dbBuild;

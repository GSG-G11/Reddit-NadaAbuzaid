require('env2')('.env');
const { Pool } = require('pg');

let DB_URL = '';
const nodeEnv = process.env.NODE_ENV;

if (nodeEnv === 'production') {
  DB_URL = process.env.DATABASE_URL;
} else if (nodeEnv === 'development') {
  DB_URL = process.env.DB_URL_DEV;
} else if (nodeEnv === 'test') {
  DB_URL = process.env.DB_URL_TEST;
} else {
  throw new Error('DB_URL NOT FOUND!');
}

const sql = {
  connectionString: DB_URL,
  ssl:
    process.env.NODE_ENV === 'Production'
      ? { rejectUnauthorized: false }
      : false,
};

const pool = new Pool(sql);

module.exports = { pool };

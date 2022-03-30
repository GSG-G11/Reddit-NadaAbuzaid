const { pool } = require('../../../config/connection');

const getPostByIdQuery = (id) =>
  pool.query({
    text: `
     SELECT u.username, p.title, p.content, p.id
     FROM posts p join users u on p.user_id = u.id where p.id = $1;`,
    values: [id],
  });

module.exports = getPostByIdQuery;

const { getPostsQuery } = require('../../../../database');
const { createError } = require('../../../errors');

const getPosts = (req, res, next) => {
  getPostsQuery()
    .then((data) => res.json(data.rows))
    .catch((err) => next(createError(err, 500)));
};

module.exports = getPosts;

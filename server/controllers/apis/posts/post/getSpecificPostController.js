const { getPostByIdQuery } = require('../../../../database');
const { createError } = require('../../../errors');

const getSpecificPostQuery = (req, res, next) => {
  getPostByIdQuery(req.params.postId)
    .then((data) => res.json(data.rows[0]))
    .catch((err) => next(createError(err, 500)));
};

module.exports = getSpecificPostQuery;

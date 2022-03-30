const { deletePostQuery } = require('../../../../database');
const { createError } = require('../../../errors');

const deletePost = (req, res, next) => {
  const { id } = req.params;
  deletePostQuery(id)
    .then(res.status(200).json({ message: 'Post deleted' }))
    .catch((err) => next(createError(err, 500)));
};

module.exports = deletePost;

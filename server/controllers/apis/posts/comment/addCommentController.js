const { addCommentQuery } = require('../../../../database');

const addCommentController = (req, res, next) => {
  const userId = req.userInformation.id;
  const { postId } = req.params;
  const { content } = req.body;
  addCommentQuery(userId, postId, content)
    .then((data) =>
      res
        .status(201)
        .json({ message: 'Comment added successfully!', data: data.rows[0] })
    )
    .catch((err) => next(err));
};

module.exports = addCommentController;

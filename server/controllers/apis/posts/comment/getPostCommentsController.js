const { getPostCommentsQuery } = require('../../../../database');

const getPostCommentsController = (req, res, next) => {
  const { id } = req.params;

  getPostCommentsQuery(id)
    .then((data) => {
      res.status(200).json(data.rows);
    })
    .catch((err) => next(err));
};

module.exports = getPostCommentsController;

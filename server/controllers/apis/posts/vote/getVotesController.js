const { getVotesQuery } = require('../../../../database');

const getVotesController = (req, res, next) => {
  const { postId } = req.params;
  getVotesQuery(postId)
    .then((result) => {
      const { count } = result.rows[0];
      res.status(200).json({ count });
    })
    .catch(next);
};

module.exports = getVotesController;

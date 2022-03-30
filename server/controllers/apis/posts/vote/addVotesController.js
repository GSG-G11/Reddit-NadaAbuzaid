const { addVoteQuery } = require('../../../../database');

const addVotes = (req, res, next) => {
  const userId = req.userInformation.id;
  const { postId, voteType } = req.params;
  addVoteQuery(userId, postId, voteType)
    .then(() => res.json({ message: 'Success!' }))
    .catch((err) => next(err));
};

module.exports = addVotes;

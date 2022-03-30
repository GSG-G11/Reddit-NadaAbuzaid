const {
  getUserPostsQuery,
  getUsersByUsernameQuery,
} = require('../../../../database');
const { createError } = require('../../../errors');

const getUserPosts = (req, res, next) => {
  const { username } = req.params;
  let email;

  getUsersByUsernameQuery(username)
    .then((user) => {
      if (user.rowCount === 0) throw createError('User not found', 404);
      else {
        email = user.rows[0].email;
        return getUserPostsQuery(username);
      }
    })
    .then((posts) => {
      if (posts.rowCount > 0) res.status(200).json({ posts: posts.rows, message: 'User has posts' });
      else res.json({ message: 'User has no posts', email });
    })
    .catch((err) => next(err));
};

module.exports = getUserPosts;

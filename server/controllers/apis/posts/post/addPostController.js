const { addPostQuery } = require('../../../../database');

const addPost = (req, res, next) => {
  const { id, username } = req.userInformation;
  const { title, content } = req.body;
  addPostQuery(title, content, id)
    .then((data) => res.json({ data, username }))
    .catch(console.log);
};

module.exports = addPost;

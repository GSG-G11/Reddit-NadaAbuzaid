const getPosts = require('./getAllPostsController');
const addPost = require('./addPostController');
const getUserPosts = require('./getUserPostsController');
const deletePost = require('./deletePostController');
const getSpecificPostController = require('./getSpecificPostController');

module.exports = {
  getSpecificPostController,
  getUserPosts,
  getPosts,
  addPost,
  deletePost,
};

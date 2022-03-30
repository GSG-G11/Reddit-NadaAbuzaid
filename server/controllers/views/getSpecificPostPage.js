const { join } = require('path');

const getSpecificPostPage = (req, res) => {
  res.sendFile(
    join(__dirname, '..', '..', '..', 'client', 'views', 'post.html')
  );
};

module.exports = getSpecificPostPage;

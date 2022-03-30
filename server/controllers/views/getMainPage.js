const { join } = require('path');

const getMainPage = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', '..', 'client', 'public', 'index.html'));
};

module.exports = getMainPage;

const { join } = require('path');

const getLoginPage = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', '..', 'views', 'login.html'));
};

module.exports = getLoginPage;

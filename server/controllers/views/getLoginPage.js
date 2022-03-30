const { join } = require('path');

const getLoginPage = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', '..', 'client', 'views', 'signin.html'));
};

module.exports = getLoginPage;

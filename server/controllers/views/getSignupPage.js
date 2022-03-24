const { join } = require('path');

const getSignupPage = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', '..', 'views', 'signup.html'));
};

module.exports = getSignupPage;

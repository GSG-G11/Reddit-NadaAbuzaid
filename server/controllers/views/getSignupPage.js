const { join } = require('path');

const getSignupPage = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', '..', 'client', 'views', 'signup.html'));
};

module.exports = getSignupPage;

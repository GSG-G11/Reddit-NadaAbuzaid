const { join } = require('path');

const getProfilePage = (req, res) => {
  res.sendFile(
    join(__dirname, '..', '..', '..', 'client', 'views', 'profile.html')
  );
};

module.exports = getProfilePage;

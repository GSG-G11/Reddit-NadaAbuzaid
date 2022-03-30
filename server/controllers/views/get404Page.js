const { join } = require('path');

const getClientErrorPage = (req, res) => {
  res.sendFile(
    join(__dirname, '..', '..', '..', 'client', 'public', 'errors', '404.html')
  );
};

module.exports = getClientErrorPage;

const { join } = require('path');

const clientError = (request, response) => {
  response
    .status(404)
    .sendFile(join(__dirname, '..', '..', '..', 'client', 'public', 'errors', '404.html'));
};

module.exports = clientError;

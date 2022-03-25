const clientError = (request, response) => {
  response.status(404).json({
    status: 404,
    message: 'Sorry, Page not found!',
  });
};

module.exports = clientError;

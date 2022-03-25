const serverError = (error, request, response, next) => {
  response.status(error.status || 500).json({
    status: error.status || 500,
    message: error.status ? error.message : 'Server Error',
  });
};

module.exports = serverError;

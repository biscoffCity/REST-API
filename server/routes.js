const logger = require('./logger');

function handleError(response, error) {
  return response.status(500).send({
    message: 'Internal server error',
    error: error.message
  });
}

module.exports = function(app) {
  app.use('/api/posts', require('./api/post'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  app.use((error, request, response, next) => {
    logger.error(error);
    if (error.name === 'UnauthorizedError') {
      response.sendStatus(401);
    } else {
      handleError(response, error);
    }
  });
};

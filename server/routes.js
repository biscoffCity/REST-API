function handleError(response, error) {
  return response.status(500).send({
    message: 'Internal server error',
  });
}

module.exports = function(app) {
  app.use('/api/todos', require('./api/todo'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  app.use((error, request, response, next) => {
    if (error.name === 'UnauthorizedError') {
      response.sendStatus(401);
    } else {
      handleError(response, error);
    }
  });
};

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const mongoose = require('mongoose');
const config = require('./environment');
const logger = require('./logger');

mongoose.connect(config.mongo.uri, config.mongo.options);

const app = express();
const server = require('http').createServer(app);

require('./express')(app);
require('./routes')(app);

if (config.seedDB) {
  require('./seed');
}

server.listen(config.port, config.ip, function () {
  logger.info('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

exports = module.exports = app;

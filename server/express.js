const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const path = require('path');
const config = require('./environment');
const passport = require('passport');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

module.exports = function(app) {
  const env = app.get('env');

  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({ mongooseConnection: mongoose.connection })
  }));

  if (['production', 'staging'].includes(env)) {
    app.use(favicon(path.join(config.root, process.cwd() + '/client/dist', 'favicon.ico')));
    app.use(express.static(path.join(config.root, process.cwd() + '/client/dist')));
    app.set('appPath', config.root + process.cwd() + '/client/dist');
  }

  if (['development', 'test'].includes(env)) {
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', 'client');
  }

  app.use(morgan('dev'));
  app.use(helmet());
};

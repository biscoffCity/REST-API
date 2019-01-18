const config = require('../environment');
const logger = require('../logger');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const compose = require('composable-middleware');
const User = require('../api/user/model');
const validateJwt = expressJwt({ secret: config.secrets.session });

function isAuthenticated() {
  return compose()
    .use((req, res, next) => {
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = `Bearer ${req.query.access_token}`;
      }
      validateJwt(req, res, next);
    })
    .use((req, res, next) =>
      User.findById(req.user._id)
        .exec()
        .then(user => {
          if (!user) {
            return res.send(401);
          }

          req.user = user;
          next();
        })
        .catch(err => {
          logger.error(err);
          return next(err);
        }));
}

function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use((req, res, next) => {
      if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        return next();
      }

      return res.send(403);
    });
}

function signToken(id) {
  return jwt.sign({ _id: id }, config.secrets.session, { expiresIn: 60 * 60 * 5 });
}

function setTokenCookie(req, res) {
  if (!req.user) {
    return res.status(404).json({
      message: 'Something went wrong, please try again.'
    });
  }
  const token = signToken(req.user._id);

  res.cookie('token', JSON.stringify(token));
  return res.redirect(`${config.app}?token=${token}`);
}

module.exports = {
  hasRole,
  isAuthenticated,
  setTokenCookie,
  signToken
};

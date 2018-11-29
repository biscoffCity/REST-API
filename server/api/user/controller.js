const get = require('lodash/get');
const User = require('./model');
const config = require('../../environment');
const jwt = require('jsonwebtoken');
const logger = require('../../logger');

const validationError = (res, err) => {
  if (err) {
    logger.error(err);
  }

  return res.status(422).json(err);
};

function index(req, res) {
  return User.findOne()
    .exec()
    .then(user => res.json(user));
}

function create(req, res, next) {
  const newUser = new User();
  console.log(req.body);
  newUser.provider = 'local';
  newUser.password = 'local';
  newUser.role = 'user';
  newUser.name = 'user123';
  newUser.email = 'user123@test.com';
  console.log(newUser);
  return newUser.save()
    .then(user => {
      const token = jwt.sign({
        _id: user._id
      }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });

      return res.json({
        token
      });
    })
    .catch(err => validationError(res, err));
}

function show(req, res, next) {
  const userId = req.params.id;

  return User.findById(userId)
    .exec()
    .then(user => {
      if (!user) {
        return res.status(401).end();
      }
      return res.json(user.profile);
    })
    .catch(err => {
      logger.error(err);
      return next(err);
    });
}

function destroy(req, res) {
  return User.findByIdAndRemove(req.params.id)
    .exec()
    .then(() => res.status(204).end())
    .catch(err => {
      logger.error(err);
      return res.status(500).send(err);
    });
}

function changePassword(req, res, next) {
  const userId = req.user._id;
  const oldPass = String(req.body.oldPassword);
  const newPass = String(req.body.newPassword);

  return User.findById(userId)
    .exec()
    .then(user => {
      if(user.authenticate(oldPass)) {
        user.password = newPass;
        user.save()
          .then(() => res.end())
          .catch(err => validationError(res, err));
      } else {
        return res.status(403).end();
      }
    });
}

function me(req, res, next) {
  const userId = get(req, 'user._id');

  return User.findOne({_id: userId})
    .select('-salt -hashedPassword')
    .exec()
    .then(user => {
      if (!user) {
        return Promise.reject('User not found.');
      }

      return res.json(user);
    })
    .catch(err => {
      logger.error(err);
      return next(err);
    });
}

module.exports = {
  changePassword,
  create,
  destroy,
  index,
  me,
  show
};

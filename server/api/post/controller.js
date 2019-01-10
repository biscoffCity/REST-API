const get = require('lodash/get');
const Post = require('./model');
const User = require('../user/model');
const config = require('../../environment');
const logger = require('../../logger');

const validationError = (res, err) => {
  if (err) {
    logger.error(err);
  }

  return res.status(422).json(err);
};

async function getAll(req, res) {
  const posts = await Post.find().exec();

  return res.json(posts);
}

async function create(request, response, next) {
  try {
    console.log(request.body);
    const newPost = new Post({
      // author: '5c19b61576f9fe03f0e53081',
      author: request.body.user._id,
      content: request.body.content
    });
    const post = await newPost.save();

    return response.status(201).json(post);
  } catch (err) {
    return validationError(response, err);
  }
}

function getById(req, res, next) {
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

module.exports = {
  create,
  getAll,
  getById
};

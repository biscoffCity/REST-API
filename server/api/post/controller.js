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
      author: request.body.user._id,
      content: request.body.content,
      tags: request.body.tags,
    });
    console.log(newPost);
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

async function getTags(req, res, next) {
  const posts = await Post.distinct('tags').exec();

  return res.json(posts);
}

async function getByTags(req, res, next) {
  const posts = await Post.find({
    'tags': [req.params.tag]
  }).exec();

  return res.json(posts);
}

module.exports = {
  create,
  getAll,
  getById,
  getByTags,
  getTags,
};

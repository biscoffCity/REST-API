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

async function create(req, res, next) {
  try {
    const newPost = new Post({
      author: req.body.user._id,
      content: req.body.content,
      tags: req.body.tags,
      original: true
    });
    const post = await newPost.save();

    return res.status(201).json(post);
  } catch (err) {
    return validationError(res, err);
  }
}

async function getByUser(req, res, next) {
  const userId = req.params.id;
  const posts = await Post.find({ author: userId, original: true }).exec();

  return res.json(posts);
}

async function getById(req, res, next) {
  const postId = req.params.id;
  const post = await Post.findById(postId).populate('replies').exec();

  return res.json(post);
}

async function getByReplies(req, res, next) {
  const userId = req.params.id;
  const posts = await Post.find({
    original: true,
    replies: {
      $exists: true,
      $not: {
        $size: 0
      }
    }
  }).exec();

  return res.json(posts);
}

async function getTags(req, res, next) {
  const posts = await Post.distinct('tags').exec();

  return res.json(posts);
}

async function getByTags(req, res, next) {
  const posts = await Post.find({
    tags: req.params.tag,
    original: true
  }).exec();

  return res.json(posts);
}

async function search(req, res, next) {
  const query = req.query.search;

  if (!query) {
    return res.status(404).json({
      message: 'No query provided.'
    });
  }

  const posts = await Post.find({
    $or: [{
      'tags': {
        $regex: query
      }
    }, {
      'content': {
        $regex: query
      }
    }]
  }).exec();

  return res.json(posts);
}

async function setReply(req, res, next) {
  const questionId = req.params.id;
  const reply = new Post({
    author: req.body.author,
    content: req.body.content,
    tags: req.body.tags,
  });
  const post = await Post.findById(questionId).exec();

  post.replies.push(reply);
  const [ , updatedPost ] = await Promise.all([
    reply.save(),
    post.save()
  ]);

  return res.json(updatedPost);
}

module.exports = {
  create,
  getAll,
  getById,
  getByUser,
  getByReplies,
  getByTags,
  getTags,
  search,
  setReply,
};

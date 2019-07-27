const get = require('lodash/get');
const set = require('lodash/set');
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

function getUser(request) {
  return request.body.user || request.user;
}

async function create(req, res, next) {
  try {
    const newPost = new Post({
      author: getUser(req)._id,
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

async function removePost(req, res, next) {
  const _id = req.params.id
  Post.findByIdAndRemove(_id, (err, post) => {
      if (err) return res.status(500).send(err);
      const response = {
          message: "Post successfully deleted",
          id: post._id
      };
      return res.status(200).send(response);
  });
}

async function getByUser(req, res, next) {
  const userId = req.params.id;
  const isOriginal = req.params.original;
  const posts = await Post.find({ author: userId, original: isOriginal }).exec();

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

async function doesTagExist(req, res, next) {
  const posts = await Post.find({
    tags: req.params.newTag,
  }).exec();
  if (posts.length !== 0) {
    return res.json(true);
  }
  try {
    const newPost = new Post({
      content: '',
      original: true,
      tags: req.params.newTag
    });
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return validationError(res, err);
  }
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
  const postObject = {
    author: req.body.author || getUser(req)._id
  };

  try {
    if (req.files && req.files.length) {
      const file = req.files[0];

      postObject.type = file.fieldname;
      set(postObject, `media.${postObject.type}`, file.location);
    } else {
      postObject.content = req.body.content;
      postObject.tags = req.body.tags;
    }
  } catch (error) {
    logger.error(error);
  }

  const reply = new Post(postObject);
  const post = await Post.findById(questionId).exec();

  post.replies.push(reply);
  const [ , updatedPost ] = await Promise.all([
    reply.save(),
    post.save()
  ]);

  return res.json(updatedPost);
}

async function upvote(req, res) {
  const replyId = req.params.id;
  const post = await Post.findByIdAndUpdate(replyId, {
    $addToSet: {
      'votes': req.body.author || getUser(req)._id
    }
  }).exec();

  return res.json(post);
}

async function downvote(req, res) {
  const replyId = req.params.id;
  const post = await Post.findByIdAndUpdate(replyId, {
    $pull: {
      'votes': String(req.body.author || getUser(req)._id)
    }
  }).exec();

  return res.json(post);
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
  doesTagExist,
  removePost,
  upvote,
  downvote
};

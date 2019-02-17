const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String
  },
  votes: {
    type: Number,
    default: 0
  },
  replies: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  isDonation: {
    type: Boolean,
    default: false
  },
  tags: [],
  media: {}
});

module.exports = mongoose.model('Post', PostSchema);

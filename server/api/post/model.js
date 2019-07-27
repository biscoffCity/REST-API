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
  votes: [],
  replies: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  isDonation: {
    type: Boolean,
    default: false
  },
  original: {
    type: Boolean,
    default: false
  },
  tags: [],
  media: {},
  type: {
    type: String,
    default: 'text',
    enum: ['audio', 'text', 'video', 'image']
  }
});

module.exports = mongoose.model('Post', PostSchema);

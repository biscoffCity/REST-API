const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = require('./api/post/model');
const User = require('./api/user/model');

module.exports = (async () => {
  await Post.find().remove();
  await User.find().remove();
  const newUser = await User.create({
    name: 'Joe Smith',
    email: 'test@test.com',
    role: 'admin',
    username: 'helloworld'
  });

  await Post.create({
    author: newUser._id,
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum neque autem hic eveniet facilis, voluptatem itaque impedit delectus dolorem, veritatis rem, temporibus vel esse facere voluptas eos ea illo fugiat.',
    isDonation: false,
    media: {}
  });
})();

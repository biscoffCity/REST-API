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
    content: 'What is the best website to use for a beginner?',
    replies: [],
    isDonation: false,
    original: true,
    tags: ['website development'],
    media: {}
  }, {
    author: newUser._id,
    content: 'What is the best platform to advertise on for a jewelry brand?',
    replies: [],
    isDonation: false,
    original: true,
    tags: ['social media', 'jewelry'],
    media: {}
  }, {
    author: newUser._id,
    content: 'Where is the best burger place in harlem?',
    replies: [],
    isDonation: false,
    original: true,
    tags: ['harlem', 'burgers'],
    media: {}
  }, {
    author: newUser._id,
    content: 'What\'s the largest think tank in America?',
    replies: [],
    isDonation: false,
    original: true,
    tags: ['think tank', 'America'],
    media: {}
  }, {
    author: newUser._id,
    content: 'Who has the best cotton socks for sale around midtown?',
    replies: [],
    isDonation: false,
    original: true,
    tags: ['Midtown', 'cotton socks'],
    media: {}
  }, {
    author: newUser._id,
    content: 'Where is the best public school district to move to in New York?',
    replies: [],
    isDonation: false,
    original: true,
    tags: ['public schools', 'new york'],
    media: {}
  }, {
    author: newUser._id,
    content: 'When do broadway tickets go on sales, and where can I get discounted broadway tickets?',
    replies: [],
    isDonation: false,
    original: true,
    tags: ['broadway',  'ticket', 'sales'],
    media: {}
  }, {
    author: newUser._id,
    content: 'What is the most popular donut place in Brooklyn?',
    replies: [],
    isDonation: false,
    original: true,
    tags: ['donuts', 'brooklyn'],
    media: {}
  }, {
    author: newUser._id,
    content: 'How do I choose the best career?',
    replies: [],
    isDonation: false,
    original: true,
    tags: ['career'],
    media: {}
  }, {
    author: newUser._id,
    content: 'where can I purchase cheap glasses with prescription?',
    replies: [],
    isDonation: false,
    original: true,
    tags: ['cheap glasses', 'prescription glasses', 'affordable'],
    media: {}
  }, {
    author: newUser._id,
    content: 'How do I care for an aloe vera plant?',
    replies: [],
    isDonation: false,
    original: true,
    tags: ['aloe vera'],
    media: {}
  }, {
    author: newUser._id,
    content: 'Best skin regiment for brown girl with normal skin?',
    replies: [],
    isDonation: false,
    original: true,
    tags: ['brown girl', 'skin care'],
    media: {}
  }, {
    author: newUser._id,
    content: 'Where can I get quality hijabs online?',
    replies: [],
    isDonation: false,
    original: true,
    tags: ['quality', 'hijabs', 'online'],
    media: {}
  }, {
    author: newUser._id,
    content: 'When\'s a good time to travel to Thailand?',
    replies: [],
    isDonation: false,
    original: true,
    tags: ['thailand', 'travel'],
    media: {}
  }, {
    author: newUser._id,
    content: 'Where can I find the most affordable travel packages?',
    replies: [],
    isDonation: false,
    original: true,
    tags: ['Affordable', 'travel', 'packages'],
    media: {}
  }, {
    author: newUser._id,
    content: 'How do I build credit?',
    replies: [],
    isDonation: false,
    original: true,
    tags: ['credit', 'score', 'how to'],
    media: {}
  }, {
    author: newUser._id,
    content: 'what do I need to rent a car?',
    replies: [],
    isDonation: false,
    original: true,
    tags: ['car rental', 'inquiry'],
    media: {}
  }, {
    author: newUser._id,
    content: 'How do I peel a pomegranate?',
    replies: [],
    isDonation: false,
    original: true,
    tags: ['peel', 'pomegranate'],
    media: {}
  }, {
    author: newUser._id,
    content: 'how to ease my seasonal affective disorder in the winter?',
    replies: [],
    isDonation: false,
    original: true,
    tags: ['seasonal affective disorder'],
    media: {}
  }, {
    author: newUser._id,
    content: 'What\'s a good home remedy for a cold/flu?',
    replies: [],
    isDonation: false,
    original: true,
    tags: ['home remedy', 'cold', 'flu'],
    media: {}
  });
})();

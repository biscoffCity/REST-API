const express = require('express');
const router = express.Router();
const config = require('../environment');
const User = require('../api/user/model');

require('./facebook/passport').setup(User, config);
require('./google/passport').setup(User, config);
require('./reddit/passport').setup(User, config);
require('./linkedin/passport').setup(User, config);

router.use('/facebook', require('./facebook'));
router.use('/google', require('./google'));
router.use('/reddit', require('./reddit'));
router.use('/linkedin', require('./linkedin'));

module.exports = router;

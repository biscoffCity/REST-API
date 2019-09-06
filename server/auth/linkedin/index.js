const express = require('express');
const passport = require('passport');
const auth = require('../service');
const router = express.Router();

router
  .get('/', passport.authenticate('linkedin'))
  .get('/callback', passport.authenticate('linkedin', {
    session: false
  }), auth.setTokenCookie);

module.exports = router;

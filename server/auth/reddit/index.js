const express = require('express');
const passport = require('passport');
const auth = require('../service');
const crypto = require('crypto');
const router = express.Router();

router
  .get('/', passport.authenticate('reddit', {
    state: crypto.randomBytes(32).toString('hex')
  }))
  .get('/callback', passport.authenticate('reddit', {
    failureRedirect: '/register',
    session: false
  }), auth.setTokenCookie);

module.exports = router;

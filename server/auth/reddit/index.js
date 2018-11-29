const express = require('express');
const passport = require('passport');
const auth = require('../service');
const router = express.Router();

router
  .get('/', passport.authenticate('reddit'))
  .get('/callback', passport.authenticate('reddit', {
    failureRedirect: '/register',
    session: false
  }), auth.setTokenCookie);

module.exports = router;

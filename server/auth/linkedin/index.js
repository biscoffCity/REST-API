const express = require('express');
const passport = require('passport');
const auth = require('../service');
const router = express.Router();

router
  .get('/', passport.authenticate('linkedin', {
    state: 'null'
  }))
  .get('/callback', passport.authenticate('linkedin', {
    successRedirect: '/home',
    failureRedirect: '/register',
    session: false
  }), auth.setTokenCookie);

module.exports = router;

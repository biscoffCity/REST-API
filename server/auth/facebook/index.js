const express = require('express');
const passport = require('passport');
const auth = require('../service');
const router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    failureRedirect: '/',
    session: false
  }))
  .get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/',
    session: false
  }), auth.setTokenCookie);

module.exports = router;

const express = require('express');
const config = require('../../environment');
const controller = require('./controller');
const auth = require('../../auth/service');

const router = express.Router();

router.post('/', auth.isAuthenticated(), controller.create);

module.exports = router;

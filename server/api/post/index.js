const express = require('express');
const controller = require('./controller');
const auth = require('../../auth/service');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/search', controller.search);
router.get('/tags', controller.getTags);
router.get('/replies/:id', controller.getByReplies);
router.get('/tags/:tag', controller.getByTags);
router.get('/user/:id', controller.getByUser);
router.post('/', controller.create);

module.exports = router;

const express = require('express');
const controller = require('./controller');
const auth = require('../../auth/service');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/search', controller.search);
router.get('/tags', controller.getTags);
router.get('/replies/:id', controller.getByReplies);
router.get('/tags/:tag', controller.getByTags);
router.get('/user/:id/:original', controller.getByUser);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.post('/reply/:id', controller.setReply);
router.get('/newtags/:newTag', controller.doesTagExist);

module.exports = router;

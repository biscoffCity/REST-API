const express = require('express');
const controller = require('./controller');
const auth = require('../../auth/service');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/tags', controller.getTags);
router.get('/tags/:tag', controller.getByTags);
router.get('/:id', controller.getById);
router.post('/', controller.create);

module.exports = router;

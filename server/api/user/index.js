const express = require('express');
const controller = require('./controller');
const auth = require('../../auth/service');
const router = express.Router();

router.get('/', controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.hasRole('dev'), controller.show);
router.post('/', controller.create);

module.exports = router;

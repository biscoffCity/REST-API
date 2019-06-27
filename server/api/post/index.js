const aws = require('aws-sdk');
const express = require('express');
const multer  = require('multer');
const multerS3  = require('multer-s3');

const config = require('../../environment');
const controller = require('./controller');
const auth = require('../../auth/service');

aws.config.update({
  accessKeyId: config.aws.access_key,
  secretAccessKey: config.aws.access_secret
});
const router = express.Router();
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'posts-media',
    acl: 'public-read',
    metadata(req, file, cb) {
      if (req.body.data) {
        req.body = JSON.parse(req.body.data);
      }

      cb(null, {
        fieldName: file.fieldname
      });
    },
    key(req, file, cb) {
      let prefix;
      let ext;

      switch (file.fieldname) {
        case 'audio':
          prefix = 'audios';
          ext = '.mp3';
          break;
        case 'image':
          prefix = 'images';
          ext = '.jpeg';
          break;
        default:
          break;
      }

      cb(null, `${prefix}/${Date.now().toString()}${ext}`)
    }
  })
});

router.get('/', controller.getAll);
router.get('/search', controller.search);
router.get('/tags', controller.getTags);
router.get('/replies/:id', controller.getByReplies);
router.get('/tags/:tag', controller.getByTags);
router.get('/user/:id/:original', controller.getByUser);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.post('/reply/:id', upload.any(), auth.isAuthenticated(), controller.setReply);
router.get('/newtags/:newTag', controller.doesTagExist);

module.exports = router;

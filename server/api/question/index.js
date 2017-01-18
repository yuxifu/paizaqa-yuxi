'use strict';

var auth = require('../../auth/auth.service');

var express = require('express');
var controller = require('./question.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.upsert); //insert or update
router.patch('/:id', auth.isAuthenticated(), controller.patch); //update partially
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

router.post('/:id/answers', auth.isAuthenticated(), controller.createAnswer);
router.put('/:id/answers/:answerId', auth.isAuthenticated(), controller.updateAnswer);
router.delete('/:id/answers/:answerId', auth.isAuthenticated(), controller.destroyAnswer);

module.exports = router;

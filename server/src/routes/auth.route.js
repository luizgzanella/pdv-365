'use strict';
const { Router } = require('express');
const controller = require('../controllers/auth.controller');

const router = Router();

router.post('/signup', controller.signup);
router.post('/signin', controller.signin);

module.exports = router;

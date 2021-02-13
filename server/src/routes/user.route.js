'use strict';
const { Router } = require('express');
const controller = require('../controllers/user.controller');

const router = Router();

router.patch('/user/update/:username', controller.updateUser);
router.delete('/user/delete/:username', controller.deleteUser);

module.exports = router;

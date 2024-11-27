const express = require('express');
const router = express.Router();
const authController = require('../controller/AuthController');

router.get('/profile', authController.auth, authController.getProfile);
router.get('/logout', authController.destroySession);

module.exports = router;
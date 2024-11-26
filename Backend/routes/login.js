const express = require('express');
const router = express.Router();
const loginController = require('../controller/LoginController');

router.get('/', loginController.verifyUser);

module.exports = router;
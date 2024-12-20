const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
const { auth } = require('../controller/AuthController');

router.get('/', auth, userController.getAllUsers);
router.get('/get/', userController.getUser);
router.post('/add', userController.addUsers);
router.put('/edit/:id', userController.editUser);
router.delete('/delete/:id', userController.deleteUser);
module.exports = router;
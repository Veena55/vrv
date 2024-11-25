const express = require('express');
const router = express.Router();
const permissionController = require('../controller/PermissionController');

router.get('/', permissionController.getAllPermissions);
router.get('/get/', permissionController.getPermission);
router.post('/add', permissionController.addPermissions);
router.put('/edit/:id', permissionController.editPermission);
router.delete('/delete/:id', permissionController.deletePermission);

module.exports = router;
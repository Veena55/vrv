const express = require('express');
const router = express.Router();
const roleController = require('../controller/RoleController');

router.get('/', roleController.getAllRoles);
router.get('/get/', roleController.getRole);
router.post('/add', roleController.addRoles);
router.put('/edit/:id', roleController.editRole);
router.delete('/delete/:id', roleController.deleteRole);

module.exports = router;
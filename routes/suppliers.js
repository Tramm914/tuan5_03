const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const {ensureAuth} = require('../middleware/auth');
// Danh sách
router.get('/',ensureAuth, supplierController.list);

// Thêm
router.get('/create',ensureAuth, supplierController.createForm);
router.post('/create',ensureAuth, supplierController.create);

// Sửa
router.get('/:id/edit',ensureAuth, supplierController.editForm);
router.post('/:id/edit',ensureAuth, supplierController.update);

// Xóa
router.get('/:id/delete',ensureAuth, supplierController.delete);

module.exports = router;

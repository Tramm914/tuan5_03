const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// Danh sách
router.get('/', supplierController.list);

// Thêm
router.get('/create', supplierController.createPage);
router.post('/create', supplierController.create);

// Sửa
router.get('/edit/:id', supplierController.editPage);
router.post('/edit/:id', supplierController.update);

// Xóa
router.get('/delete/:id', supplierController.delete);

module.exports = router;

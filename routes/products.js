const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Danh sách
router.get('/', productController.list);

// Thêm sản phẩm
router.get('/create', productController.createPage);
router.post('/create', productController.create);

// Sửa sản phẩm
router.get('/edit/:id', productController.editPage);
router.post('/edit/:id', productController.update);

// Xóa sản phẩm
router.get('/delete/:id', productController.delete);

module.exports = router;

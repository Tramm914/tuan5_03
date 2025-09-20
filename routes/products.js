const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {ensureAuth} = require('../middleware/auth');
// Danh sách
router.get('/', productController.list);

// Thêm sản phẩm
router.get('/create',ensureAuth, productController.createForm);
router.post('/create',ensureAuth, productController.create);

// Sửa sản phẩm
router.get('/:id/edit',ensureAuth, productController.editForm);
router.post('/:id/edit',ensureAuth, productController.update);

// Xóa sản phẩm
router.get('/:id/delete',ensureAuth, productController.delete);

module.exports = router;

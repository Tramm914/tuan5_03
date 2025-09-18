const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Đăng ký
router.get('/register', userController.registerPage);
router.post('/register', userController.register);

// Đăng nhập
router.get('/login', userController.loginPage);
router.post('/login', userController.login);

// Đăng xuất
router.get('/logout', userController.logout);

module.exports = router;

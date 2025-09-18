const User = require('../models/User');
const passport = require('passport');

// Trang đăng ký
exports.registerPage = (req, res) => {
  res.render('users/register');
};

// Xử lý đăng ký
exports.register = async (req, res) => {
  const { username, password, email, phone } = req.body;

  try {
    const user = new User({ username, password, email, phone });
    await user.save();
    req.flash('success_msg', 'Đăng ký thành công, hãy đăng nhập!');
    res.redirect('/users/login');
  } catch (err) {
    req.flash('error_msg', 'Lỗi khi đăng ký: ' + err.message);
    res.redirect('/users/register');
  }
};

// Trang đăng nhập
exports.loginPage = (req, res) => {
  res.render('users/login');
};

// Xử lý đăng nhập với Passport
exports.login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
});

// Đăng xuất
exports.logout = (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.flash('success_msg', 'Bạn đã đăng xuất');
    res.redirect('/users/login');
  });
};

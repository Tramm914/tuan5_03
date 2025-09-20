const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { username, password, email, phone } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email, phone });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    res.render('register', { error: 'Đăng ký thất bại!' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.render('login', { error: 'Sai tài khoản hoặc mật khẩu!' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.render('login', { error: 'Sai tài khoản hoặc mật khẩu!' });
    req.session.userId = user._id;
    res.redirect('/');
  } catch (err) {
    res.render('login', { error: 'Đăng nhập thất bại!' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

exports.forgot = (req, res) => {
  res.render('forgot', { message: 'Liên hệ quản trị viên để lấy lại mật khẩu.' });
};
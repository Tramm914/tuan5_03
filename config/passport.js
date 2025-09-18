const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User'); // nhớ import đúng model User

module.exports = function(passport) {
  passport.use(new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: 'Sai tài khoản!' });
      }

      // Ở đây demo kiểm tra password trực tiếp, thực tế nên hash bằng bcrypt
      if (user.password !== password) {
        return done(null, false, { message: 'Sai mật khẩu!' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};

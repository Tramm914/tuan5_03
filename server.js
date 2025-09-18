const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

// Routers
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const suppliersRouter = require('./routes/suppliers');
const indexRouter = require('./routes/index');

// Khởi tạo app
const app = express();

// Passport config
require('./config/passport')(passport);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/tuan5_03', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Body parser
app.use(express.urlencoded({ extended: false }));

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables (để flash và currentUser dùng trong view)
app.use((req, res, next) => {
    res.locals.currentUser = req.user || null;
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error'); // passport error
    next();
});

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/suppliers', suppliersRouter); // chỉ mount 1 lần

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const ensureAuth = (req, res, next) => {
	// Check for session user id (set in authController.login)
	if (req.session && req.session.userId) return next();
	// Fallback: some codebases use req.session.user — accept that too
	if (req.session && req.session.user) return next();

	if (typeof req.flash === 'function') {
		req.flash('error', 'Bạn cần đăng nhập để truy cập');
	}
	return res.redirect('/login');
};

module.exports = {
	ensureAuth,
	isAuthenticated: ensureAuth,
};

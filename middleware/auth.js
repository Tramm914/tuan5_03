module.exports.isAuthenticated = (req,res,next)=>{
if(req.session.user) return next();
req.flash('error','Bạn cần đăng nhập để truy cập');
res.redirect('/login');
}
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

// Danh sách sản phẩm
exports.list = async (req, res) => {
  try {
    const q = req.query.q || '';
    const supplierId = req.query.supplier || '';

    const filter = {};
    if (q) filter.name = { $regex: q, $options: 'i' };
    if (supplierId) filter.supplierId = supplierId;

    const products = await Product.find(filter).populate('supplierId');
    const suppliers = await Supplier.find();

    res.render('products/index', { 
      products, suppliers, q, supplierId, currentUser: req.user || null
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Lỗi khi lấy danh sách sản phẩm');
    res.redirect('/');
  }
};

// Trang thêm sản phẩm
exports.createPage = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render('products/create', { suppliers, success_msg: req.flash('success_msg'), error_msg: req.flash('error_msg') });
};

// Xử lý thêm sản phẩm
exports.create = async (req, res) => {
  const { name, price, quantity, supplierId } = req.body;
  try {
    const product = new Product({ name, price, quantity, supplierId });
    await product.save();
    req.flash('success_msg', 'Thêm sản phẩm thành công');
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Lỗi khi thêm sản phẩm: ' + err.message);
    res.redirect('/products/create');
  }
};

// Trang sửa sản phẩm
exports.editPage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const suppliers = await Supplier.find();
    res.render('products/edit', { product, suppliers, success_msg: req.flash('success_msg'), error_msg: req.flash('error_msg') });
  } catch (err) {
    req.flash('error_msg', 'Không tìm thấy sản phẩm');
    res.redirect('/products');
  }
};

// Xử lý sửa sản phẩm
exports.update = async (req, res) => {
  const { name, price, quantity, supplierId } = req.body;
  try {
    await Product.findByIdAndUpdate(req.params.id, { name, price, quantity, supplierId });
    req.flash('success_msg', 'Cập nhật sản phẩm thành công');
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Lỗi khi cập nhật sản phẩm');
    res.redirect('/products');
  }
};

// Xóa sản phẩm
exports.delete = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Xóa sản phẩm thành công');
    res.redirect('/products');
  } catch (err) {
    req.flash('error_msg', 'Lỗi khi xóa sản phẩm');
    res.redirect('/products');
  }
};

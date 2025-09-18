const Supplier = require('../models/Supplier');

// Hiển thị danh sách nhà cung cấp
exports.list = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.render('suppliers/index', { suppliers });
  } catch (err) {
    req.flash('error_msg', 'Không lấy được danh sách nhà cung cấp');
    res.redirect('/');
  }
};

// Trang thêm mới
exports.createPage = (req, res) => {
  res.render('suppliers/create');
};

// Xử lý thêm mới
exports.create = async (req, res) => {
  const { name, address, phone } = req.body;
  try {
    const supplier = new Supplier({ name, address, phone });
    await supplier.save();
    req.flash('success_msg', 'Thêm nhà cung cấp thành công');
    res.redirect('/suppliers');
  } catch (err) {
    req.flash('error_msg', 'Lỗi khi thêm nhà cung cấp');
    res.redirect('/suppliers/create');
  }
};

// Trang chỉnh sửa
exports.editPage = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    res.render('suppliers/edit', { supplier });
  } catch (err) {
    req.flash('error_msg', 'Không tìm thấy nhà cung cấp');
    res.redirect('/suppliers');
  }
};

// Xử lý chỉnh sửa
exports.update = async (req, res) => {
  const { name, address, phone } = req.body;
  try {
    await Supplier.findByIdAndUpdate(req.params.id, { name, address, phone });
    req.flash('success_msg', 'Cập nhật nhà cung cấp thành công');
    res.redirect('/suppliers');
  } catch (err) {
    req.flash('error_msg', 'Lỗi khi cập nhật nhà cung cấp');
    res.redirect('/suppliers');
  }
};

// Xóa
exports.delete = async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Xóa nhà cung cấp thành công');
    res.redirect('/suppliers');
  } catch (err) {
    req.flash('error_msg', 'Lỗi khi xóa nhà cung cấp');
    res.redirect('/suppliers');
  }
};

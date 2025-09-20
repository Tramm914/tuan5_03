const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');

router.get('/', async (req, res) => {
  const suppliers = await Supplier.find();
  res.render('index', { suppliers });
});

module.exports = router;
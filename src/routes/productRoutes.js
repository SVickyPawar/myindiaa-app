const express = require('express');
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .post(auth, createProduct)
  .get(getProducts);

router.route('/:id')
  .get(getProduct)
  .put(auth, updateProduct)
  .delete(auth, deleteProduct);

module.exports = router;

const express = require('express');
const {
  createOrder,
  getOrder,
  getUserOrders
} = require('../controllers/orderController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .post(auth, createOrder);

router.get('/:id', auth, getOrder);
router.get('/user/orders', auth, getUserOrders);

module.exports = router;

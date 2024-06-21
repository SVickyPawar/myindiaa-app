const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  const { products } = req.body;
  try {
    let totalAmount = 0;
    const productDetails = await Promise.all(products.map(async (item) => {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new Error(`Product with id ${item.product} not found`);
      }
      totalAmount += product.price * item.quantity;
      return {
        product: product._id,
        quantity: item.quantity,
        price: product.price
      };
    }));

    const order = new Order({
      user: req.user.id,
      products: productDetails,
      totalAmount,
      status: 'pending'
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products.product');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('products.product');
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

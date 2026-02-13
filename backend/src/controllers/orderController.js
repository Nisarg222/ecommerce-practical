const { Order, OrderItem, Product, Cart, CartItem } = require('../models');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
    return;
  } else {
    try {
        const order = await Order.create({
            userId: req.user.id,
            shipping_address: shippingAddress,
            total_amount: totalPrice,
            payment_status: 'Paid', // Mock payment
            status: 'Processing'
        });

        // Create Order Items
        const items = orderItems.map(item => ({
            orderId: order.id,
            productId: item.id,
            quantity: item.qty,
            price_at_purchase: item.price
        }));

        await OrderItem.bulkCreate(items);

        res.status(201).json(order);
    } catch(err) {
        console.error(err);
        res.status(500).json({message: 'Order creation failed'});
    }
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
      const order = await Order.findByPk(req.params.id, {
        include: [
            { model: OrderItem, include: [Product] }
        ]
      });
    
      if (order) {
        // Check if admin or owner
        if(req.user.role === 'admin' || req.user.id === order.userId) {
            res.json(order);
        } else {
            res.status(403).json({message: 'Not authorized'});
        }
      } else {
        res.status(404).json({message: 'Order not found'});
      }
  } catch (error) {
      res.status(500).json({message: 'Server Error'});
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
      const orders = await Order.findAll({
          where: { userId: req.user.id },
          include: [{ model: OrderItem, include: [Product] }]
      });
      res.json(orders);
  } catch (error) {
      res.status(500).json({message: 'Server Error'});
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
      const orders = await Order.findAll({
        include: ['User']
      });
      res.json(orders);
  } catch (error) {
      res.status(500).json({message: 'Server Error'});
  }
};

module.exports = {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders,
};

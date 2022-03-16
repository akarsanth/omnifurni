import asyncHandler from "express-async-handler";

import db from "../models/index.js";
const Order = db.order;
const Product = db.product;
const OrderLine = db.orderLine;
const ShippingAddress = db.shippingAddress;

// @desc    Get Order by ID
// @route   GET api/v1/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const userId = req.user.id;

  // try {
  const order = await Order.findOne({
    where: {
      order_id: orderId,
    },

    attributes: {
      exclude: ["shipping_address_id"],
    },

    include: [
      {
        model: Product,
        attributes: ["product_id", "name", "price"],

        through: {
          attributes: ["orderline_id", "quantity"],
        },
      },

      {
        model: ShippingAddress,
      },
    ],
  });

  if (order) {
    if (order.user_id == userId) {
      res.json(order);
    } else {
      throw new Error(
        `The order with the given Order ID: "${orderId}" is not yours!`
      );
    }
  } else {
    throw new Error(`Order with the given Order ID: "${orderId}" not found!`);
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.findAll({
      where: {
        user_id: userId,
      },

      attributes: {
        exclude: ["user_id", "shipping_address_id"],
      },
    });

    res.json(orders);
  } catch (error) {
    throw new Error("Could not get your orders. Try again!");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  try {
    const { orderItems, total_amount, shippingAddress } = req.body;
    const {
      city,
      postalCode,
      streetAddress,
      province,
      firstName,
      lastName,
      contactNumber,
      email,
    } = shippingAddress;

    const userId = req.user.id;

    // First create new shipping address
    const newShippingAddress = {
      city,
      postal_code: postalCode,
      street: streetAddress,
      province,
      first_name: firstName,
      last_name: lastName,
      contact_number: contactNumber,
      email,
    };
    const createdShippingAddress = await ShippingAddress.create(
      newShippingAddress
    );

    // Create Order
    const newOrder = {
      total_amount,
      is_paid: 0,
      is_delivered: 0,
      user_id: userId,
      shipping_address_id: createdShippingAddress.shipping_address_id,
      status: "Payment Pending",
    };
    const createdOrder = await Order.create(newOrder);

    // Order Line
    const newOrderItems = orderItems.map((item) => {
      return {
        order_id: createdOrder.order_id,
        product_id: item.product_id,
        quantity: item.qty,
      };
    });

    console.log(newOrderItems);

    await OrderLine.bulkCreate(newOrderItems);

    res.status(201).json(createdOrder);
  } catch (error) {
    throw new Error("Could not create the order. Try again!");
  }
});

// @desc    To update payment status (after user makes payment)
// @route   PUT /api/orders/:id/pay
// @access  Private
const updatePayment = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const { payment_method, is_paid } = req.body;
  const order = await Order.findByPk(orderId);

  if (order) {
    order.payment_method = payment_method;
    order.is_paid = is_paid ? is_paid : order.is_paid;
    order.paid_at = is_paid ? Date.now() : order.paid_at;
    order.status = "Order Completed";

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

export { getOrderById, getMyOrders, createOrder, updatePayment };

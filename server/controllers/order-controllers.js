import asyncHandler from "express-async-handler";

import db from "../models/index.js";
const { Op } = db.Sequelize;

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
        attributes: ["product_id"],

        through: {
          attributes: [
            "orderline_id",
            "quantity",
            "line_total",
            "name",
            "price",
          ],
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
// @route   GET /api/v1/orders/myorders
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

      order: [["createdAt", "DESC"]],

      include: [
        {
          model: Product,
          attributes: ["product_id", "name", "price"],

          through: {
            attributes: ["orderline_id", "quantity"],
          },
        },
      ],
    });

    res.json(orders);
  } catch (error) {
    throw new Error("Could not get your orders. Try again!");
  }
});

// @desc    To create order
// @route   POST /api/v1/orders
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
        name: item.name,
        price: item.price,
        quantity: item.qty,
        line_total: item.qty * item.price,
      };
    });

    await OrderLine.bulkCreate(newOrderItems);

    // Updating stock
    for (const item of newOrderItems) {
      const product = await Product.findOne({
        where: {
          product_id: item.product_id,
        },
      });

      if (product) {
        product.countInStock -= item.quantity;

        await product.save();
      }
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    throw new Error("Could not create the order. Try again!");
  }
});

// @desc    To update payment status (after user selects payment method)
// @route   PUT /api/v1/orders/:id/pay
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

// @desc    To cancel order
// @route   PUT /api/v1/orders/:id/cancel
// @access  Private
const cancelOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findByPk(orderId);

  if (order) {
    order.status = "Cancelled";

    const updatedOrder = await order.save();

    // Changing stock
    const orderStock = await Order.findOne({
      where: {
        order_id: orderId,
      },

      attributes: [],

      // include
      include: [
        {
          model: Product,
          attributes: ["product_id"],

          through: {
            attributes: ["quantity"],
          },
        },
      ],
    });

    const { products } = orderStock;

    // Updating stock
    for (const item of products) {
      const product = await Product.findOne({
        where: {
          product_id: item.product_id,
        },
      });

      if (product) {
        product.countInStock += item.order_line.quantity;

        await product.save();
      }
    }

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

////////////////////////////////////////////////////////
// Admin
////////////////////////////////////////////////////////

// @desc    Get all orders
// @route   PUT /api/orders
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.findAll({
    where: {
      createdAt: {
        [Op.and]: {
          [Op.gte]: req.params.from,
          [Op.lte]: req.params.to,
        },
      },
    },

    attributes: {
      exclude: ["shipping_address_id"],
    },

    order: [["createdAt", "DESC"]],

    include: [
      {
        model: Product,
        attributes: ["product_id", "name"],

        through: {
          attributes: ["orderline_id", "quantity", "line_total"],
        },
      },

      {
        model: ShippingAddress,
      },
    ],
  });

  if (orders) {
    res.json(orders);
  } else {
    throw new Error(`Orders could not fetched!`);
  }
});

// @desc    To update order
// @route   PUT /api/v1/orders/:id
// @access  Private
const updateOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  const order = await Order.findByPk(orderId);

  if (order) {
    if (status === "Delivered") {
      order.is_delivered = 1;
      order.delivered_at = Date.now();

      if (order.payment_method === "COD") {
        order.is_paid = 1;
        order.paid_at = Date.now();
      }

      order.status = status;
    }

    if (status === "Cancelled") {
      order.status = status;

      // Changing stock
      const orderStock = await Order.findOne({
        where: {
          order_id: orderId,
        },

        attributes: [],

        // include
        include: [
          {
            model: Product,
            attributes: ["product_id"],

            through: {
              attributes: ["quantity"],
            },
          },
        ],
      });

      const { products } = orderStock;

      // Updating stock
      for (const item of products) {
        const product = await Product.findByPk(item.product_id);

        if (product) {
          product.countInStock += item.order_line.quantity;

          await product.save();
        }
      }
    }

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

export {
  getOrderById,
  getMyOrders,
  createOrder,
  updatePayment,
  cancelOrder,
  getOrders,
  updateOrder,
};

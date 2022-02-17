import asyncHandler from "express-async-handler";

import db from "../models/index.js";
const Order = db.order;
const Product = db.product;
const OrderLine = db.orderLine;

// @desc    Fetch all orders
// @route   GET api/v1/orders
// @access  Protected (admin)

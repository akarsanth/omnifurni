import express from "express";
const router = express.Router();

import {
  getOrderById,
  getMyOrders,
  createOrder,
  updatePayment,
  cancelOrder,
  getOrders,
  updateOrder,
} from "../controllers/order-controllers.js";

import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";

// Routes
router.get("/myorders", auth, getMyOrders);
router.get("/:id", auth, getOrderById);

router.post("/", auth, createOrder);

router.put("/:id/pay", auth, updatePayment);

router.put("/:id/cancel", auth, cancelOrder);

// Admin
router.get("/:from/:to", auth, authAdmin, getOrders);
router.put("/:id", auth, authAdmin, updateOrder);
// router.route("/:id/pay").put(auth, updateOrderToPaid);
// router.route("/:id/deliver").put(auth, authAdmin, updateOrderToDelivered);

export default router;

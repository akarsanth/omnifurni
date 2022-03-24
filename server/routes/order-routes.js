import express from "express";
const router = express.Router();

import {
  getOrderById,
  getMyOrders,
  createOrder,
  updatePayment,
  getOrders,
} from "../controllers/order-controllers.js";

import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";

// Routes
router.get("/myorders", auth, getMyOrders);
router.get("/:id", auth, getOrderById);

router.post("/", auth, createOrder);

router.put("/:id/pay", auth, updatePayment);

// Admin
router.get("/:from/:to", auth, authAdmin, getOrders);
// router.route("/:id/pay").put(auth, updateOrderToPaid);
// router.route("/:id/deliver").put(auth, authAdmin, updateOrderToDelivered);

export default router;

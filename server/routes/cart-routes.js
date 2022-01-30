import express from "express";
const router = express.Router();

import { getCartItems } from "../controllers/cart-controllers.js";

import auth from "../middlewares/auth.js";

router.get("/", auth, getCartItems);

export default router;

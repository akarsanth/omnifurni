import express from "express";
const router = express.Router();

// imporint routes
import authRoutes from "./auth-routes.js";
import productRoutes from "./product-routes.js";
import categoryRoutes from "./category-routes.js";
import cartRoutes from "./cart-routes.js";

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/cart", cartRoutes);

export default router;

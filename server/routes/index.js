import express from "express";
const router = express.Router();

// imporint routes
import userRoutes from "./user-routes.js";
import productRoutes from "./product-routes.js";
import categoryRoutes from "./category-routes.js";
import cartRoutes from "./cart-routes.js";
import uploadRoutes from "./upload-routes.js";
import orderRoutes from "./order-routes.js";

router.use("/user", userRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/cart", cartRoutes);
router.use("/upload", uploadRoutes);
router.use("/order", orderRoutes);

export default router;

import express from "express";
const router = express.Router();

import {
  findAllFeaturedProducts,
  findProductById,
  createProductReview,
  findAllProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../controllers/product-controllers.js";

import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";

// routers
// What are the advantages of using router.route.get over router.get?
// https://expressjs.com/en/api.html#router.route
router.route("/featured").get(findAllFeaturedProducts);

router.route("/:id").get(findProductById);

// reviews
router.post("/:id/reviews", auth, createProductReview);

// Admin
router.get("/", auth, authAdmin, findAllProducts);
router.post("/", auth, authAdmin, createProduct);
router.delete("/:id", auth, authAdmin, deleteProduct);
router.put("/:id", auth, authAdmin, updateProduct);

export default router;

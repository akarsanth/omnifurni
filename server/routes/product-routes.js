import express from "express";
const router = express.Router();

import {
  findAllFeaturedProducts,
  findProductById,
  deleteProduct,
  createProduct,
  createProductReview,
} from "../controllers/product-controllers.js";

import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";

// routers
// What are the advantages of using router.route.get over router.get?
// https://expressjs.com/en/api.html#router.route
router.route("/featured").get(findAllFeaturedProducts);

router.route("/").post(createProduct);

router.route("/:id").get(findProductById);

router.route("/:id").delete(deleteProduct);

// reviews
router.post("/:id/reviews", auth, createProductReview);

export default router;

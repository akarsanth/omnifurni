import express from "express";
const router = express.Router();

import {
  findAllCategories,
  findCategoryById,
  deleteCategory,
} from "../controllers/category-controllers.js";

import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";

router.route("/").get(findAllCategories);
router.route("/:id").get(findCategoryById);

// Admin
router.delete("/:id", auth, authAdmin, deleteCategory);

export default router;

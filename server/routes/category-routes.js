import express from "express";
const router = express.Router();

import {
  findAllCategories,
  findCategoryById,
} from "../controllers/category-controllers.js";

router.route("/").get(findAllCategories);
router.route("/:id").get(findCategoryById);

export default router;

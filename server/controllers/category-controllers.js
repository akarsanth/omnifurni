import asyncHandler from "express-async-handler";

import db from "../models/index.js";
const Category = db.category;

const findAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.findAll();

  res.json(categories);
});

const findCategoryById = asyncHandler(async (req, res) => {});

export { findAllCategories, findCategoryById };

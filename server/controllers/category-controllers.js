import asyncHandler from "express-async-handler";

import db from "../models/index.js";
const Category = db.category;
const Product = db.product;

// @desc    Fetch all categories
// @route   GET api/v1/categories
// @access  Public (anything can hit it)
const findAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.findAll();

  res.json(categories);
});

// @desc    To get user info
// @route   GET /api/v1/categories/:id
// @access  Protected
const findCategoryById = asyncHandler(async (req, res) => {});

// @desc    To delete category by id
// @route   DELETE /api/v1/categories/:id
// @access  Protected
const deleteCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  // Checking if there is category
  const category = await Category.findByPk(categoryId);

  if (category) {
    // Checking if there is product with the category
    const product = await Product.findOne({
      where: {
        category_id: categoryId,
      },
    });

    if (product) {
      res.status(500);
      throw new Error("There are product(s) under this category");
    } else {
      await category.destroy();
      res.json({ message: "Category deleted successfully" });
    }
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

export { findAllCategories, findCategoryById, deleteCategory };

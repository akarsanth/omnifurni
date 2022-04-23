import asyncHandler from "express-async-handler";

import db from "../models/index.js";
const Category = db.category;
const Product = db.product;

// @desc    Fetch all categories
// @route   GET api/v1/categories
// @access  Public (anything can hit it)
const findAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    throw new Error("Error while fetching products!");
  }
});

// @desc    To get user info
// @route   GET /api/v1/categories/:id
// @access  Protected
const findCategoryById = asyncHandler(async (req, res) => {});

///////////////////////////////////////////
// Admin

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

// @desc    To create new category
// @route   POST /api/v1/categories
// @access  Protected
const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name, description, imagePath } = req.body;

    const category = {
      name,
      description,
      imagePath,
    };

    const createdCategory = await Category.create(category);

    res.status(201).json({
      message: "Category created Successfully",
      createdCategory,
    });
  } catch (err) {
    res.status(500);
    throw new Error("Category could not be created at this moment. Try Again!");
  }
});

// @desc    To update category by id
// @route   PUT /api/v1/categories/:id
// @access  Protected
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name, description, imagePath } = req.body;

    const category = await Category.findByPk(req.params.id);

    if (category) {
      category.name = name || category.name;
      category.description = description || category.description;
      category.imagePath = imagePath || category.imagePath;
    }

    const updatedCategory = await category.save();

    res.json({
      message: "Category updated successfully",
      updatedCategory,
    });
  } catch (err) {
    res.status(500);
    throw new Error("Category could not be updated at this moment. Try Again!");
  }
});

export {
  findAllCategories,
  findCategoryById,
  deleteCategory,
  createCategory,
  updateCategory,
};

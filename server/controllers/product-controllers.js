import asyncHandler from "express-async-handler";

import db from "../models/index.js";
const Product = db.product;
const Category = db.category;
const Review = db.review;
const User = db.user;
const Op = db.Sequelize.Op;

// @desc    Fetch all featured products
// @route   GET api/v1/products
// @access  Public (anything can hit it)
const findAllFeaturedProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.findAll({ where: { featured: 1 } });
    res.json(products);
  } catch (error) {
    res.status(500);
    throw new Error("Error retrieving product details!");
  }
});

// @desc    Fetch product by ID
// @route   GET /api/v1/products/:id
// @access  Public
// const findProductById = asyncHandler(async (req, res) => {
//   const productId = req.params.id;

//   try {
//     let product = await Product.findByPk(productId);

//     // if product is found
//     // if id is formatted validly
//     if (product) {
//       // category of the product
//       let category = await Category.findByPk(product.toJSON().category_id);

//       let reviews = await Review.findAll({
//         where: { product_id: product.product_id },
//       });

//       // updating product with category name
//       const productUpdated = {
//         ...product.toJSON(),
//         category_name: category.toJSON().name,
//         reviews: reviews,
//       };
//       return res.json(productUpdated);
//     } else {
//       // not found error code
//       res.status(404);
//       throw new Error("Cannot find the product!");
//     }
//   } catch (error) {
//     // res.status(500);
//     throw new Error("Error retrieving product!");
//   }
// });
const findProductById = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findOne({
    where: {
      product_id: productId,
    },
    attributes: { exclude: ["category_id"] },
    include: [
      {
        model: Category,
        required: true,
        attributes: ["category_id", "name"],
      },

      {
        model: Review,
        attributes: { exclude: ["user_id"] },
        include: {
          model: User,
          attributes: ["user_id", "first_name", "last_name"],
        },
      },
    ],
  });

  // // if product is found
  // // if id is formatted validly
  if (product) {
    return res.json(product);
  } else {
    // not found error code
    res.status(404);
    throw new Error("Cannot find the product!");
  }
});

// @desc    Get search products
// @route   GET /api/v1/products/search?keyword=[keyword]
// @access  Public
const getSearchedProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword.toLowerCase();

  // Pagination
  const pageSize = parseInt(req.query.pageSize);
  const page = req.query.page;

  const count = await Product.count({
    where: {
      name: {
        [Op.like]: `%${keyword}%`,
      },
    },
  });

  const matchedProducts = await Product.findAll({
    where: {
      name: {
        [Op.like]: `%${keyword}%`,
      },
    },

    limit: pageSize,
    offset: pageSize * (page - 1),
  });

  res.json({ matchedProducts, pages: Math.ceil(count / pageSize) });
});

// @desc    Find product by catetory
// @route   GET /api/v1/products/category/:id?page=[page]
// @access  Public
const findProductsByCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  // Pagination
  const pageSize = parseInt(req.query.pageSize);
  const page = req.query.page;

  const count = await Product.count({
    where: {
      category_id: categoryId,
    },
  });

  const products = await Product.findAll({
    where: {
      category_id: categoryId,
    },
    limit: pageSize,
    offset: pageSize * (page - 1),
  });

  // // if product is found
  // // if id is formatted validly
  if (products) {
    return res.json({ products, pages: Math.ceil(count / pageSize) });
  } else {
    // not found error code
    res.status(404);
    throw new Error("Could not fetch the products!");
  }
});

// reviews
// @desc    Get product reviews
// @route   GET /api/v1/products/:id/reviews
// @access  Private
// const findProductReviews = asyncHandler(async (req, res) => {
//   // const createdProduct = await Product.create(product);
//   // res.status(201).json(createdProduct);

//   const reviews = await Review.findAll({
//     where: { product_id: req.params.id },
//     include: {
//       model: User,
//       attributes: ["user_id", "first_name", "last_name"],
//     },
//   });

//   res.json(reviews);
// });

// @desc    Create product review
// @route   POST /api/v1/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  // review object
  const review = {
    rating: parseFloat(rating),
    comment,
    product_id: req.params.id,
    user_id: req.user.id,
  };
  // To create review
  const createdReview = await Review.create(review);

  // To update numReviews and rating of the corresponding product
  const product = await Product.findByPk(req.params.id, {
    include: {
      model: Review,
    },
  });
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce(
      (acc, product) => parseFloat(product.rating) + acc,
      0
    ) / product.reviews.length;

  await product.save();

  // created review
  res.status(201).json(createdReview);
});

////////////////////////////////
// Admin

// @desc    Fetch all products
// @route   GET api/v1/products
// @access  Protected/Admin
const findAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: [
        "product_id",
        "name",
        "description",
        "price",
        "imagePath",
        "countInStock",
        "user_id",
        "category_id",
        "featured",
        [db.sequelize.col("category.name"), "category_name"],
      ],

      order: [["createdAt", "DESC"]],

      include: {
        model: Category,
        as: "category",
        attributes: [],
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500);
    throw new Error("Error retrieving product details!");
  }
});

// @desc    Delete a product
// @route   DELETE /api/v1/products/:id
// @access  Protected/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  try {
    const num = await Product.destroy({ where: { product_id: productId } });

    if (num == 1) {
      res.json({ message: "Product removed succesfully!" });
    } else {
      res.status(500);
      throw new Error("Product could not be found!");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

// @desc    Create a product
// @route   POST /api/v1/products
// @access  Protected/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    imagePath,
    countInStock,
    category_id,
    featured,
  } = req.body;

  const product = {
    name,
    description,
    price,
    imagePath,
    countInStock,
    category_id,
    user_id: req.user.id,
    featured,
  };

  const newProduct = await Product.create(product);

  // Adding category info
  const createdProduct = await Product.findByPk(newProduct.product_id, {
    attributes: [
      "product_id",
      "name",
      "description",
      "price",
      "imagePath",
      "countInStock",
      "user_id",
      "category_id",
      "featured",
      [db.sequelize.col("category.name"), "category_name"],
    ],

    include: {
      model: Category,
      as: "category",
      attributes: [],
    },
  });

  res.status(201).json({
    message: "Product created Successfully",
    createdProduct,
  });
});

// @desc    To update product by id
// @route   PUT /api/v1/products/:id
// @access  Protected/Admin
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      imagePath,
      countInStock,
      category_id,
      featured,
    } = req.body;

    const product = await Product.findByPk(req.params.id);

    if (product) {
      product.name = name;
      product.description = description;
      product.price = price;
      (product.imagePath = imagePath), (product.countInStock = countInStock);
      product.category_id = category_id;
      product.featured = featured;
    }

    const editedProduct = await product.save();

    // Adding category info
    const updatedProduct = await Product.findByPk(editedProduct.product_id, {
      attributes: [
        "product_id",
        "name",
        "description",
        "price",
        "imagePath",
        "countInStock",
        "user_id",
        "category_id",
        "featured",
        [db.sequelize.col("category.name"), "category_name"],
      ],

      include: {
        model: Category,
        as: "category",
        attributes: [],
      },
    });

    res.json({
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (err) {
    res.status(500);
    throw new Error(
      "Error occured while trying to update the product. Try Again!"
    );
  }
});

export {
  findAllFeaturedProducts,
  findProductById,
  getSearchedProducts,
  findProductsByCategory,
  createProductReview,
  findAllProducts,
  deleteProduct,
  createProduct,
  updateProduct,
};

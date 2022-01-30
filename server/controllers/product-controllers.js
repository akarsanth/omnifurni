import asyncHandler from "express-async-handler";

import db from "../models/index.js";
const Product = db.product;
const Category = db.category;
const Review = db.review;
const User = db.user;

// @desc   Fetch all products
// @route  GET api/v1/products
// @access Public (anything can hit it)
const findAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.findAll();
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

  try {
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
  } catch (error) {
    res.status(500);
    throw new Error("Error retrieving product!");
  }
});

// @desc    Delete a product
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  try {
    const num = await Product.destroy({ where: { product_id: productId } });
    console.log(num);

    if (num == 1) {
      res.json({ message: "Product removed succesfully!" });
    } else {
      res.json({ message: "Product could not be found!" });
    }
  } catch (error) {
    res.status(500);
    throw new Error(
      "Error while deleting product. Maybe the product id is invalid!"
    );
  }
});

// @desc    Create a product
// @route   POST /api/v1/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = {
    name: "Sample name",
    description: "Sample description",
    price: 0,
    // user: req.user._id,
    user_id: 28,
    imagePath: "/images/sample.jpg",
    countInStock: 0,
    numReviews: 0,
    rating: 0,
    category_id: null,
  };

  const createdProduct = await Product.create(product);
  res.status(201).json(createdProduct);
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

export {
  findAllProducts,
  findProductById,
  deleteProduct,
  createProduct,
  createProductReview,
};

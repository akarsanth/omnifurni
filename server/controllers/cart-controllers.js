import asyncHandler from "express-async-handler";

import db from "../models/index.js";
const Cart = db.cart;
const CartLine = db.cartLine;
const Product = db.product;

const getCartItems = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({
      where: {
        user_id: userId,
      },
    });

    let cartData;
    const fetch = async () => {
      cartData = await Cart.findOne({
        where: {
          user_id: userId,
        },
        include: {
          model: Product,
          attributes: {
            exclude: ["user_id", "category_id", "numReviews", "rating"],
          },

          through: {
            attributes: ["cartline_id", "quantity"],
          },
        },
      });

      res.json(cartData);
    };

    if (cart) {
      fetch();
    } else {
      await Cart.create({ user_id: userId });
      fetch();
    }
  } catch (error) {
    throw new Error(error);
  }
});

export { getCartItems };

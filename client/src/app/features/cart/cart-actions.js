import axios from "axios";
import localForage from "localforage";

import {
  replaceCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
} from "./cart-slice";
import { updateSuccessMessage } from "../message/message-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    // const cartItemsFromStorage = localStorage.getItem("cartItems")
    //   ? JSON.parse(localStorage.getItem("cartItems"))
    //   : [];

    const cartItemsFromStorage = (await localForage.getItem("cartItems"))
      ? await localForage.getItem("cartItems")
      : [];

    dispatch(replaceCart(cartItemsFromStorage));
  };
};

export const addToCart = (item) => async (dispatch, getState) => {
  dispatch(addItemToCart(item));

  // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  await localForage.setItem("cartItems", getState().cart.cartItems);

  dispatch(updateSuccessMessage("Product added to cart successfully!"));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch(removeItemFromCart(id));

  await localForage.setItem("cartItems", getState().cart.cartItems);

  dispatch(updateSuccessMessage("Product removed from cart successfully!"));
};

export const updateQuantity = (id, qty) => async (dispatch, getState) => {
  dispatch(updateItemQuantity({ id, qty }));

  await localForage.setItem("cartItems", getState().cart.cartItems);
};

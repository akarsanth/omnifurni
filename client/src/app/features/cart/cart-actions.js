import localForage from "localforage";

import {
  replaceCart,
  addItemToCart,
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
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

export const increaseQuantity = (id) => async (dispatch, getState) => {
  dispatch(increaseItemQuantity({ id }));

  await localForage.setItem("cartItems", getState().cart.cartItems);
};

export const decreaseQuantity = (id, qty) => async (dispatch, getState) => {
  dispatch(decreaseItemQuantity({ id, qty }));

  await localForage.setItem("cartItems", getState().cart.cartItems);
};

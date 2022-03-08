import { createSlice } from "@reduxjs/toolkit";
import localForage from "localforage";

////////////////////////////////////

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalQuantity: 0,
    total: 0,
  },

  reducers: {
    updateCart(state) {
      state.totalQuantity = state.cartItems.reduce(
        (acc, item) => acc + item.qty,
        0
      );

      state.total = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
    },

    // In the beginning
    replaceCart(state, action) {
      const cartItems = action.payload;

      // products state
      state.cartItems = cartItems;
      // total quantity calculation
      state.totalQuantity = cartItems.reduce((acc, item) => acc + item.qty, 0);

      state.total = cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
    },

    addItemToCart(state, action) {
      const addedItem = action.payload;

      // checking if item already exists
      // set in the console if necessary
      const existsItem = state.cartItems.find(
        (item) => item.product_id === addedItem.product_id
      );

      if (existsItem) {
        state.cartItems = state.cartItems.map((item) =>
          item.product_id === existsItem.product_id ? addedItem : item
        );
      } else {
        state.cartItems = [...state.cartItems, addedItem];
      }

      state.totalQuantity = state.cartItems.reduce(
        (acc, item) => acc + item.qty,
        0
      );

      state.total = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
    },

    removeItemFromCart(state, action) {
      const productId = action.payload;

      state.cartItems = state.cartItems.filter(
        (item) => item.product_id !== productId
      );

      //
      state.totalQuantity = state.cartItems.reduce(
        (acc, item) => acc + item.qty,
        0
      );

      state.total = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
    },

    updateItemQuantity(state, action) {
      const productId = action.payload.id;
      const newQuantity = action.payload.qty;

      state.cartItems = state.cartItems.map((item) => {
        if (item.product_id === productId) {
          item.qty = newQuantity;
        }
        return item;
      });

      //
      state.totalQuantity = state.cartItems.reduce(
        (acc, item) => acc + item.qty,
        0
      );

      state.total = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
    },
  },
});

export const {
  replaceCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;

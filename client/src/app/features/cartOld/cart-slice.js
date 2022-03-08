import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartId: null,
    products: [],
    totalQuantity: 0,
    total: 0,
  },

  reducers: {
    replaceCart(state, action) {
      const products = action.payload.products;

      state.cartId = action.payload.cart_id;
      // products state
      state.products = products;
      // total quantity calculation
      state.totalQuantity = products.reduce(
        (acc, product) => acc + product.cart_line.quantity,
        0
      );
    },
  },
});

export const { replaceCart } = cartSlice.actions;

export default cartSlice.reducer;

//https://javascript.plainenglish.io/lets-add-a-shopping-cart-feature-in-vue-js-for-our-ecommerce-app-ae0cc65374ff
// cart needs to be protected

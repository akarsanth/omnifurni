import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  products: [],
};

export const productListSlice = createSlice({
  name: "productList",
  initialState: initialState,

  reducers: {
    productListRequest(state) {
      state.isLoading = true;
    },

    productListSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
      state.error = null;
    },

    productListFail(state, action) {
      state.isLoading = false;
      state.products = [];
      state.error = action.payload;
    },
  },
});

export const { productListRequest, productListSuccess, productListFail } =
  productListSlice.actions;

export default productListSlice.reducer;

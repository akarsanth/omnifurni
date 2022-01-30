import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  categories: [],
};

export const categoryListSlice = createSlice({
  name: "categoryList",
  initialState: initialState,

  reducers: {
    categoryListRequest(state) {
      state.isLoading = true;
    },

    categoryListSuccess(state, action) {
      state.isLoading = false;
      state.categories = action.payload;
      state.error = null;
    },

    categoryListFail(state, action) {
      state.isLoading = false;
      state.categories = [];
      state.error = action.payload;
    },
  },
});

export const { categoryListRequest, categoryListSuccess, categoryListFail } =
  categoryListSlice.actions;

export default categoryListSlice.reducer;

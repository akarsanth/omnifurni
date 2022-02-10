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

    updateCategoryList(state, action) {
      state.categories = action.payload;
    },

    categoryDeleted(state, action) {
      const categoryId = action.payload;

      const updatedList = state.categories.filter(
        (category) => category.category_id !== categoryId && category
      );

      state.categories = [...updatedList];
    },
  },
});

export const {
  categoryListRequest,
  categoryListSuccess,
  categoryListFail,
  updateCategoryList,
  categoryDeleted,
} = categoryListSlice.actions;

export default categoryListSlice.reducer;

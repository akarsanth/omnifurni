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

    categoryEdited(state, action) {
      const editedCategory = action.payload;

      const newList = state.categories.map((category) =>
        category.category_id !== editedCategory.category_id
          ? category
          : editedCategory
      );

      state.categories = newList;
    },

    categoryAdded(state, action) {
      const addedCategory = action.payload;

      state.categories = [...state.categories, addedCategory];
    },
  },
});

export const {
  categoryListRequest,
  categoryListSuccess,
  categoryListFail,
  updateCategoryList,
  categoryDeleted,
  categoryEdited,
  categoryAdded,
} = categoryListSlice.actions;

export default categoryListSlice.reducer;

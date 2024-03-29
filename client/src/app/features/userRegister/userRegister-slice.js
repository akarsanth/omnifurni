import { createSlice } from "@reduxjs/toolkit";

const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState: {
    isLoading: false,
    error: null,
    successMessage: null,
  },

  reducers: {
    userRegisterRequest(state) {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    },

    userRegisterSuccess(state, action) {
      state.isLoading = false;
      state.successMessage = action.payload;
      state.error = null;
    },

    userRegisterFail(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.successMessage = null;
    },
  },
});

// user registration actions
export const { userRegisterRequest, userRegisterSuccess, userRegisterFail } =
  userRegisterSlice.actions;

// exporting user register reducers
export default userRegisterSlice.reducer;

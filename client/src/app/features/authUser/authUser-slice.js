import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  message: null,
  isAuthenticated: null,
  userInfo: null,
};

const authUserSlice = createSlice({
  name: "authUser",
  initialState: initialState,

  reducers: {
    userAuthRequest(state) {
      state.isLoading = true;
    },

    userAuthSuccess(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.error = null;
    },

    userAuthFail(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.message = null;
    },

    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },

    setUserInfo(state, action) {
      state.userInfo = action.payload.user;
      state.userInfo.isAdmin = action.payload.isAdmin;
    },

    updateUserInfo(state, action) {
      const { firstName, lastName, contactNumber } = action.payload;

      state.userInfo.first_name = firstName;
      state.userInfo.last_name = lastName;
      state.userInfo.contact_number = contactNumber;
    },

    addAddress(state, action) {
      state.userInfo.default_address = action.payload;
    },

    editAddress(state, action) {
      state.userInfo.default_address = action.payload;
    },
  },
});

export const {
  userAuthRequest,
  userAuthSuccess,
  userAuthFail,
  setIsAuthenticated,
  setUserInfo,
  updateUserInfo,
  addAddress,
  editAddress,
  setIsLoginRequired,
} = authUserSlice.actions;

export default authUserSlice.reducer;

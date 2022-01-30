import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  message: null,
  isAuthenticated: false,
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
  },
});

export const {
  userAuthRequest,
  userAuthSuccess,
  userAuthFail,
  setIsAuthenticated,
  setUserInfo,
} = authUserSlice.actions;

export default authUserSlice.reducer;

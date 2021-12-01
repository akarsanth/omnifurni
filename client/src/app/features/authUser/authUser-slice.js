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
      state.message = null;
      state.error = null;
    },

    userAuthSuccess(state, action) {
      // console.log("In success");
      state.isLoading = false;
      state.message = action.payload;
      state.error = null;
    },

    userAuthFail(state, action) {
      console.log(action.payload);
      state.isLoading = false;
      state.error = action.payload;
      state.message = null;
    },

    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },

    setUserInfo(state, action) {
      state.userInfo = action.payload;
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

// exporting auth user reducers
export default authUserSlice.reducer;

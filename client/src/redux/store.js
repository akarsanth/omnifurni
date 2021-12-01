import { configureStore } from "@reduxjs/toolkit";

// importing reducer slices
import userReducer from "./userSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;

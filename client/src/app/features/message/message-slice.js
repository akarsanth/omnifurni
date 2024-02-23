import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  success: null,
  info: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState: initialState,

  reducers: {
    updateSuccessMessage(state, action) {
      state.success = action.payload;
      state.error = null;
      state.info = null;
    },

    updateInfoMessage(state, action) {
      state.info = action.payload;
      state.success = null;
      state.error = null;
    },

    updateErrorMessage(state, action) {
      state.success = null;
      state.info = null;
      state.error = action.payload;
    },

    resetMessageState(state) {
      state.success = null;
      state.error = null;
      state.info = null;
    },
  },
});

export const {
  updateSuccessMessage,
  updateInfoMessage,
  updateErrorMessage,
  resetMessageState,
} = messageSlice.actions;

export default messageSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  success: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState: initialState,

  reducers: {
    updateSuccessMessage(state, action) {
      state.success = action.payload;
      state.error = null;
    },

    updateErrorMessage(state, action) {
      state.success = null;
      state.error = action.payload;
    },

    resetMessageState(state) {
      state.success = null;
      state.error = null;
    },
  },
});

export const { updateSuccessMessage, updateErrorMessage, resetMessageState } =
  messageSlice.actions;

export default messageSlice.reducer;

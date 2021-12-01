import { createSlice } from "@reduxjs/toolkit";

import { userRegisterReducer } from "../reducers/user-reducers";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "John",
  },

  reducers: {},
});

import { configureStore } from "@reduxjs/toolkit";

// importing reducers
import userRegisterReducer from "./features/userRegister/userRegister-slice";
import authUserReducer from "./features/authUser/authUser-slice";

const store = configureStore({
  reducer: { userRegister: userRegisterReducer, authUser: authUserReducer },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";

// importing reducers
import userRegisterReducer from "./features/userRegister/userRegister-slice";
import authUserReducer from "./features/authUser/authUser-slice";
import tokenReducer from "./features/token/token-slice";

// product related
import productListReducer from "./features/products/productList-slice";

// category related
import categoryListReducer from "./features/category/categoryList-slice";

// cart
import cartReducer from "./features/cart/cart-slice";

const store = configureStore({
  reducer: {
    // user login and register
    userRegister: userRegisterReducer,
    authUser: authUserReducer,
    token: tokenReducer,

    // product related
    productList: productListReducer,

    // category related
    categoryList: categoryListReducer,

    // cart related
    cart: cartReducer,
  },
});

export default store;

import axios from "axios";

// Actions from slice file
import {
  productListRequest,
  productListSuccess,
  productListFail,
} from "./productList-slice";

export const getFeaturedProductList = () => {
  return async (dispatch) => {
    try {
      dispatch(productListRequest());

      const { data } = await axios.get("/api/v1/products/featured");

      dispatch(productListSuccess(data));
    } catch (error) {
      // the error is first handled in
      // custom error handler in errorMiddlewares.js
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(productListFail(errorMessage));
    }
  };
};

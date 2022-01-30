import axios from "axios";

import {
  categoryListRequest,
  categoryListSuccess,
  categoryListFail,
} from "./categoryList-slice";

export const getCategoryList = () => {
  return async (dispatch) => {
    try {
      dispatch(categoryListRequest());

      const { data } = await axios.get("/api/v1/categories");

      dispatch(categoryListSuccess(data));
    } catch (error) {
      // the error is first handled in
      // custom error handler in errorMiddlewares.js
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(categoryListFail(errorMessage));
    }
  };
};

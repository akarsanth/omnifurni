import { setToken } from "./token-slice";

import axios from "axios";

export const getToken = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/v1/user/refreshToken", null);

      dispatch(setToken(data.accessToken));
    } catch (error) {
      // the error is first handled in
      // custom error handler in errorMiddlewares.js
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      // dispatch(userAuthFail(errorMessage));

      localStorage.removeItem("firstLogin");
    }
  };
};

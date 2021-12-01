import {
  userAuthRequest,
  userAuthSuccess,
  userAuthFail,
} from "./authUser-slice";

// importing axios
import axios from "axios";
import { userRegisterSuccess } from "../userRegister/userRegister-slice";

export const authUser = (loginDetails) => {
  return async (dispatch) => {
    const { email, password } = loginDetails;

    try {
      dispatch(userAuthRequest());
      console.log("after user auth request");

      // req body configurations
      const config = {
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      // login
      // axios.post(url, data, config)
      // data will come from backend server
      // data => message + token
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        { email, password },
        config
      );

      dispatch(userAuthSuccess(data.message));
      console.log("After user auth success");

      console.log(data);

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      // the error is first handled in
      // custom error handler in errorMiddlewares.js
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(userAuthFail(errorMessage));
      console.log("after user auth fail");
    }
  };
};

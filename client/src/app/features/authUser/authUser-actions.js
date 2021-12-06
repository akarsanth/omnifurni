import {
  userAuthRequest,
  userAuthSuccess,
  userAuthFail,
  setIsAuthenticated,
  setUserInfo,
} from "./authUser-slice";

// importing axios
import axios from "axios";
// import { userRegisterSuccess } from "../userRegister/userRegister-slice";

export const authUser = (loginDetails) => {
  return async (dispatch) => {
    const { email, password } = loginDetails;

    try {
      dispatch(userAuthRequest());
      console.log("after user auth request");

      // req body configurations
      const config = {
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
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

      console.log(data.token);

      localStorage.setItem("token", JSON.stringify(data.token));

      console.log("here");

      // to fetch user data
      dispatch(fetchAuthUser());
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

export const fetchAuthUser = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    // token configuration
    const config = {
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    };

    const response = await axios
      .get("http://localhost:5000/api/v1/auth/user", config) // with credential
      .catch((err) => {
        console.log(err);
        console.log("Not properly authenticated!");
        // navigate("/login/error");
      });

    if (response && response.data) {
      console.log("User:", response.data);

      dispatch(setIsAuthenticated(true));

      dispatch(setUserInfo(response.data));
      // navigate("/welcome");

      localStorage.setItem("userInfo", response.data);
    }
  };
};

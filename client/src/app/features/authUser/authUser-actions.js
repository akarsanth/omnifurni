import {
  userAuthRequest,
  userAuthSuccess,
  userAuthFail,
  setIsAuthenticated,
  setUserInfo,
} from "./authUser-slice";

// importing axios
import axios from "axios";

// Thunk
// This is a function that delays an action until later
// A function that does not return the action itself but
// another function which eventually returns the action
export const authUser = (loginDetails) => {
  return async (dispatch) => {
    const { email, password } = loginDetails;

    try {
      dispatch(userAuthRequest());

      // req body configurations
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // login
      // axios.post(url, data, config)
      // data will come from backend server
      // data => message + token
      const { data } = await axios.post(
        "/api/v1/user/login",
        { email, password },
        config
      );
      dispatch(userAuthSuccess(data.message));

      dispatch(setIsAuthenticated(true));

      localStorage.setItem("firstLogin", true);
    } catch (error) {
      // the error is first handled in
      // custom error handler in errorMiddlewares.js
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(userAuthFail(errorMessage));
    }
  };
};

// called after getting the token from cookie
export const fetchAuthUser = (token) => {
  return async (dispatch) => {
    const response = await axios.get("/api/v1/user/info", {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(
      setUserInfo({
        user: response.data,
        isAdmin: response.data.role === 1 ? true : false,
      })
    );

    dispatch(setIsAuthenticated(true));
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await axios.get("/api/v1/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };
};

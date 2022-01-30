import {
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFail,
} from "./userRegister-slice";

// importing axios
import axios from "axios";

export const registerUser = (registrationDetails) => {
  return async (dispatch) => {
    const { firstName, lastName, contactNumber, email, password } =
      registrationDetails;

    try {
      dispatch(userRegisterRequest());

      // req body configurations
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // data from response (res from backend)
      const { data } = await axios.post(
        "/api/v1/auth/register",
        { firstName, lastName, contactNumber, email, password },
        config
      );

      dispatch(userRegisterSuccess(data.message));
    } catch (error) {
      // the error is first handled in
      // custom error handler in errorMiddlewares.js
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(userRegisterFail(errorMessage));
    }
  };
};

import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/user-constants";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { isLoading: true };

    case USER_REGISTER_SUCCESS:
      return { isLoading: false };

    case USER_REGISTER_FAIL:
      return { isLoading: false, error: action.payload };

    default:
      return state;
  }
};

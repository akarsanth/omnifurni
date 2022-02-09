import React, { useReducer } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

//////////////////////////////////
// FORMIK and YUP
import { Formik, Form as FormikForm } from "formik";
import {
  INITIAL_PASSWORD_CHANGE_STATE,
  PASSWORD_CHANGE_FORM_VALIDATION,
} from "../../FormsUI/YupFormik";

//////////////////////////////////
// Component Import
import FormFields from "../../FormsUI/FormFieldsWrapper";
import Textfield from "../../FormsUI/Textfield";
import Button from "../../FormsUI/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Message from "../../Message";

////////////////////////////////
// MUI Components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";

////////////////////////////////////
// Reducers
// Update User Details Reducer
const initialState = {
  isLoading: false,
  error: null,
  success: null,
};

const updatePasswordReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PASSWORD_REQUEST":
      return { ...state, isLoading: true };

    case "UPDATE_PASSWORD_SUCCESS":
      return { ...state, isLoading: false, success: action.payload };

    case "UPDATE_PASSWORD_FAIL":
      return { ...state, isLoading: false, error: action.payload };

    default:
      return initialState;
  }
};

////////////////////////////////////
// MAIN COMPONENT
const PasswordUpdate = () => {
  // For password fields
  const [values, setValues] = React.useState({
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmNewPassword: false,
  });
  const handleClickShowCurrentPassword = () => {
    setValues({
      ...values,
      showCurrentPassword: !values.showCurrentPassword,
    });
  };
  const handleClickShowNewPassword = () => {
    setValues({
      ...values,
      showNewPassword: !values.showNewPassword,
    });
  };
  const handleClickShowConfirmNewPassword = () => {
    setValues({
      ...values,
      showConfirmNewPassword: !values.showConfirmNewPassword,
    });
  };

  // Password Update Reducer
  const [state, dispatch] = useReducer(updatePasswordReducer, initialState);
  const { isLoading, error, success } = state;

  // Update Password Button Handler
  const { token } = useSelector((state) => state.token);
  const updatePasswordHandler = async (values, { resetForm }) => {
    // delete values.confirmNewPassword;

    try {
      dispatch({ type: "RESET_STATE" });

      dispatch({ type: "UPDATE_PASSWORD_REQUEST" });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        "/api/v1/auth/updatePassword",
        values,
        config
      );

      dispatch({ type: "UPDATE_PASSWORD_SUCCESS", payload: data.message });

      resetForm();
    } catch (error) {
      dispatch({
        type: "UPDATE_PASSWORD_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  return (
    <Box>
      <Typography variant="body1" sx={{ mb: 2, fontWeight: 700 }}>
        Password Change
      </Typography>

      <Formik
        initialValues={{ ...INITIAL_PASSWORD_CHANGE_STATE }}
        validationSchema={PASSWORD_CHANGE_FORM_VALIDATION}
        onSubmit={updatePasswordHandler}
      >
        <FormikForm>
          <FormFields>
            <Textfield
              label="Current Password"
              name="currentPassword"
              type={values.showCurrentPassword ? "text" : "password"}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle current password visibility"
                      onClick={handleClickShowCurrentPassword}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showCurrentPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Textfield
              label="New Password"
              name="newPassword"
              required
              type={values.showNewPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle new password visibility"
                      onClick={handleClickShowNewPassword}
                      // onMouseDown={handleMouseDownConfirmPassword}
                      edge="end"
                    >
                      {values.showNewPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Textfield
              label="Confirm New Password"
              name="confirmNewPassword"
              required
              type={values.showConfirmNewPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm new password visibility"
                      onClick={handleClickShowConfirmNewPassword}
                      // onMouseDown={handleMouseDownConfirmPassword}
                      edge="end"
                    >
                      {values.showConfirmNewPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              color="secondary"
              endIcon={<KeyboardArrowRightIcon />}
              disableElevation
              sx={{ alignSelf: "flex-start" }}
              loading={isLoading}
            >
              Update Password
            </Button>
          </FormFields>
        </FormikForm>
      </Formik>

      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}
      {success && <Message message={success} />}
    </Box>
  );
};

export default PasswordUpdate;

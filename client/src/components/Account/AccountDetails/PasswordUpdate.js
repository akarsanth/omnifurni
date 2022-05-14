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
import TextfieldPw from "../../FormsUI/Textfield/TextFieldPw";
import Button from "../../FormsUI/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Message from "../../Message";

////////////////////////////////
// MUI Components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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
        "/api/v1/user/updatePassword",
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
            <TextfieldPw
              label="Current Password"
              name="currentPassword"
              required
            />

            <TextfieldPw label="New Password" name="newPassword" required />

            <TextfieldPw
              label="Confirm New Password"
              name="confirmNewPassword"
              required
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
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {success && <Message message={success} />}
    </Box>
  );
};

export default PasswordUpdate;

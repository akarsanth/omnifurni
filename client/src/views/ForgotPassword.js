import React, { useState } from "react";
import axios from "axios";

import { Link as RouterLink } from "react-router-dom";

//////////////////////////////////
// FORMIK and YUP
import { Formik, Form as FormikForm } from "formik";
import {
  INITIAL_FORGOT_PASS_STATE,
  FORGOT_PASS_FORM_VALIDATION,
} from "../components/FormsUI/YupFormik";

//////////////////////////////////
// Component Import
import FormContainer, { FormLink } from "../components/FormsUI/FormContainer";
import FormFields from "../components/FormsUI/FormFieldsWrapper";
import Textfield from "../components/FormsUI/Textfield";
import Button from "../components/FormsUI/Button";

//////////////////////////////////
// MUI imports
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Alert from "@mui/material/Alert";

/////////////////////////////////
// MAIN COMPONENT
const INITIAL_STATE = {
  isLoading: false,
  error: null,
  success: null,
};

const ForgotPassword = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const { isLoading, error, success } = state;

  // Submit handler
  const submitHandler = async (values, { resetForm }) => {
    const { email } = values;
    try {
      // before request
      setState({ ...state, isLoading: true });

      const res = await axios.post("/api/v1/user/forgot", { email });

      // visualization of isLoading
      // setTimeout(() => {
      //   setState({ ...state, isLoading: false, success: res.data.message });
      // }, 3000);

      // after res success
      setState({
        isLoading: false,
        success: res.data.message,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      // setting error message
      setState({
        isLoading: false,
        error: errorMessage,
        success: null,
      });
    }

    // Resetting form fields
    resetForm({
      values: "",
    });
  };

  return (
    <FormContainer>
      <Typography
        variant="body1"
        component="h2"
        sx={{ mb: 4, fontWeight: 700 }}
      >
        Forgot your password?
      </Typography>

      <Formik
        initialValues={{ ...INITIAL_FORGOT_PASS_STATE }}
        validationSchema={FORGOT_PASS_FORM_VALIDATION}
        onSubmit={submitHandler}
      >
        <FormikForm>
          <FormFields>
            <Textfield label="Enter Email" name="email" required />

            <Button
              color="secondary"
              endIcon={<KeyboardArrowRightIcon />}
              disableElevation
              loading={isLoading}
            >
              Verify your email
            </Button>

            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Typography variant="body2">Or go back to</Typography>
              <FormLink to="/login" component={RouterLink} underline="none">
                <Typography variant="body2">Login!</Typography>
              </FormLink>
            </Box>

            {success && <Alert severity="success">{success}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
          </FormFields>
        </FormikForm>
      </Formik>
    </FormContainer>
  );
};

export default ForgotPassword;

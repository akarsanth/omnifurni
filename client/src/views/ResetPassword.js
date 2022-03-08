import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";

//////////////////////////////////
// Redux Related
import { useDispatch } from "react-redux";
import { updateSuccessMessage } from "../app/features/message/message-slice";

//////////////////////////////////
// FORMIK and YUP
import { Formik, Form as FormikForm } from "formik";
import {
  INITIAL_RESET_PASS_STATE,
  RESET_PASS_FORM_VALIDATION,
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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

/////////////////////////////////
// MAIN COMPONENT
const INITIAL_STATE = {
  isLoading: false,
  error: "",
  success: false,
};

//////////////////////////////////
// MAIN COMPONENT
const ResetPassword = () => {
  // token from url
  const { token } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState(INITIAL_STATE);
  const { isLoading, error, success } = state;

  // for visibility of password fields
  const [values, setValues] = React.useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  // navigating to login page
  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success, navigate]);

  // Submit handler
  const submitHandler = async (values, { resetForm }) => {
    // Resetting form fields
    resetForm({
      values: "",
    });

    const { password } = values;
    try {
      // before request
      setState({ ...state, isLoading: true });

      const { data } = await axios.post(
        "/api/v1/user/reset",
        { password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // after res success
      setState({
        isLoading: false,
        success: true,
        error: null,
      });

      dispatch(updateSuccessMessage(data.message));
    } catch (err) {
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
  };
  return (
    <FormContainer>
      <Typography
        variant="body1"
        component="h2"
        sx={{ mb: 4, fontWeight: 700 }}
      >
        Reset your password!
      </Typography>

      <Formik
        initialValues={{ ...INITIAL_RESET_PASS_STATE }}
        validationSchema={RESET_PASS_FORM_VALIDATION}
        onSubmit={submitHandler}
      >
        <FormikForm>
          <FormFields>
            <Textfield
              label="Password"
              name="password"
              type={values.showPassword ? "text" : "password"}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Textfield
              label="Confirm Password"
              name="confirmPassword"
              required
              type={values.showConfirmPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      // onMouseDown={handleMouseDownConfirmPassword}
                      edge="end"
                    >
                      {values.showConfirmPassword ? (
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
              loading={isLoading}
            >
              Reset Password
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

export default ResetPassword;

import React from "react";

import { Link as RouterLink } from "react-router-dom";

//////////////////////////////////
// Redux
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../app/features/userRegister/userRegister-actions";

//////////////////////////////////
// FORMIK and YUP
import { Formik, Form as FormikForm } from "formik";
import {
  INITIAL_REGISTER_FORM_STATE,
  REGISTER_FORM_VALIDATION,
} from "../components/FormsUI/YupFormik";

//////////////////////////////////
// Component Import
import FormContainer, {
  FormLink,
  NameFields,
} from "../components/FormsUI/FormContainer";
import FormFields from "../components/FormsUI/FormFieldsWrapper";
import Textfield from "../components/FormsUI/Textfield";
import Button from "../components/FormsUI/Button";

//////////////////////////////////
// MUI imports
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

/////////////////////////////////////////
// MAIN Component
const RegisterScreen = () => {
  // to dispatch action
  const dispatch = useDispatch();

  const [values, setValues] = React.useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  // registration screen state values
  const { isLoading, error, successMessage } = useSelector(
    (state) => state.userRegister
  );

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

  ///////////////////////////////
  // register button handler
  const submitHandler = (values, { resetForm }) => {
    const registrationDetails = values;
    dispatch(registerUser(registrationDetails));

    setTimeout(() => {
      if (successMessage) resetForm({ values: "" });
    }, 2000);
  };

  return (
    <FormContainer>
      <Typography
        variant="body1"
        component="h2"
        sx={{ mb: 4, fontWeight: 700 }}
      >
        Register and start shopping!
      </Typography>

      <Formik
        initialValues={{ ...INITIAL_REGISTER_FORM_STATE }}
        validationSchema={REGISTER_FORM_VALIDATION}
        onSubmit={submitHandler}
      >
        <FormikForm>
          <FormFields>
            <NameFields>
              <Textfield label="First Name" name="firstName" required />

              <Textfield label="Last Name" name="lastName" required />
            </NameFields>

            <Textfield label="Email" type="email" name="email" required />

            <Textfield label="Contact Number" name="contactNumber" required />

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
              Register
            </Button>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography variant="body2">Already have an account?</Typography>
              <FormLink to="/login" component={RouterLink} underline="none">
                <Typography variant="body2">Login!</Typography>
              </FormLink>
            </Box>

            {successMessage && (
              <Alert severity="success">{successMessage}</Alert>
            )}
            {error && <Alert severity="error">{error}</Alert>}
          </FormFields>
        </FormikForm>
      </Formik>
    </FormContainer>
  );
};

export default RegisterScreen;

import React from "react";

import { Link as RouterLink } from "react-router-dom";

//////////////////////////////////
// Redux
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../app/features/userRegister/userRegister-actions";

//////////////////////////////////
// FORMIK and YUP
import { Formik, Form } from "formik";
import * as Yup from "yup";

//////////////////////////////////
// Component Import
import FormContainer, { FormLink } from "../components/FormContainer";
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

/////////////////////////////////
// Styled Components
import { styled } from "@mui/material/styles";

const RegisterForm = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

const NameFields = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
}));

// FORM INITIAL STATE AND VALIDATION
const INITIAL_REGISTER_FORM_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  password: "",
  confirmPassword: "",
};

const REGISTER_FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("Required Field"),
  lastName: Yup.string().required("Required Field"),
  contactNumber: Yup.number()
    .integer()
    .typeError("Please enter a valid phone number")
    .required("Required Field"),
  email: Yup.string().required("Required Field").email("Invalid email address"),
  password: Yup.string().required("Required Field"),
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  // ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required Field"),
});

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
  console.log(isLoading, error, successMessage);

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

  // register button handler
  const submitHandler = (values) => {
    const registrationDetails = values;

    dispatch(registerUser(registrationDetails));
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
        <Form>
          <RegisterForm>
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
          </RegisterForm>
        </Form>
      </Formik>
    </FormContainer>
  );
};

export default RegisterScreen;

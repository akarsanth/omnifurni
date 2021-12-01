import React, { useState } from "react";

// REACT ROUTER
import { Link as RouterLink } from "react-router-dom";

///////////////////////////////////
// Redux
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../app/features/authUser/authUser-actions";

//////////////////////////////////
// FORMIK and YUP
import { Formik, Form } from "formik";
import * as Yup from "yup";

///////////////////////////////////
// Component Import
import FormContainer, { FormLink } from "../components/FormContainer";
import Textfield from "../components/FormsUI/Textfield/index";
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

const SignUpForm = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

// FORM INITIAL STATE AND VALIDATION
const INITIAL_LOGIN_FORM_STATE = {
  email: "",
  password: "",
};

const LOGIN_FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().required("Required Field").email("Invalid email address"),
  password: Yup.string().required("Required Field"),
});

//////////////////////////////////////
// MAIN Component
const LoginScreen = () => {
  const dispatch = useDispatch();

  // For handling password visibility
  const [values, setValues] = useState({ showPassword: false });
  const handleClickShowPassword = () => {
    setValues({
      showPassword: !values.showPassword,
    });
  };

  // login state values
  const { isLoading, error, message } = useSelector((state) => state.authUser);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // login submit handler
  const submitHandler = (values) => {
    console.log(values);
    dispatch(authUser(values));
  };

  return (
    <FormContainer>
      <Typography
        variant="body1"
        component="h2"
        sx={{ mb: 4, fontWeight: 700 }}
      >
        Log In to Your Account!{" "}
      </Typography>

      <Formik
        initialValues={{ ...INITIAL_LOGIN_FORM_STATE }}
        validationSchema={LOGIN_FORM_VALIDATION}
        onSubmit={submitHandler}
      >
        <Form>
          <SignUpForm>
            <Textfield label="Enter Email" name="email" required />

            <Textfield
              label="Enter Password"
              name="password"
              required
              type={values.showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box>
              <FormLink to="/forgot" component={RouterLink} underline="none">
                <Typography variant="body2">Forgot your password?</Typography>
              </FormLink>
            </Box>

            <Button
              color="secondary"
              endIcon={<KeyboardArrowRightIcon />}
              disableElevation
              loading={isLoading}
            >
              Login
            </Button>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography variant="body2">Create new account?</Typography>
              <FormLink to="/register" component={RouterLink} underline="none">
                <Typography variant="body2">Sign up!</Typography>
              </FormLink>
            </Box>

            {message && <Alert severity="success">{message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
          </SignUpForm>
        </Form>
      </Formik>
    </FormContainer>
  );
};

export default LoginScreen;

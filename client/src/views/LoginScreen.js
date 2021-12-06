import React, { useState } from "react";

// REACT ROUTER
import { Link as RouterLink } from "react-router-dom";

///////////////////////////////////
// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  authUser,
  fetchAuthUser,
} from "../app/features/authUser/authUser-actions";

//////////////////////////////////
// FORMIK and YUP
import { Formik, Form } from "formik";
import * as Yup from "yup";

///////////////////////////////////
// Component Import
import FormContainer, { FormLink } from "../components/FormContainer";
import Textfield from "../components/FormsUI/Textfield/index";
import Button from "../components/FormsUI/Button";
import GoogleButton from "react-google-button";

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

  // for redirect
  const redirectToGoogleSSO = async () => {
    // variable to store our timer
    let timer = null;

    const googleLoginURL = "http://localhost:5000/api/v1/auth/login/google";
    const newWindow = window.open(
      googleLoginURL,
      "_blank",
      "width=600, height=600"
    );

    // if there is new window
    if (newWindow) {
      // check every half second if window is closed
      // if window is closed clear the interval
      timer = setInterval(() => {
        console.log("here");
        if (newWindow.closed) {
          console.log("Yay, we are authenticated");
          // fetchAuthUser();
          // dispatch(fetchAuthUser());

          // release timer from the variable
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };

  // login submit handler
  const submitHandler = (values) => {
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

      <GoogleButton onClick={redirectToGoogleSSO} />
    </FormContainer>
  );
};

export default LoginScreen;

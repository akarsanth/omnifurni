import React, { useState, useEffect } from "react";

// REACT ROUTER
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

///////////////////////////////////
// Redux
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../app/features/authUser/authUser-actions";

//////////////////////////////////
// FORMIK and YUP
import { Formik, Form as FormikForm } from "formik";
import {
  INITIAL_LOGIN_FORM_STATE,
  LOGIN_FORM_VALIDATION,
} from "../components/FormsUI/YupFormik";

///////////////////////////////////
// Component Import
import FormContainer, { FormLink } from "../components/FormsUI/FormContainer";
import FormFields from "../components/FormsUI/FormFieldsWrapper";
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

//////////////////////////////////////
// MAIN Component
const LoginScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // For handling password visibility
  const [values, setValues] = useState({ showPassword: false });
  const handleClickShowPassword = () => {
    setValues({
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // login state handling with redux
  const { isLoading, error, message, isAuthenticated } = useSelector(
    (state) => state.authUser
  );

  useEffect(() => {
    if (isAuthenticated) {
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, navigate, location.state?.from]);

  // login submit handler
  const submitHandler = (values, { resetForm }) => {
    dispatch(authUser(values));
    resetForm({ values: "" });
  };

  return (
    <FormContainer>
      <Typography
        variant="body1"
        component="h2"
        sx={{ mb: 4, fontWeight: 700 }}
      >
        Log In to Your Account!
      </Typography>

      <Formik
        initialValues={{ ...INITIAL_LOGIN_FORM_STATE }}
        validationSchema={LOGIN_FORM_VALIDATION}
        onSubmit={submitHandler}
      >
        <FormikForm>
          <FormFields>
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
          </FormFields>
        </FormikForm>
      </Formik>
    </FormContainer>
  );
};

export default LoginScreen;

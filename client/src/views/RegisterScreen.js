import React from "react";

import { Link as RouterLink } from "react-router-dom";

//////////////////////////////////
// Component Import
import FormContainer, { FormLink } from "../components/FormContainer";

//////////////////////////////////
// MUI imports
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FilledInput from "@mui/material/FilledInput";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Button from "@mui/material/Button";

/////////////////////////////////
// Styled Components
import { styled } from "@mui/material/styles";

const Form = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

const NameFields = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
}));

//////////////////////////////////////
// MAIN Component
const RegisterScreen = () => {
  const [values, setValues] = React.useState({
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleClickShowPassword = () => {
    setValues({
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const registerHandler = (e) => {
    e.preventDefault();
  };
  return (
    <FormContainer>
      {" "}
      <Typography variant="h6" component="h2" sx={{ mb: 4 }}>
        Register and start shopping!
      </Typography>
      <Form
        component="form"
        onSubmit={registerHandler}
        noValidate
        autoComplete="off"
      >
        <NameFields>
          <TextField
            label="First Name"
            fullWidth
            required
            variant="filled"
            size="small"
          />
          <TextField
            label="Last Name"
            fullWidth
            required
            variant="filled"
            size="small"
          />
        </NameFields>
        <TextField
          label="Enter Email"
          fullWidth
          required
          variant="filled"
          size="small"
        />

        <FormControl variant="filled" required size="small">
          <InputLabel htmlFor="password">Enter Password</InputLabel>
          <FilledInput
            id="password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
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
            }
          />
        </FormControl>

        <FormControl variant="filled" required size="small">
          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <FilledInput
            id="confirmPassword"
            type={values.showConfirmPassword ? "text" : "password"}
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                  edge="end"
                >
                  {values.showConfirmPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
          disableElevation
          size="large"
          sx={{ py: 1.2 }}
        >
          Register
        </Button>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Typography variant="body1">Already have an account?</Typography>
          <FormLink to="/login" component={RouterLink} underline="none">
            <Typography variant="body1">Login!</Typography>
          </FormLink>
        </Box>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;

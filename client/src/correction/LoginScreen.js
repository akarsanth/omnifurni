import React from "react";

import { Link as RouterLink } from "react-router-dom";

//////////////////////////////////
// Component Import
import FormContainer, { FormLink } from "../components/FormContainer";

//////////////////////////////////
// MUI imports
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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

//////////////////////////////////////
// MAIN Component
const LoginScreen = () => {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
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

      <Form
        component="form"
        onSubmit={loginSubmitHandler}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Enter Email"
          fullWidth
          required
          variant="outlined"
          size="small"
          InputLabelProps={{ style: { fontSize: 16 } }}
          onChange={handleChange("email")}
          value={values.email}
        />

        <TextField
          label="Enter Password"
          fullWidth
          type={values.showPassword ? "text" : "password"}
          variant="outlined"
          size="small"
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
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
          disableElevation
          size="large"
        >
          Login
        </Button>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Typography variant="body2">Create new account?</Typography>
          <FormLink to="/register" component={RouterLink} underline="none">
            <Typography variant="body2">Sign up!</Typography>
          </FormLink>
        </Box>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;

import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";

// MUI Imports
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

const TextfieldPwWrapper = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);

  // Visibility state
  const [visible, setVisible] = useState(false);
  const changePwVisibility = () => {
    setVisible(!visible);
  };

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
    size: "small",
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return (
    <TextField
      {...configTextfield}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle current password visibility"
              onClick={changePwVisibility}
              // onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {visible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      type={visible ? "text" : "password"}
    />
  );
};

export default TextfieldPwWrapper;

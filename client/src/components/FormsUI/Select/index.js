import React from "react";

//////////////////////////////////
// Formik
import { useField, useFormikContext } from "formik";

///////////////////////////////////
// MUI COMPONENTS
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const SelectWrapper = ({ name, options, list, ...otherProps }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (event) => {
    const { value } = event.target;
    setFieldValue(name, value);
    console.log(value);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField {...configSelect}>
      {list.map((option) => {
        return (
          <MenuItem key={option.id} value={option.value}>
            {option.text}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default SelectWrapper;

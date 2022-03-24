import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useField, useFormikContext } from "formik";

const CheckboxWrapper = ({ name, defaultChecked, ...otherProps }) => {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (event) => {
    const { checked } = event.target;
    console.log("checked", checked);
    setFieldValue(name, checked);
  };

  const configCheckbox = {
    ...field,
    ...otherProps,
    onChange: handleChange,
  };
  return (
    <FormControlLabel
      control={<Checkbox defaultChecked={defaultChecked ? true : false} />}
      {...configCheckbox}
    />
  );
};

export default CheckboxWrapper;

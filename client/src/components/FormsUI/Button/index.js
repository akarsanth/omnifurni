import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormikContext } from "formik";

const ButtonWrapper = ({ children, ...otherProps }) => {
  const { submitForm } = useFormikContext();

  // submit handler
  // submitHandler calls the submitForm() function
  // of attached to Formik
  const submitHandler = () => {
    submitForm();
  };

  const configButton = {
    onClick: submitHandler,
    ...otherProps,
    variant: "contained",
  };
  return <LoadingButton {...configButton}>{children}</LoadingButton>;
};

export default ButtonWrapper;

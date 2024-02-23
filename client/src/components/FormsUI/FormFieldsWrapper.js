import React from "react";

//////////////////////////////////
// MUI imports
import Box from "@mui/material/Box";

/////////////////////////////////
// Styled Components
import { styled } from "@mui/material/styles";

const Form = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

const FormWrapper = ({ children }) => {
  return <Form>{children}</Form>;
};

export default FormWrapper;

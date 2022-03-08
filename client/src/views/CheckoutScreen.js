import React from "react";
import { Link as RouterLink } from "react-router-dom";

//////////////////////////////////////
// Custom Components
import CheckoutSteps from "../components/CheckoutSteps";
import CustomizedGrid from "../components/Grid/CustomizedGrid";

/////////////////////////////////////
// MUI IMPORTS
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const CheckoutScreen = () => {
  return (
    <Container>
      <CheckoutSteps step1 step2 />
    </Container>
  );
};

export default CheckoutScreen;

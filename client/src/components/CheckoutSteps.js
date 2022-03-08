import React from "react";
import { Link as RouterLink } from "react-router-dom";

///////////////////////////////////////////
// MUI imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { styled } from "@mui/system";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const StepText = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightLight,
  textTransform: "uppercase",
  color: theme.palette.grey[600],
  fontSize: 16,
}));

const ActiveStepText = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  textTransform: "uppercase",
  color: theme.palette.grey[700],
  fontSize: 18,
  textAlign: "center",
}));

const StepBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(3),
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(6),
  textAlign: "center",
}));

const StepBoxItem = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const ForwardArrowIcon = styled(ArrowForwardIosIcon)(({ theme }) => ({
  color: theme.palette.grey[500],
}));

const CheckoutSteps = ({ step1, step2, step3 }) => {
  return (
    <StepBox>
      <StepBoxItem>
        {step1 ? (
          <Link to="/cart" component={RouterLink} underline="none">
            <ActiveStepText variant="h6">Shopping Cart</ActiveStepText>
          </Link>
        ) : (
          <StepText variant="h6">Shopping Cart</StepText>
        )}

        <ForwardArrowIcon fontSize="small" />
      </StepBoxItem>

      <StepBoxItem>
        {step2 ? (
          <Link to="/check" component={RouterLink} underline="none">
            <ActiveStepText variant="h6">Checkout Details</ActiveStepText>
          </Link>
        ) : (
          <StepText variant="h6">Checkout Details</StepText>
        )}

        <ForwardArrowIcon fontSize="small" />
      </StepBoxItem>

      <StepBoxItem>
        {step3 ? (
          <Link to="/cart" component={RouterLink} underline="none">
            <ActiveStepText variant="h6">Order Complete</ActiveStepText>
          </Link>
        ) : (
          <StepText variant="h6">Order Complete</StepText>
        )}

        <ForwardArrowIcon fontSize="small" />
      </StepBoxItem>
    </StepBox>
  );
};

export default CheckoutSteps;

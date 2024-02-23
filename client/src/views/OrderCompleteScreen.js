import React, { useEffect, useState } from "react";

import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";

/////////////////////////////////////
// MUI IMPORTS
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

//////////////////////////////////////
// Custom Components
import CheckoutSteps from "../components/CheckoutSteps";

const OrderCompleteScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // To handle (if user tries to access this screen randomly)
  // orderId is also passed through the navigate (state prop)
  const [from, setFrom] = useState("");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (location.state) {
      setFrom(location.state.from);
      setOrderId(location.state.orderId);
    } else {
      setFrom("random");
    }
  }, [location]);

  useEffect(() => {
    if (from) {
      if (from === "random") {
        navigate("/");
      }
    }
  }, [from, navigate]);

  return (
    <Container>
      <CheckoutSteps step4 />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 9,
          mb: 15,
        }}
      >
        <CheckCircleOutlineIcon
          fontSize="large"
          color="primary"
          sx={{ mb: 1 }}
        />
        <Typography sx={{ mb: 3 }}>Order Completed Successfully!</Typography>
        <Link
          to={`/account/vieworder/${orderId}`}
          component={RouterLink}
          underline="none"
        >
          <Button variant="outlined">View Order Details</Button>
        </Link>
      </Box>
    </Container>
  );
};

export default OrderCompleteScreen;

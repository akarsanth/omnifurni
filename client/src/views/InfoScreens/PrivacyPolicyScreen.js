import React from "react";
import { Link as RouterLink } from "react-router-dom";

/////////////////////////////////
// MUI Components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import Link from "@mui/material/Link";

const PrivacyPolicyScreen = () => {
  return (
    <Container sx={{ mt: 6, mb: 12 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link
          sx={{ display: "flex", alignItems: "center" }}
          underline="hover"
          color="inherit"
          component={RouterLink}
          to="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          HOME
        </Link>

        <Typography color="text.primary">Privacy Policy</Typography>
      </Breadcrumbs>

      <Typography variant="h6">About Us</Typography>
      <Typography sx={{ lineHeight: 1.8 }}></Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Vision
      </Typography>
      <Typography>
        Our vision is to make Nepal proud by being the best local example in
        customer experience.
      </Typography>
    </Container>
  );
};

export default PrivacyPolicyScreen;

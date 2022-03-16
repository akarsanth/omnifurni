import React from "react";
import { Link as RouterLink } from "react-router-dom";

/////////////////////////////////
// MUI Components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import Link from "@mui/material/Link";

const FAQScreen = () => {
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

        <Typography color="text.primary">
          FAQ (Frequently Asked Questions)
        </Typography>
      </Breadcrumbs>
    </Container>
  );
};

export default FAQScreen;

import React from "react";
import { Link as RouterLink } from "react-router-dom";

/////////////////////////////////
// MUI Components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import Link from "@mui/material/Link";

const AboutScreen = () => {
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

        <Typography color="text.primary">About Us</Typography>
      </Breadcrumbs>

      <Typography variant="h6">About Us</Typography>
      <Typography sx={{ lineHeight: 1.8 }}>
        Our story began in Dec 2015, when internet penetration in Nepal was just
        about 9%. Yet, we were encouraged to start not just a company but an
        ecommerce industry that would have a significant impact in Nepal’s
        economy for generations to come. Bootstrapped with just Rs.50,000, we
        rented a small garage, worked on broken furniture and chairs and worked
        hard to build a strong company and significantly contributing in
        building an ecommerce industry. Today, Omnifuni is one of the leading
        ecommerce companies in Nepal with millions of customers and thousands of
        vendors / partners all over Nepal. We have a logistic network that
        ensures deliveries in most parts of the nation with exceptions of some
        locations (work in progress). Our goal is to ensure that our users and
        customers can buy products at affordable prices, get their products
        delivered as assured, and on time regardless of their location. On the
        other hand, we provide a platform for our vendors to cater to millions
        of customers without additional cost to their business.
      </Typography>

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

export default AboutScreen;

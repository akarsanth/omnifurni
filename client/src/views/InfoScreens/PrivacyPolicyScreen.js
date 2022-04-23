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

      <Typography variant="h6" textTransform={"uppercase"}>
        Privacy Policy
      </Typography>
      <Typography sx={{ lineHeight: 1.8 }}>
        This privacy policy sets out how Omnifurni Pvt. Ltd uses and protects
        any information that you give Omnifurni Pvt. Ltd when you use this
        website. Omnifurni Pvt. Ltd is committed to ensuring that your privacy
        is protected. Should we ask you to provide certain information by which
        you can be identified when using this website, then you can be assured
        that it will only be used in accordance with this privacy statement.
        Omnifurni Pvt. Ltd may change this policy from time to time by updating
        this page. You should check this page from time to time to ensure that
        you are happy with any changes.
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        What we collect
      </Typography>
      <Typography sx={{ mb: 1 }}>
        We may collect the following information:
      </Typography>
      <Typography>1. Name</Typography>
      <Typography>2. Contact information including email address</Typography>
      <Typography>3. Address information</Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Security
      </Typography>
      <Typography>
        We are committed to ensuring that your information is secure. In order
        to prevent unauthorised access or disclosure, we have put in place
        suitable physical, electronic and managerial procedures to safeguard and
        secure the information we collect online.
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        What we do with the information we gather
      </Typography>
      <Typography sx={{ mb: 1 }}>
        We require this information to understand your needs and provide you
        with a better service, and in particular for the following reasons:
      </Typography>
      <Typography>
        1. We may use the information to improve our products and services.
      </Typography>
      <Typography>
        2. We may periodically send promotional emails about new products,
        special offers or other information which we think you may find
        interesting using the email address which you subscribed.
      </Typography>
      <Typography>3. Internal record keeping.</Typography>
    </Container>
  );
};

export default PrivacyPolicyScreen;

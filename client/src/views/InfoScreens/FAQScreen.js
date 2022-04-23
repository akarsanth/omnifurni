import React from "react";
import { Link as RouterLink } from "react-router-dom";

/////////////////////////////////
// MUI Components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import Link from "@mui/material/Link";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";

//////////////////////////////////
// Custom Components
import {
  ExpandMoreIconCust,
  AccordionHeader,
} from "../../components/Common/Accordion";

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

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIconCust />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ borderLeft: 4, borderColor: "primary.main" }}
          >
            <AccordionHeader>How can I pay for my order?</AccordionHeader>
          </AccordionSummary>
          <AccordionDetails
            sx={{ borderTop: 1, borderColor: "grey.100", py: 3 }}
          >
            <Typography>
              The payment methods that are currently available are COD (Cash On
              Delivery) and Khalti Digital Wallet.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIconCust />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{ borderLeft: 4, borderColor: "primary.main" }}
          >
            <AccordionHeader>Can I cancel my order?</AccordionHeader>
          </AccordionSummary>
          <AccordionDetails sx={{ borderTop: 1, borderColor: "grey.100" }}>
            <Typography>
              Yes, you can cancel your order, but only if you have not selected
              the payment method for that particular order. However, if you want
              to cancel your order even after selection of payment method (COD
              or Khalti), you can contact us using the Contact Us form, or
              through our contact number, or email address provided in this
              website.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIconCust />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{ borderLeft: 4, borderColor: "primary.main" }}
          >
            <AccordionHeader>
              What should I do if I have an issue with my product?{" "}
            </AccordionHeader>
          </AccordionSummary>
          <AccordionDetails sx={{ borderTop: 1, borderColor: "grey.100" }}>
            <Typography variant="body2">
              You can contact us through the provided email address, or phone
              number.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIconCust />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{ borderLeft: 4, borderColor: "primary.main" }}
          >
            <AccordionHeader>How to track my order?</AccordionHeader>
          </AccordionSummary>
          <AccordionDetails sx={{ borderTop: 1, borderColor: "grey.100" }}>
            <Typography fontWeight={600} sx={{ mb: 1 }}>
              There are four types of stages of a order:
            </Typography>
            <Typography>
              1. Payment Pending: Which indicates that payment method has not
              been selected.
            </Typography>
            <Typography>
              2. Order Completed: Which indicates that the order is completed.
              (After payment method is selected)
            </Typography>
            <Typography>
              3. Delivered: The order is delivered successfully.
            </Typography>
            <Typography>4. Cancelled: The order has been cancelled.</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
};

export default FAQScreen;

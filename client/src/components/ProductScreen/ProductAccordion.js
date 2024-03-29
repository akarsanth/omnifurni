import React from "react";

////////////////////////////////////////
// MUI Components
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

////////////////////////////////////////
// Components import
import ProductReviews from "./ProductReviews";
import { ExpandMoreIconCust, AccordionHeader } from "../Common/Accordion";

////////////////////////////////////////////
// MAIN Component
const ProductAccordion = (props) => {
  const { description, reviews, reviewUpdated } = props;

  return (
    <Box>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIconCust />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ borderLeft: 4, borderColor: "primary.main" }}
        >
          <AccordionHeader>Product Description</AccordionHeader>
        </AccordionSummary>
        <AccordionDetails sx={{ borderTop: 1, borderColor: "grey.100", py: 3 }}>
          <Typography variant="body2">{description}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIconCust />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{ borderLeft: 4, borderColor: "primary.main" }}
        >
          <AccordionHeader>Reviews</AccordionHeader>
        </AccordionSummary>
        <AccordionDetails sx={{ borderTop: 1, borderColor: "grey.100" }}>
          {/* Reviews Component */}
          <ProductReviews reviews={reviews} reviewUpdated={reviewUpdated} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ProductAccordion;

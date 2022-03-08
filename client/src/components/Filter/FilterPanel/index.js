import React from "react";

/////////////////////////////////////////
// MUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/////////////////////////////////////
// Custom Components
import FilterListToggle from "../FilterListToggle";
import PriceSlider from "../Slider";
import { ExpandMoreIconCust, AccordionHeader } from "../../Common/Accordion";

const ratingList = [
  {
    id: 5,
    value: "5",
    // label: "5 ⭐⭐⭐⭐⭐",
  },

  {
    id: 4,
    value: "4",
    // label: "4 ⭐⭐⭐⭐  and up",
  },

  {
    id: 3,
    value: "3",
    // label: "3 ⭐⭐⭐  and up",
  },

  {
    id: 2,
    value: "2",
    // label: "2 ⭐⭐  and up",
  },

  {
    id: 1,
    value: "1",
    // label: "1 ⭐  and up",
  },

  {
    id: 0,
    value: "0",
    // label: "0 ⭐  and up",
  },
];

const FilterPanel = ({
  selectedRating,
  selectedPrice,
  selectRating,
  changePrice,
  minMaxValue,
}) => {
  return (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIconCust />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ borderLeft: 4, borderColor: "primary.main" }}
        >
          <AccordionHeader>Filter By</AccordionHeader>
        </AccordionSummary>
        <AccordionDetails
          sx={{ borderTop: 1, borderColor: "grey.100", py: 3, px: 3 }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography sx={{ mb: 6 }} fontWeight={600}>
              Price
            </Typography>
            <PriceSlider
              value={selectedPrice}
              changePrice={changePrice}
              minMaxValue={minMaxValue}
            />
          </Box>
          <Box>
            <Typography sx={{ mb: 2 }} fontWeight={600}>
              Star Rating
            </Typography>
            <FilterListToggle
              options={ratingList}
              value={selectedRating}
              selectToggle={selectRating}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FilterPanel;

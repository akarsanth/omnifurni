import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

const FilterListToggle = ({ options, value, selectToggle }) => {
  return (
    <ToggleButtonGroup
      value={value}
      orientation="vertical"
      exclusive
      onChange={selectToggle}
    >
      {options.map(({ label, id, value }) => (
        <ToggleButton
          key={id}
          value={value}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            textTransform: "lowercase",
            gap: 1,
          }}
        >
          <Typography>{value}</Typography>
          <Rating
            name="read-only"
            value={parseInt(value)}
            readOnly
            size="small"
          />
          {parseInt(value) !== 5 && <Typography> and up</Typography>}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default FilterListToggle;

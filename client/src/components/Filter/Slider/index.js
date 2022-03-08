import React from "react";

/////////////////////////////////////
// MUI Components
import Slider from "@mui/material/Slider";

const PriceSlider = ({ value, minMaxValue, changePrice }) => {
  return (
    <div>
      <Slider
        value={value}
        onChange={changePrice}
        valueLabelDisplay="on"
        min={minMaxValue[0]}
        max={minMaxValue[1]}
        disabled={minMaxValue[0] === minMaxValue[1]}
      />
    </div>
  );
};

export default PriceSlider;

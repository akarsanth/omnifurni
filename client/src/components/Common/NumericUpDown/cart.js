import React from "react";

////////////////////////////////////
// Redux
import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
} from "../../../app/features/cart/cart-actions";

//////////////////////////////////
// MUI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";

import { styled } from "@mui/system";

const CustButton = styled(Button)(({ theme }) => ({
  ".MuiButton-startIcon": {
    margin: 0,
  },
}));

////////////////////////////////////////////////
// MAIN Component
const NumericUpDown = ({ inStock, qty, productId }) => {
  const dispatch = useDispatch();
  const handlePlusButton = () => {
    dispatch(increaseQuantity(productId));
  };

  const handleMinusButton = () => {
    dispatch(decreaseQuantity(productId));
  };

  return (
    <Box sx={{ display: "flex", gap: 0.2 }}>
      <CustButton
        disabled={qty === 1}
        variant="outlined"
        sx={{ minWidth: 0, fontSize: 20 }}
        classes={{ startIcon: { margin: 0 } }}
        startIcon={<RemoveIcon />}
        onClick={handleMinusButton}
        size="small"
      />

      <TextField
        type="number"
        InputProps={{
          readOnly: true,
        }}
        value={qty}
        disabled
        size="small"
        sx={{ width: 70 }}
      />
      <CustButton
        disabled={qty === inStock}
        variant="contained"
        sx={{ minWidth: 0 }}
        startIcon={<AddIcon />}
        onClick={handlePlusButton}
        disableElevation
        size="small"
      />
    </Box>
  );
};

export default NumericUpDown;

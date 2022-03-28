import React from "react";

////////////////////////////////////
// MUI Components
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

/////////////////////////////////////
// MAIN COMPONENT
const CloseButton = ({ handleClose }) => {
  return (
    <IconButton
      aria-label="delete"
      sx={{ position: "absolute", right: 16, top: 8 }}
      onClick={handleClose}
    >
      <CloseIcon color="secondary" fontSize="large" />
    </IconButton>
  );
};

export default CloseButton;

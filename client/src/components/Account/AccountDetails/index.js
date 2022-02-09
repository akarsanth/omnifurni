import React from "react";

// Component Import
import DetailsUpdate from "./DetailsUpdate";
import PasswordUpdate from "./PasswordUpdate";

////////////////////////////////
// MUI Components
import Box from "@mui/material/Box";

////////////////////////////////////
// MAIN COMPONENT
const AccountDetails = () => {
  return (
    <Box>
      <DetailsUpdate />
      <PasswordUpdate />
    </Box>
  );
};

export default AccountDetails;

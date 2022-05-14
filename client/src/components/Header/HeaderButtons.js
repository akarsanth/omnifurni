import React from "react";

import { Link as RouterLink } from "react-router-dom";

//////////////////////////////////
// MUI imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

const HeaderButtons = () => {
  return (
    <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
      <Link to="login" component={RouterLink} underline="none">
        <Button variant="outlined">Login</Button>
      </Link>
      <Link to="register" component={RouterLink} underline="none">
        <Button variant="contained" disableElevation>
          Register
        </Button>
      </Link>
    </Box>
  );
};

export default HeaderButtons;

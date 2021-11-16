import React from "react";
import Grid from "@mui/material/Grid";

// MUI import
import Link from "@mui/material/Link";

/////////////////////////////////
// Styled Components
import { styled } from "@mui/material/styles";

export const FormLink = styled(Link)(({ theme }) => ({
  "&:hover": {
    color: theme.palette.text.primary,
  },
}));

const FormContainer = ({ children }) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 6, mb: 6 }}
    >
      <Grid
        item
        xs={12}
        md={8}
        lg={5.5}
        sx={{
          py: 3,
          px: { xs: 2, sm: 5 },
          border: "primary.main",
          boxShadow: 2,
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default FormContainer;

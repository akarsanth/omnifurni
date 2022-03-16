import React from "react";
import Grid from "@mui/material/Grid";

// MUI import
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

/////////////////////////////////
// Styled Components
import { styled } from "@mui/material/styles";

export const FormLink = styled(Link)(({ theme }) => ({
  "&:hover": {
    color: theme.palette.text.primary,
  },
}));

export const NameFields = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
}));

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 8, mb: 10 }}
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
    </Container>
  );
};

export default FormContainer;

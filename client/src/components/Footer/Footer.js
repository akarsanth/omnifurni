import React from "react";

import { Link as RouterLink } from "react-router-dom";
import { SocialIcon } from "react-social-icons";

///////////////////////////////////
// Components
import Subscribe from "./Subscribe";

///////////////////////////////////
// MUI imports
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

// logo
import logo from "../../assets/omnifurni.png";
import cod from "../../assets/cod.png";
import khalti from "../../assets/khalti.png";

///////////////////////////////////
// Styled Components
import { styled } from "@mui/material/styles";

const MainFooter = styled(Box)(({ theme }) => ({
  // boxShadow: "0 -2px 2px rgb(0 0 0 / 5%), 0 -4px 2px rgb(0 0 0 / 5%)",
  borderTop: "1px solid #eee",
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  // backgroundColor: "#f7f8f3",
  backgroundColor: "#faf6f2",
}));

const BrandLogo = styled("img")`
  height: 55px;
  width: auto;
`;

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.grey[600],
  textDecoration: "none",
  display: "block",
  fontFamily: theme.typography.fontFamily,
  fontWeight: 500,

  ":hover": {
    color: theme.palette.grey[700],
  },
}));

const FooterLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

const SecondaryFooter = styled(Box)(({ theme }) => ({
  // boxShadow: "0 -2px 4px rgb(0 0 0 / 5%), 0 -4px 2px rgb(0 0 0 / 5%)",
  borderTop: "1px solid #eee",
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
}));

const FooterHeading = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(3),
  fontWeight: 600,
  color: theme.palette.grey[700],
}));

const Footer = () => {
  return (
    <Box sx={{ mt: "auto" }}>
      <MainFooter>
        <Container sx={{ flexGrow: 1 }}>
          <Subscribe />
          <Grid
            container
            // sx={{
            //   display: "grid",
            //   gridAutoFlow: "column",
            //   gridAutoColumns: "1fr",
            //   gap: 6,
            // }}
            spacing={{ xs: 2, sm: 5, md: 3 }}
            columns={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={1} sm={1} md={1}>
              <Link
                component={RouterLink}
                to="/"
                sx={{ display: "block", mb: 2 }}
              >
                <BrandLogo src={logo} />
              </Link>

              <FooterLinks>
                <Typography variant="body1" sx={{ color: "grey.600" }}>
                  Address: Pokhara, Ranipauwa-11
                </Typography>
                <FooterLink href="#">Phone: 061-555423</FooterLink>

                <FooterLink href="mailto:hello@omnifurni.com">
                  hello@omnifurni.com
                </FooterLink>
              </FooterLinks>

              <Box sx={{ display: "flex", gap: 1 }}>
                <SocialIcon
                  url="https://instagram.com"
                  style={{ height: 32, width: 32 }}
                  target="_blank"
                  bgColor="#767676"
                />
                <SocialIcon
                  url="https://twitter.com/jaketrent"
                  style={{ height: 32, width: 32 }}
                  target="_blank"
                  bgColor="#767676"
                />
                <SocialIcon
                  url="https://facebook.com"
                  style={{ height: 32, width: 32 }}
                  target="_blank"
                  bgColor="#767676"
                />
              </Box>
            </Grid>
            <Grid item xs={1} sm={1} md={1}>
              <FooterHeading>Omnifurni</FooterHeading>

              <FooterLinks>
                <FooterLink component={RouterLink} to="/about">
                  About Omnifurni
                </FooterLink>

                <FooterLink component={RouterLink} to="/faq">
                  FAQ
                </FooterLink>

                <FooterLink component={RouterLink} to="/privacy">
                  Privacy Policy
                </FooterLink>
              </FooterLinks>
            </Grid>

            <Grid item xs={1} sm={1} md={1}>
              <FooterHeading>Customer Service</FooterHeading>

              <FooterLinks>
                <FooterLink component={RouterLink} to="/account/dashboard">
                  My Account
                </FooterLink>

                <FooterLink component={RouterLink} to="/contact">
                  Contact Us
                </FooterLink>
              </FooterLinks>
            </Grid>
          </Grid>
        </Container>
      </MainFooter>
      <SecondaryFooter>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2">
            Copyright &copy; 2022 by Omnifurni
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <img src={cod} alt="COD" />
            <img src={khalti} alt="Khalti logo" />
          </Box>
        </Container>
      </SecondaryFooter>
    </Box>
  );
};

export default Footer;

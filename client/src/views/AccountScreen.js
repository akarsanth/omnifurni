import React, { useState, useEffect } from "react";

import {
  Link as RouterLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

/////////////////////////////////////
// Redux
import { useDispatch } from "react-redux";
import { logout } from "../app/features/authUser/authUser-actions";

//////////////////////////////////////
// MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

/////////////////////////////////////
// Custom Components
import CustomizedGrid from "../components/Grid/CustomizedGrid";

/////////////////////////////////////
// Styled components
import { styled } from "@mui/material/styles";

const AccountScreenHeader = styled(Box)(({ theme }) => ({
  height: 120,
  backgroundColor: theme.palette.secondary.main,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  padding: `${theme.spacing(3)} 0`,
  textAlign: "center",
  marginBottom: theme.spacing(5),
}));

// const indexText = ["Dashboard", "Orders", "Address", "Account Details"];
const locationList = {
  dashboard: {
    index: 0,
    text: "Dashboard",
  },

  orders: {
    index: 1,
    text: "Orders",
  },

  address: {
    index: 2,
    text: "Address",
  },

  details: {
    index: 3,
    text: "Account Details",
  },

  vieworder: {
    index: 4,
    text: "View Order",
  },
};

//////////////////////////////////////////
// MAIN COMPONENT
const AccountScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedList, setSelectedList] = useState("Dashboard");
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    // getting the current path from the url
    const list = location.pathname.split("/")[2];

    if (list) {
      setSelectedList(locationList[list].text);
      setSelectedIndex(locationList[list].index);
    } else {
      navigate("/account/dashboard");
    }
  }, [location.pathname, navigate]);

  // To handle nav change
  // const handleListItemClick = (event, index) => {
  //   setSelectedIndex(index);
  //   setSelectedList(indexText[index]);
  // };

  // logout handler
  const logoutHandler = (e) => {
    dispatch(logout());
  };

  return (
    <Box>
      <AccountScreenHeader>
        <Box>
          <Typography variant="h6" sx={{ pb: 1, fontWeight: 700 }}>
            My Account
          </Typography>
          <Typography variant="body1">{selectedList}</Typography>
        </Box>
      </AccountScreenHeader>

      <Container>
        <CustomizedGrid
          container
          spacing={2}
          columns={{ xs: 1, md: 2 }}
          sx={{ mb: 8, mt: 0 }}
        >
          <Grid item xs={1} md={0.5} sx={{ mb: 3 }}>
            <Box sx={{ bgcolor: "#fff", border: 2, borderColor: "#eee" }}>
              <List
                component="nav"
                aria-label="My Account Page navigation"
                sx={{ py: 2 }}
              >
                <Link
                  to="/account/dashboard"
                  component={RouterLink}
                  underline="none"
                >
                  <ListItemButton
                    selected={selectedIndex === 0}
                    // onClick={(event) => handleListItemClick(event, 0)}
                  >
                    <ListItemText primary="Dashboard" />
                  </ListItemButton>
                </Link>

                <Link
                  to="/account/orders"
                  component={RouterLink}
                  underline="none"
                >
                  <ListItemButton
                    selected={selectedIndex === 1 || selectedIndex === 4}
                    // onClick={(event) => handleListItemClick(event, 1)}
                  >
                    <ListItemText primary="Orders" />
                  </ListItemButton>
                </Link>

                <Link
                  to="/account/address"
                  component={RouterLink}
                  underline="none"
                >
                  <ListItemButton
                    selected={selectedIndex === 2}
                    // onClick={(event) => handleListItemClick(event, 2)}
                  >
                    <ListItemText primary="Address" />
                  </ListItemButton>
                </Link>

                <Link
                  to="/account/details"
                  component={RouterLink}
                  underline="none"
                >
                  <ListItemButton
                    selected={selectedIndex === 3}
                    // onClick={(event) => handleListItemClick(event, 3)}
                  >
                    <ListItemText primary="Account Details" />
                  </ListItemButton>
                </Link>

                <ListItemButton onClick={logoutHandler}>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </List>
            </Box>
          </Grid>
          <Grid item xs={1} md={1.5}>
            <Box
              sx={{
                bgcolor: "#fff",
                border: 2,
                borderColor: "#eee",
                p: 2,
                height: "100%",
              }}
            >
              <Outlet />
            </Box>
          </Grid>
        </CustomizedGrid>
      </Container>
    </Box>
  );
};

export default AccountScreen;

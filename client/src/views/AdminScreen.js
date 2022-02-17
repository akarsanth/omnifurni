import React, { useState, useEffect } from "react";

import {
  Link as RouterLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

//////////////////////////////////////
// MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

/////////////////////////////////////
// Styled components
import { styled } from "@mui/material/styles";

const AdminScreenHeader = styled(Box)(({ theme }) => ({
  height: 100,
  backgroundColor: theme.palette.secondary.main,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  padding: `${theme.spacing(2)} 0`,
  textAlign: "center",
  marginBottom: theme.spacing(2),
}));

const locationList = {
  dashboard: {
    index: 0,
    text: "Dashboard",
  },

  productlist: {
    index: 1,
    text: "Product List",
  },

  categorylist: {
    index: 2,
    text: "Category List",
  },

  orderlist: {
    index: 3,
    text: "Order List",
  },

  userlist: {
    index: 4,
    text: "User List",
  },
};

const AdminScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedList, setSelectedList] = useState("Dashboard");
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    // getting the current path from the url
    const list = location.pathname.split("/")[2];

    if (list) {
      setSelectedList(locationList[list].text);
      setSelectedIndex(locationList[list].index);
    } else {
      navigate("/admin/dashboard");
    }
  }, [location.pathname, navigate]);

  return (
    <Box>
      <AdminScreenHeader>
        <Box>
          <Typography variant="h6" sx={{ pb: 1, fontWeight: 700 }}>
            Admin Interface
          </Typography>
          <Typography variant="body1">{selectedList}</Typography>
        </Box>
      </AdminScreenHeader>

      <Container>
        <Box
          sx={{
            bgcolor: "#fff",
            border: 2,
            borderColor: "#eee",
            width: { sm: "60%", md: "50%", lg: "35%" },
            marginX: "auto",
            marginBottom: 2,
          }}
        >
          <List
            component="nav"
            aria-label="My Account Page navigation"
            sx={{ py: 0 }}
          >
            <Link to="/admin/dashboard" component={RouterLink} underline="none">
              <ListItemButton
                selected={selectedIndex === 0}
                // onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </Link>

            <Link
              to="/admin/productlist"
              component={RouterLink}
              underline="none"
            >
              <ListItemButton
                selected={selectedIndex === 1}
                // onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemText primary="Product" />
              </ListItemButton>
            </Link>

            <Link
              to="/admin/categorylist"
              component={RouterLink}
              underline="none"
            >
              <ListItemButton
                selected={selectedIndex === 2}
                // onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemText primary="Category" />
              </ListItemButton>
            </Link>

            <Link to="/admin/orderlist" component={RouterLink} underline="none">
              <ListItemButton
                selected={selectedIndex === 3}
                // onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemText primary="Order" />
              </ListItemButton>
            </Link>

            <Link to="/admin/userlist" component={RouterLink} underline="none">
              <ListItemButton
                selected={selectedIndex === 4}
                // onClick={(event) => handleListItemClick(event, 3)}
              >
                <ListItemText primary="User" />
              </ListItemButton>
            </Link>
          </List>
        </Box>
        <Box
          sx={{
            bgcolor: "#fff",
            border: 2,
            borderColor: "#eee",
            p: 2,
            pb: 6,
            height: "100%",
            mb: 8,
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
};

export default AdminScreen;

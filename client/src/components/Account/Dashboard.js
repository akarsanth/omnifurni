import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

/////////////////////////////////////
// MUI Components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

// Links
const links = [
  {
    id: 1,
    text: "Orders",
    to: "/account/orders",
  },

  {
    id: 2,
    text: "Address",
    to: "/account/address",
  },

  {
    id: 3,
    text: "Account Details",
    to: "/account/details",
  },
];

/////////////////////////////////////
// MAIN Component
const Dashboard = () => {
  const { first_name, last_name, email } = useSelector(
    (state) => state.authUser.userInfo
  );

  return (
    <Box>
      <Typography sx={{ pb: 2 }}>
        Hello{" "}
        <span
          style={{ fontWeight: 700 }}
        >{`${first_name} ${last_name}! (${email})`}</span>
      </Typography>

      <Typography variant="body2">
        From this account page you can view your recent orders, manage shipping
        address, and edit your account details and password.
      </Typography>

      <Box sx={{ mt: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
        {links.map((link) => {
          return (
            <Box key={link.id}>
              <Link component={RouterLink} to={link.to} underline="none">
                <Button variant="outlined">{link.text}</Button>
              </Link>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Dashboard;

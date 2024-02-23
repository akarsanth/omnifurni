import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

////////////////////////////////
// MUI Components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

// Links
const links = [
  {
    id: 1,
    text: "Product",
    to: "/admin/productlist",
  },

  {
    id: 2,
    text: "Category",
    to: "/admin/categorylist",
  },

  {
    id: 3,
    text: "Order",
    to: "/admin/orderlist",
  },
  {
    id: 4,
    text: "User",
    to: "/admin/userlist",
  },
];

/////////////////////////////////////
// MAIN Component
const Dashboard = () => {
  const { first_name, last_name } = useSelector(
    (state) => state.authUser.userInfo
  );

  return (
    <div>
      <Typography sx={{ pb: 2 }}>
        Hello{" "}
        <span style={{ fontWeight: 700 }}>{`${first_name} ${last_name}!`}</span>
      </Typography>

      <Typography variant="body2">
        From this admin page you can view products, categories, users, and
        orders.
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
    </div>
  );
};

export default Dashboard;

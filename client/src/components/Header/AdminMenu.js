import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "@mui/material/Link";

//////////////////////////////////////
// Menu Items
const menuItems = [
  {
    link: "/admin/dashboard",
    text: "Dashboard",
  },
  {
    link: "/admin/productlist",
    text: "Product",
  },
  {
    link: "/admin/categorylist",
    text: "Category",
  },
  {
    link: "/admin/orderlist",
    text: "Order",
  },
  {
    link: "/admin/userlist",
    text: "User",
  },
];

//////////////////////////////////////
// MAIN COMPONENT
const AdminMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls="fade-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Admin
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {menuItems.map((item) => {
          return (
            <MenuItem onClick={handleClose} key={item.text} sx={{ p: 0 }}>
              <Link
                to={item.link}
                component={RouterLink}
                underline="none"
                sx={{
                  display: "flex",
                  width: "100%",
                  pl: 2,
                  pr: 2,
                  py: 1,
                }}
                color="grey.900"
              >
                {item.text}
              </Link>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default AdminMenu;

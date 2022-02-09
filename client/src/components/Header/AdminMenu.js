import * as React from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Fade from "@mui/material/Fade";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Logout from "@mui/icons-material/Logout";
import Link from "@mui/material/Link";

const AdminMenu = () => {
  const dispatch = useDispatch();

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
        <MenuItem onClick={handleClose}>
          <Link
            to="/admin/dashboard"
            component={RouterLink}
            underline="none"
            sx={{ display: "flex", alignItems: "center" }}
            color="grey.900"
          >
            Dashboard
          </Link>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Link
            to="/admin/productlist"
            component={RouterLink}
            underline="none"
            sx={{ display: "flex", alignItems: "center" }}
            color="grey.900"
          >
            Product
          </Link>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Link
            to="/admin/categorylist"
            component={RouterLink}
            underline="none"
            sx={{ display: "flex", alignItems: "center" }}
            color="grey.900"
          >
            Category
          </Link>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Link
            to="/admin/orderlist"
            component={RouterLink}
            underline="none"
            sx={{ display: "flex", alignItems: "center" }}
            color="grey.900"
          >
            Order
          </Link>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Link
            to="/admin/userlist"
            component={RouterLink}
            underline="none"
            sx={{ display: "flex", alignItems: "center" }}
            color="grey.900"
          >
            User
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AdminMenu;

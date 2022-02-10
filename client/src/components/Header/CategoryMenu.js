import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

///////////////////////////////
// Redux Related
import { useSelector } from "react-redux";

/////////////////////////////////////////////
// MUI Components
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "@mui/material/Link";

// }));

export default function CategoryMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // For category menu
  const { categories } = useSelector((state) => state.categoryList);

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls="demo-customized-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Categories
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
        {categories.map((category) => {
          return (
            <MenuItem
              onClick={handleClose}
              key={category.category_id}
              sx={{ p: 0 }}
            >
              <Link
                to={`category/${category.category_id}`}
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
                {category.name}
              </Link>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

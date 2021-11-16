import React from "react";

//////////////////////////////////
// MUI imports
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
/////////////////////////////////
// Styled Components
import { styled, alpha } from "@mui/material/styles";

///////////////////////////////////////////
// Search Component
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: `0.5px solid ${theme.palette.grey[100]}`,
  borderRadius: "25px",
  borderColor: theme.palette.secondary.main,
  backgroundColor: alpha(theme.palette.primary.main, 0.03),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.06),
  },

  marginRight: "auto",
  [theme.breakpoints.up("md")]: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    width: "100%",
  },

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
  },
  width: "100%",
}));
// Search Component
////////////////////////////////////////////////

const DesktopSearchBar = () => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon color="text.secondary" />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search product...."
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
};

export default DesktopSearchBar;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//////////////////////////////////
// MUI imports
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
/////////////////////////////////
// Styled Components
import { styled, alpha } from "@mui/material/styles";

///////////////////////////////////////////
// Search Component
const Search = styled("div")(({ theme }) => ({
  // position: "relative",
  border: `0.5px solid ${theme.palette.grey[100]}`,
  borderRadius: "25px",
  borderColor: theme.palette.secondary.main,
  backgroundColor: alpha(theme.palette.primary.main, 0.03),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.06),
  },

  marginRight: "auto",
  [theme.breakpoints.up("md")]: {
    // marginLeft: theme.spacing(3),
    // marginRight: theme.spacing(3),
    // width: "100%",
    flexGrow: 1,
  },

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  overflow: "hidden",
}));

const Form = styled("form")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SearchIconButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0),
  height: "100%",
  pointerEvents: "cursor",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,

  "&:hover": {
    backgroundColor: "transparent",
  },

  transform: `translateX(-${theme.spacing(0.5)})`,
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),

    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
  },
  width: "100%",
  transform: `translateX(-${theme.spacing(1.5)})`,
}));

// Search Component
////////////////////////////////////////////////
const DesktopSearchBar = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();

    if (!searchText) return;

    navigate(`/search/?q=${searchText.trim()}`);

    setSearchText("");
  };
  return (
    <Search>
      <Form onSubmit={searchHandler} noValidate autoComplete="off">
        <SearchIconButton disabled={!searchText}>
          <SearchIcon />
        </SearchIconButton>
        <StyledInputBase
          placeholder="Search products...."
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
      </Form>
    </Search>
  );
};

export default DesktopSearchBar;

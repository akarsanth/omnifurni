import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

//////////////////////////////////
// Redux
import { useSelector, useDispatch } from "react-redux";
import { fetchCartData } from "../../app/features/cart/cart-actions";

/////////////////////////////////
// Components
import HeaderButtons from "./HeaderButtons";
import DesktopSearchBar from "./DesktopSearch";
import CategoryMenu from "./CategoryMenu";
import MyAccountMenu from "./MyAccountMenu";

//////////////////////////////////
// MUI imports
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Link from "@mui/material/Link";
// import { SwipeableDrawer } from "@mui/material";

// navbar logo
import logo from "../../assets/omnifurni.png";

/////////////////////////////////
// Styled Components
import { styled } from "@mui/material/styles";

const BrandLogo = styled("img")`
  height: 55px;
  width: auto;
`;

const LogoBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const HeaderRight = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(2)};
`;

const NavBar = styled(AppBar)({
  boxShadow: "0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%)",
});

/////////////////////////////////
// Header Component
const Header = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.authUser);

  const { totalQuantity } = useSelector((state) => state.cart);

  const { token } = useSelector((state) => state.token);

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchCartData(token));
    }
  }, [userInfo, dispatch, token]);

  return (
    <Box>
      <NavBar
        position="static"
        sx={{
          color: "text.primary",
          bgcolor: "background.paper",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container>
          <Toolbar disableGutters sx={{ display: "flex", gap: 4 }}>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ display: { md: "none" } }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>

            <LogoBox>
              <Link to="/" component={RouterLink}>
                <BrandLogo src={logo} alt="brand logo" />
              </Link>
            </LogoBox>

            <CategoryMenu />

            <DesktopSearchBar />

            <HeaderRight>
              {/* search icon for mobile view */}
              <IconButton
                edge="start"
                aria-label="search"
                sx={{ display: { md: "none" } }}
              >
                <SearchOutlinedIcon />
              </IconButton>

              {/* <SwipeableDrawer fullWidth></SwipeableDrawer> */}

              {/* Cart Icon */}
              <IconButton
                edge="start"
                aria-label="menu"
                component={RouterLink}
                to="/cart"
              >
                <Badge badgeContent={totalQuantity} color="primary" showZero>
                  <ShoppingCartOutlinedIcon fontSize="medium" />
                </Badge>
              </IconButton>

              {/* Materil UI Link (all styling) but works like RouterLink */}

              {userInfo ? <MyAccountMenu /> : <HeaderButtons />}
            </HeaderRight>
          </Toolbar>
        </Container>
      </NavBar>
    </Box>
  );
};

export default Header;

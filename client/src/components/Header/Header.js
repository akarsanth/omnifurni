import React, { useEffect } from "react";

import { Link as RouterLink, useNavigate } from "react-router-dom";

//////////////////////////////////
// Redux Related
import { useSelector, useDispatch } from "react-redux";
import { fetchCartData } from "../../app/features/cart/cart-actions";
import { getCategoryList } from "../../app/features/category/category-actions";
import { logout } from "../../app/features/authUser/authUser-actions";

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
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import Collapse from "@mui/material/Collapse";

// navbar logo
import logo from "../../assets/omnifurni.png";

/////////////////////////////////
// Styled Components
import { styled } from "@mui/material/styles";
import AdminMenu from "./AdminMenu";

const BrandLogo = styled("img")`
  height: 50px;
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

const ListItemBtn = styled(ListItemButton)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.grey[200]}`,
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}));

/////////////////////////////////
// Header Component
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, userInfo } = useSelector((state) => state.authUser);

  const { totalQuantity } = useSelector((state) => state.cart);

  // For category menu
  const { categories } = useSelector((state) => state.categoryList);

  // To fetch cart
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     dispatch(fetchCartData(token));
  //   }
  // }, [isAuthenticated, dispatch, token]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCartData());
    }
  }, [isAuthenticated, dispatch]);

  // To fetch category list
  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

  // Drawer
  const [drawerState, setDrawerState] = React.useState(false);

  const toggleDrawer = (value) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      console.log("inside if");
      return;
    }

    setDrawerState(value);
  };

  // To handle side drawer links
  const handleListItemClick = (path) => {
    navigate(path);
    setDrawerState(false);
  };

  // Side drawer category nested list
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

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
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              gap: {
                xs: 1,
                sm: 4,
              },
            }}
          >
            {/* Menu Icon */}
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ display: { md: "none" } }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon fontSize="lg" />
            </IconButton>

            {/* Drawer */}
            <Drawer
              sx={{
                width: 260,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: 260,
                  boxSizing: "border-box",
                },
              }}
              open={drawerState}
              onClose={toggleDrawer(false)}
            >
              <List>
                <ListItem sx={{ height: 100 }}>
                  {/* <ListItemText primary="Home" /> */}
                  <DesktopSearchBar
                    mobile={true}
                    setDrawerState={setDrawerState}
                  />
                </ListItem>

                <ListItemBtn onClick={() => handleListItemClick("/")}>
                  <ListItemText primary="Home" />
                </ListItemBtn>

                {/* Category nested list */}
                <ListItemButton onClick={handleClick}>
                  <ListItemText primary="Categories" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {categories.map(({ category_id, name }) => (
                      <ListItemBtn
                        sx={{ ml: 4 }}
                        onClick={() =>
                          handleListItemClick(`/category/${category_id}`)
                        }
                        key={category_id}
                      >
                        <ListItemText primary={name} />
                      </ListItemBtn>
                    ))}
                  </List>
                </Collapse>

                <ListItemBtn onClick={() => handleListItemClick("/contact")}>
                  <ListItemText primary="Contact Us" />
                </ListItemBtn>

                {isAuthenticated && (
                  <ListItemBtn onClick={() => dispatch(logout())}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItemBtn>
                )}

                {!isAuthenticated && (
                  <>
                    <ListItemBtn onClick={() => handleListItemClick("/login")}>
                      <ListItemText primary="Login" />
                    </ListItemBtn>

                    <ListItemBtn
                      onClick={() => handleListItemClick("/register")}
                    >
                      <ListItemText primary="Register" />
                    </ListItemBtn>
                  </>
                )}
              </List>
            </Drawer>

            {/* Logo Box */}
            <LogoBox>
              <Link to="/" component={RouterLink}>
                <BrandLogo src={logo} alt="brand logo" />
              </Link>
            </LogoBox>

            <CategoryMenu />

            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },

                flexGrow: {
                  md: 1,
                },
              }}
            >
              <DesktopSearchBar />
            </Box>

            <HeaderRight>
              {/* search icon for mobile view */}
              {/* <IconButton
                edge="start"
                aria-label="search"
                sx={{ display: { md: "none" } }}
              >
                <SearchOutlinedIcon />
              </IconButton> */}

              {/* <SwipeableDrawer fullWidth></SwipeableDrawer> */}

              {/* Account Icon */}
              <IconButton
                edge="start"
                aria-label="menu"
                component={RouterLink}
                to="/account"
                sx={{
                  display: {
                    sm: "none",
                  },
                }}
              >
                <PersonOutlinedIcon sx={{ fontSize: 28 }} />
              </IconButton>

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

              {/* Material UI Link (all styling) but works like RouterLink */}

              {isAuthenticated ? <MyAccountMenu /> : <HeaderButtons />}
              {userInfo && userInfo.isAdmin && <AdminMenu />}
            </HeaderRight>
          </Toolbar>
        </Container>
      </NavBar>
    </Box>
  );
};

export default Header;

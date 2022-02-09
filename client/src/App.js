import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ProtectedRoutes from "./ProtectedRoutes";

/////////////////////////////////////////
// Redux
import { getToken } from "./app/features/token/token-actions";
import { fetchAuthUser } from "./app/features/authUser/authUser-actions";

////////////////////////////////////////
// MUI imports
import Box from "@mui/material/Box";

// Styles
import { createTheme, ThemeProvider } from "@mui/material/styles";

///////////////////////////////////////////
// CUSTOM COMPONENTS
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer.js";
import HomeScreen from "./views/HomeScreen";
import CartScreen from "./views/CartScreen";
import LoginScreen from "./views/LoginScreen";
import RegisterScreen from "./views/RegisterScreen";
import ActivationEmail from "./views/ActivationEmail";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
import ProductScreen from "./views/ProductScreen";
import CategoryScreen from "./views/CategoryScreen";

// Account Screen
import AccountScreen from "./views/AccountScreen";
import AccountDashboard from "./components/Account/Dashboard";
import Orders from "./components/Account/Orders";
import Address from "./components/Account/Address/index";
import AccountDetails from "./components/Account/AccountDetails/index.js";

// Admin Screen
import AdminScreen from "./views/AdminScreen";
import AdminDashboard from "./components/AdminScreen/Dashboard";
import CategoryList from "./components/AdminScreen/CategoryList";
import UserList from "./components/AdminScreen/UserList";
import ProductList from "./components/AdminScreen/ProductList";
import OrderList from "./components/AdminScreen/OrderList";

/////////////////////////////////////////
// MUI
import { CssBaseline } from "@mui/material";
import BasicTable from "./tables/BasicTable";

//////////////////////////////////////////
// Component Import
import Message from "./components/Message";

const theme = createTheme({
  palette: {
    primary: {
      main: "#087f5b",
    },

    secondary: {
      main: "#cda07d",
    },
  },

  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,

    allVariants: {
      color: "#444",
    },
  },

  shape: {
    borderRadius: 2,
  },
});

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);

  const { isAuthenticated } = useSelector((state) => state.authUser);

  const { success, error } = useSelector((state) => state.message);

  // when isAuthenticated is changed
  // i.e. login status is changed
  useEffect(() => {
    // When the app loads if there is no firstLogin
    // It is not possible to get the access token
    // And without access token it is not possible to get user info

    const firstLogin = localStorage.getItem("firstLogin");

    if (firstLogin) {
      // To get Access token
      dispatch(getToken());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    // if token is present
    if (token) {
      dispatch(fetchAuthUser(token));
    }
  }, [token, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Router>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Header />
            {/* <Container> */}
            <Routes>
              <Route path="/" element={<HomeScreen />} exact />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/forgot" element={<ForgotPassword />} />
              <Route
                path="/user/activate/:activationToken"
                element={<ActivationEmail />}
                exact
              />
              <Route
                path="/user/reset/:token"
                element={<ResetPassword />}
                exact
              />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/category/:id" element={<CategoryScreen />} />

              {/* PROTECTED ROUTES */}
              <Route element={<ProtectedRoutes />}>
                <Route path="/cart" element={<CartScreen />} />

                {/* Account Screen */}
                <Route path="/account" element={<AccountScreen />}>
                  <Route path="dashboard" element={<AccountDashboard />} />
                  <Route path="address" element={<Address />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="details" element={<AccountDetails />} />
                </Route>

                {/* Admin Screen */}
                <Route path="/admin" element={<AdminScreen />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="productlist" element={<ProductList />} />
                  <Route path="categorylist" element={<CategoryList />} />
                  <Route path="orderlist" element={<OrderList />} />
                  <Route path="userlist" element={<UserList />} />
                </Route>
              </Route>
            </Routes>
            {/* </Container> */}
            <Footer />

            {/* Global message component */}
            {success && <Message message={success} />}
          </Box>
        </Router>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;

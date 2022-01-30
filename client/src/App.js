import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ProtectedRoutes from "./ProtectedRoutes";

////////////////////////////
// Redux
import { getToken } from "./app/features/token/token-actions";
import { fetchAuthUser } from "./app/features/authUser/authUser-actions";

///////////////////////////
// MUI imports
import Box from "@mui/material/Box";

// Styles
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Custom Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer.js";
import HomeScreen from "./views/HomeScreen";
import CartScreen from "./views/CartScreen";
import LoginScreen from "./views/LoginScreen";
import RegisterScreen from "./views/RegisterScreen";
import ActivationEmail from "./views/ActivationEmail";
import AccountScreen from "./views/AccountScreen";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
import ProductScreen from "./views/ProductScreen";
import CategoryScreen from "./views/CategoryScreen";
import { CssBaseline } from "@mui/material";

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
      color: "#555",
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

  // when isAuthenticated is changed
  // i.e. login status is changed
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");

    if (firstLogin) {
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
                <Route path="/account" element={<AccountScreen />} />
              </Route>
            </Routes>
            {/* </Container> */}
            <Footer />
          </Box>
        </Router>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

///////////////////////////
// MUI imports
import Container from "@mui/material/Container";

// Styles
import { createTheme, ThemeProvider } from "@mui/material/styles";
// Custom Components
import Header from "./components/Header/Header";
import HomeScreen from "./views/HomeScreen";
import CartScreen from "./views/CartScreen";
import LoginScreen from "./views/LoginScreen";
import RegisterScreen from "./views/RegisterScreen";

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
  },

  shape: {
    borderRadius: 2,
  },
});

function App() {
  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="cart" element={<CartScreen />} />
            <Route path="login" element={<LoginScreen />} />
            <Route path="register" element={<RegisterScreen />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;

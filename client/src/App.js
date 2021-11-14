import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// MUI components
import Typography from "@mui/material/Typography";

// theming
const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Typography>Hello I am under the water save me</Typography>
    </ThemeProvider>
  );
}

export default App;

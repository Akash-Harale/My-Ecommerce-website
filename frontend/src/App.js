import {
  BrowserRouter,
  Routes,
  Route,

  Navigate,
} from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { Register } from "scenes/registerPage";
import { Cart } from "scenes/cart";
import Navbar from "scenes/navbar";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = useSelector((store) => store.user);
  // const navigate= useNavigate();

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box mb="90px">
            <Navbar />
          </Box>
          <Box>
            <Routes>
              <Route
                path="/cart"
                element={isAuth ? <Cart /> : <Navigate to="/login" />}
              />

              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

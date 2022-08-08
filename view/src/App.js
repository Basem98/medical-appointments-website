import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import Specialists from "./Pages/Specialists/Specialists";
import NavBar from "./Components/Navbar/NavBar";
import { useState } from "react";
import { Grid } from "@mui/material";
import PasswordChangeForm from './Components/PasswordChangeForm/PasswordChangeForm';

function App() {
  const [navbarStyle, setNavbarStyle] = useState({
    backgroundColor: "inherit",
    position: "fixed",
  });

  const handleNavbarStyle = (navbarStyle) => {
    setNavbarStyle(navbarStyle);
  };

  return (
    <Grid container sx={{minHeight: '100vh'}}>
      <NavBar {...navbarStyle} />
      <Routes>
        <Route
          path="/"
          element={<Home handleNavbarStyle={handleNavbarStyle} />}
        />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route
          path="/specialists"
          element={<Specialists handleNavbarStyle={handleNavbarStyle} />}
        />
        <Route
          path="/forgotpassword/:token"
          element={<PasswordChangeForm />}
        />
      </Routes>
      <Footer />
    </Grid>
  );
}

export default App;

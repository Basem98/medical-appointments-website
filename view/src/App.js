import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import Specialists from "./Pages/Specialists/Specialists";
import NavBar from "./Components/Navbar/NavBar";
import { useState } from "react";
import PasswordChangeForm from './Components/PasswordChangeForm/PasswordChangeForm';
import UserProfile from "./Pages/UserProfile/UserProfile";
import Appointments from "./Pages/UserProfile/Appointments";

function App() {
  const [navbarStyle, setNavbarStyle] = useState({
    backgroundColor: "inherit",
    position: "fixed",
  });

  const handleNavbarStyle = (navbarStyle) => {
    setNavbarStyle(navbarStyle);
  };

  return (
    <>
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
        <Route 
          path="/users/:id/profile"
          element={<UserProfile />}
        />
        <Route 
          path="/users/:id/appointments"
          element={<Appointments />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import Specialists from "./Pages/Specialists/Specialists";
import NavBar from "./Components/Navbar/NavBar";
import { useState } from "react";
import { Grid } from "@mui/material";
import PasswordChangeForm from './Components/PasswordChangeForm/PasswordChangeForm';
import SvgError from './Assets/Images/pagenotfound.svg';
import MailSent from './Assets/Images/mailsent.svg';
import Feedback from "./Components/Feedback/Feedback";
import UserProfile from "./Pages/UserProfile/UserProfile";
import Appointments from "./Pages/UserProfile/Appointments";
import Settings from "./Pages/UserProfile/Settings";
import ChangePassword from "./Pages/UserProfile/ChangePassword";

const errMsg = "Oops! Looks like the page you're looking for couldn't be found.";
const verificationMsg = "Congratulations! Your email has been verified successfully! You can now sign into your account."

function App() {
  const [navbarStyle, setNavbarStyle] = useState({
    backgroundColor: "inherit",
    position: "fixed",
  });

  const handleNavbarStyle = (navbarStyle) => {
    setNavbarStyle(navbarStyle);
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
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
          path="/verification/:role/:token/:userId"
          element={<Feedback msg={verificationMsg}><MailSent/></Feedback>}
        />
        <Route
          path="*"
          element={<Feedback msg={errMsg}><SvgError /></Feedback>}
        />
        <Route
          path="/users/:id/profile"
          element={<UserProfile />}
        />
        <Route
          path="/users/:id/appointments"
          element={<Appointments />}
        />
        <Route
          path="/users/:id/settings"
          element={<Settings
            userData={{
              firstName: "Belal",
              lastName: "Elemligy",
              phoneNumber: "01275223665"
            }}
          />}
        />
        <Route
          path="/users/:id/change-password"
          element={<ChangePassword />}
        />
      </Routes>
      <Footer />
    </Grid>
  );
}

export default App;

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
import UserAppointments from "./Pages/UserProfile/UserAppointments";
import Settings from "./Pages/UserProfile/Settings";
import DoctorProfile from "./Pages/DoctorProfile/DoctorProfile";
import DoctorAppointment from "./Pages/DoctorProfile/DoctorAppointments";
import ChangeUserPassword from "./Pages/UserProfile/ChangeUserPassword";
import ChangeDoctorPassword from "./Pages/DoctorProfile/ChangeDoctorPassword";
import AdminSignInForm from './Pages/AdminDashboard/AdminLoginForm';
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import Statistics from "./Pages/AdminDashboard/Statistics";
import ManageUsers from "./Pages/AdminDashboard/ManageUsers";
import AppointmentsList from "./Pages/AdminDashboard/AppointmentsList";
import LogsList from "./Pages/AdminDashboard/LogsList";
import ManageDoctors from "./Pages/AdminDashboard/ManageDoctors";
import Patients from "./Pages/DoctorProfile/Patients";


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

  const [displayNavFooter, setDisplayNavFooter] = useState(true);

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <NavBar {...navbarStyle} displayNavFooter={displayNavFooter} />
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
          element={<Feedback msg={verificationMsg}><MailSent /></Feedback>}
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
          element={<UserAppointments />}
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
          element={<ChangeUserPassword />}
        />
        <Route
          path="/doctors/:id/profile"
          element={<DoctorProfile />}
        />
        <Route
          path="/doctors/:id/appointments"
          element={<DoctorAppointment />}
        />
        <Route
          path="/doctors/:id/change-password"
          element={<ChangeDoctorPassword />}
        />
        <Route path="/admin" element={<AdminSignInForm setDisplayNavFooter={setDisplayNavFooter}/>}/>
        <Route path="/dashboard" element={<AdminDashboard handleNavbarStyle={handleNavbarStyle} setDisplayNavFooter={setDisplayNavFooter}/>}>
          <Route path="/dashboard/statistics" element={<Statistics />}/>
          <Route path="/dashboard/managedoctors" element={<ManageDoctors />}/>
          <Route path="/dashboard/manageusers" element={<ManageUsers />}/>
          <Route path="/dashboard/appointments" element={<AppointmentsList />}/>
          <Route path="/dashboard/logs" element={<LogsList />}/>
          <Route />
        </Route>
        <Route
          path="/doctors/:id/patients"
          element={<Patients />}
        />
      </Routes>
      <Footer displayNavFooter={displayNavFooter}/>
    </Grid>
  );
}

export default App;

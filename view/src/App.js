import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import Specialists from "./Pages/Specialists/Specialists";
import NavBar from "./Components/Navbar/NavBar";
import { useEffect, useState } from "react";
import { Grid, useTheme } from "@mui/material";
import PasswordChangeForm from './Components/PasswordChangeForm/PasswordChangeForm';
import SvgError from './Assets/Images/pagenotfound.svg';
import MailSent from './Assets/Images/mailsent.svg';
import UnauthorizedSvg from './Assets/Images/unauthorized.svg'
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
import DoctorsDetails from "./Pages/DoctorDetails/DoctorDetails";
import FormModal from "./Components/FormModal/FormModal";
import UserLoginForm from "./Components/UserLoginForm/UserLoginForm";
import UserSignupForm from "./Components/UserSignupForm/UserSignupForm";
import DoctorSignupForm from "./Components/DoctorSignUpForm/DoctorSignUpForm";
import VerificationForm from "./Components/VerificationForm/VerificationForm";
import ContactUs from "./Pages/ContactUs/ContactUs";
import AboutUs from "./Pages/AboutUs/AboutUs"
import ManageApplications from './Pages/AdminDashboard/ManageApplications';

const errMsg = "Oops! Looks like the page you're looking for couldn't be found.";
const verificationMsg = "Congratulations! Your email has been verified successfully! You can now sign into your account."
const unAuthenticatedMsg = "Looks like you don't have access to this page right now. Please sign in, or create an account, either as a user or a doctor."

function App() {
  const theme = useTheme();
  const location = useLocation();

  const navbarStyle = {
    position: '',
    backgroundColor: ''
  };

  switch (location.pathname) {
    case '/':
    case '/home':
      navbarStyle.backgroundColor = theme.palette.heroNavbarBg.main;
      break;
    case '/specialists/details':
      navbarStyle.backgroundColor = theme.palette.detailsNavbarBg.main;
      break;
    default:
      navbarStyle.backgroundColor = theme.palette.highlight.main;
      break;
  }

  const [modalOptions, setModalOptions] = useState({ showModal: false, form: 'UserLoginForm' });

  useEffect(() => {
    if (location.state?.showModal) {
      switch (location.state?.form) {
        case 'UserLoginForm':
        case 'UserSignupForm':
        case 'DoctorSignupForm':
        case 'VerificationForm':
          setModalOptions({ showModal: location.state.showModal, form: location.state.form });
          break;
        default: break;
      }
    }
  }, [location.state]);
  const [displayNavFooter, setDisplayNavFooter] = useState(true);

  return (
    <Grid container sx={{ minHeight: '100vh', flexDirection: 'column', display: 'flex' }}>
      <NavBar {...navbarStyle} displayNavFooter={displayNavFooter} openLoginForm={() => setModalOptions({ showModal: true, form: 'UserLoginForm' })} />
      <FormModal
        openModal={modalOptions.showModal}
        setOpenModal={(showModal) => setModalOptions({ ...modalOptions, showModal: showModal })}
      >
        {
          modalOptions.form === 'UserLoginForm' ?
            <UserLoginForm handleClose={(showModal) => setModalOptions({ ...modalOptions, showModal: showModal })}/>
            : modalOptions.form === 'UserSignupForm' ?
              <UserSignupForm />
              : modalOptions.form === 'DoctorSignupForm' ?
                <DoctorSignupForm />
                : modalOptions.form === 'VerificationForm' ?
                  <VerificationForm />
                  : <UserLoginForm />
        }
      </FormModal>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route
          path="/specialists"
          element={<Specialists />}
        />
        <Route
          path="/specialists/details/:id"
          element={<DoctorsDetails />}
        />
        <Route
          path="/contactus"
          element={<ContactUs />}
        />
        <Route
          path="/about"
          element={<AboutUs />} />
        <Route
          path="/forgotpassword/:token"
          element={<PasswordChangeForm />}
        />
        <Route
          path="/verification/:role/:token/:userId"
          element={<Feedback msg={verificationMsg}><MailSent /></Feedback>}
        />
        <Route
          path="/unauthorized"
          element={<Feedback msg={unAuthenticatedMsg}><UnauthorizedSvg /></Feedback>}
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
          element={<Settings />}
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
        <Route path="/admin" element={<AdminSignInForm setDisplayNavFooter={setDisplayNavFooter} />} />
        <Route path="/dashboard" element={<AdminDashboard setDisplayNavFooter={setDisplayNavFooter} />}>
          <Route path="/dashboard/statistics" element={<Statistics />} />
          <Route path="/dashboard/manageapplications" element={<ManageApplications />} />
          <Route path="/dashboard/managedoctors" element={<ManageDoctors />} />
          <Route path="/dashboard/manageusers" element={<ManageUsers />} />
          <Route path="/dashboard/appointments" element={<AppointmentsList />} />
          <Route path="/dashboard/logs" element={<LogsList />} />
          <Route />
        </Route>
        <Route
          path="/doctors/:id/patients"
          element={<Patients />}
        />

      </Routes>
      <Footer displayNavFooter={displayNavFooter} />
    </Grid>
  );
}

export default App;

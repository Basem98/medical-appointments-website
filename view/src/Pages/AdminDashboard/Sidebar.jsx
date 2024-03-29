import React from "react";
import { NavLink, useNavigate, } from "react-router-dom";
import { useTheme, useMediaQuery, Typography, Button, Grid } from "@mui/material"
import AnalyticsIcon from "@mui/icons-material/Analytics"
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'; import HistoryIcon from '@mui/icons-material/History';
import TableRowsIcon from '@mui/icons-material/TableRows';
import FlakyIcon from '@mui/icons-material/Flaky';
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { removeUserDetails } from "../../Store/Features/UserDetails/userDetailsSlice";
import AccountCircle from '@mui/icons-material/AccountCircle';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const userDetails = useSelector(state => state.userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(userDetails);

  const handleLogout = () => {
    dispatch(removeUserDetails());
    navigate('/admin');
  }

  return (
    <>
      <Grid item md={12} xs={6} sx={{ display: "flex", alignItems: isMobile ? "center" : "flex-start", justifyContent: "center" }}>
        <ul style={{ listStyleType: "none", margin: "30px 0", padding: 0 }}>
          <li style={{ marginBottom: "15px", float: isMobile ? "left" : "" }}>
            <NavLink
              to="/dashboard/statistics"
              style={{
                color: "white",
                textDecoration: "none",
                paddingLeft: "5px",
                display: "flex", alignItems: "center",
              }}
            >
              <AnalyticsIcon fontSize={isMobile ? "large" : "medium"} />
              <span style={{ marginLeft: "7px", display: isMobile ? 'none' : 'inline' }}>
                Statisitcs
              </span>
            </NavLink>
          </li>
          <li style={{ marginBottom: "15px", float: isMobile ? "left" : "" }}>
            <NavLink
              to="/dashboard/managedoctors"
              style={{
                color: "white",
                textDecoration: "none",
                paddingLeft: "5px",
                display: "flex", alignItems: "center",
              }}
            >
              <SupervisedUserCircleIcon fontSize={isMobile ? "large" : "medium"} />
              <span style={{ marginLeft: "7px", display: isMobile ? 'none' : 'inline' }}>
                Manage Doctors
              </span>
            </NavLink>
          </li>
          <li style={{ marginBottom: "15px", float: isMobile ? "left" : "" }}>
            <NavLink
              to="/dashboard/manageapplications"
              style={{
                color: "white",
                textDecoration: "none",
                paddingLeft: "5px",
                display: "flex", alignItems: "center",
              }}
            >
              <FlakyIcon fontSize={isMobile ? "large" : "medium"} />
              <span style={{ marginLeft: "7px", display: isMobile ? 'none' : 'inline' }}>
                Manage Applications
              </span>
            </NavLink>
          </li>

          <li style={{ marginBottom: "15px", float: isMobile ? "left" : "" }}>
            <NavLink
              to="/dashboard/manageusers"
              style={{
                color: "white",
                textDecoration: "none",
                paddingLeft: "5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ManageAccountsIcon fontSize={isMobile ? "large" : "medium"} />
              <span style={{ marginLeft: "7px", display: isMobile ? 'none' : 'inline' }}>
                Manage Users
              </span>
            </NavLink>
          </li>
          <li style={{ marginBottom: "15px", float: isMobile ? "left" : "" }}>
            <NavLink
              to="/dashboard/appointments"
              style={{
                color: "white",
                textDecoration: "none",
                paddingLeft: "5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <HistoryIcon fontSize={isMobile ? "large" : "medium"} />
              <span style={{ marginLeft: "7px", display: isMobile ? 'none' : 'inline' }}>
                Appointments
              </span>
            </NavLink>
          </li>
          <li style={{ marginBottom: "15px", float: isMobile ? "left" : "" }}>
            <NavLink
              to="/dashboard/logs"
              style={{
                color: "white",
                textDecoration: "none",
                paddingLeft: "5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TableRowsIcon fontSize={isMobile ? "large" : "medium"} />
              <span style={{ marginLeft: "7px", display: isMobile ? 'none' : 'inline' }}>
                Logs Details
              </span>
            </NavLink>
          </li>
        </ul>
      </Grid>
      <Grid item md={12} xs={4} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {userDetails.loggedIn &&
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <AccountCircle
              fontSize="large"
              sx={{ color: theme.palette.heroNavbarBg.main, mr: 1 }}
            />
            <Box>
              <Typography variant="h6" fontSize="small">@{userDetails.data.username}</Typography>
              <Button onClick={handleLogout} variant="text" size="small">Logout</Button>
            </Box>
          </Box >}
      </Grid>

    </>
  );
};

export default Sidebar;

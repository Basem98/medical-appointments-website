import React from "react";
import { NavLink, Link } from "react-router-dom";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme, AppBar, Box, Grid } from "@mui/material"
import AnalyticsIcon from "@mui/icons-material/Analytics"
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'; import HistoryIcon from '@mui/icons-material/History';
import TableRowsIcon from '@mui/icons-material/TableRows';
import FlakyIcon from '@mui/icons-material/Flaky';

const Sidebar = () => {
  const theme = useTheme();
  return (
    <ul style={{ listStyleType: "none", margin: "30px 0", padding: 0 }}>
      <li style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
        <AnalyticsIcon />
        <NavLink
          to="/dashboard/statistics"
          style={{
            color: "white",
            textDecoration: "none",
            paddingLeft: "5px",
          }}
        >
          Statisitcs
        </NavLink>
      </li>
      <li style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
        <FlakyIcon />
        <NavLink
          to="/dashboard/managedoctors"
          style={{
            color: "white",
            textDecoration: "none",
            paddingLeft: "5px",
          }}
        >
          Manage Doctors
        </NavLink>
      </li>
      <li style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
        <ManageAccountsIcon />
        <NavLink
          to="/dashboard/manageusers"
          style={{
            color: "white",
            textDecoration: "none",
            paddingLeft: "5px",
          }}
        >
          Manage Users
        </NavLink>
      </li>
      <li style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
        <HistoryIcon />
        <NavLink
          to="/dashboard/appointments"
          style={{
            color: "white",
            textDecoration: "none",
            paddingLeft: "5px",
          }}
        >
          Appointments
        </NavLink>
      </li>
      <li style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
        <TableRowsIcon />
        <NavLink
          to="/dashboard/logs"
          style={{
            color: "white",
            textDecoration: "none",
            paddingLeft: "5px",
          }}
        >
          Logs
        </NavLink>
      </li>
    </ul>
  );
};

export default Sidebar;

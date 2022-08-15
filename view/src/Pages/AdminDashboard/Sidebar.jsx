import React from "react";
import { NavLink, Link } from "react-router-dom";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme, AppBar, Box, Grid } from "@mui/material"
import AnalyticsIcon from "@mui/icons-material/Analytics"
import HandymanIcon from '@mui/icons-material/Handyman';
import HistoryIcon from '@mui/icons-material/History';
import TableRowsIcon from '@mui/icons-material/TableRows';

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
        <HandymanIcon />
        <NavLink
          to="/dashboard/operations"
          style={{
            color: "white",
            textDecoration: "none",
            paddingLeft: "5px",
          }}
        >
          CRUD Operations
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

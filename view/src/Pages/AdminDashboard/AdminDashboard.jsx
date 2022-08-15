import { useEffect } from "react";
import { Outlet } from "react-router-dom";
// import NotFound from "../notFound";
import Sidebar from "./Sidebar";
import { Grid, useTheme } from "@mui/material";

const AdminDashboard = ({ handleNavbarStyle }) => {
  const theme = useTheme();

  useEffect(() => {
    handleNavbarStyle({
      backgroundColor: theme.palette.highlight.main,
      position: "static",
      color: "white",
    });
  }, [])


  return (
    <>
      <Grid item xs={12} container>
        <Grid item md={2} container alignItems="start" justifyContent="center" sx={{ p: 0, m: 0, backgroundColor: "#181c1a", color: "white", height: "100%" }}>
          <Sidebar />
        </Grid>
        <Grid item md={10} container justifyContent="space-evenly">
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default AdminDashboard;

import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { authenticate } from "../../Helper/Authentication";
import Sidebar from "./Sidebar";
import { Grid, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";

const AdminDashboard = ({ setDisplayNavFooter }) => {
  setDisplayNavFooter(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    authenticate("Admin", navigate, dispatch, "/admin");
  }, [])


  return (
    <>
      <Grid item xs={12} container sx={{ minHeight: "100vh" }}>
        <Grid item md={2} container justifyContent="center" alignItems="space-between" sx={{ p: 0, m: 0, backgroundColor: "#181c1a", color: "white", minHeight: "100%" }}>
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

import { Grid } from "@mui/material";
import React from "react";
import CustomerChart from "./customerChart";
import AppointmentsChart from "./AppointmentsChart";
import IncomeChart from "./IncomeChart";
import SignUpChart from "./SignUpChart";

const Statistics = () => {
  return (
    <>
      <Grid item md={8} container justifyContent="space-between">
        <Grid item md={5}>
          <AppointmentsChart />
        </Grid>
        <Grid item md={5}>
          <IncomeChart />
        </Grid>
      </Grid>
      <Grid item md={8} container justifyContent="space-between" className="row row-cols-2 justify-content-evenly justify-content-md-center align-items-stretch mt-3">
        <Grid item md={5}>
          <CustomerChart />
        </Grid>
        <Grid item md={5}>
          <SignUpChart />
        </Grid>
      </Grid>
      {/* <h1>Statistics</h1> */}
    </>
  );
};

export default Statistics;

import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import CustomerChart from "./customerChart";
import AppointmentsChart from "./AppointmentsChart";
import PieChart from "./PieChart";
import SignUpChart from "./SignUpChart";
import { Formik, Form } from "formik";
import { getAppointments, getSignups } from '../../Network/Admin/statistics';

const Statistics = () => {
  const [formInitialValues, setFormInitialValues] = useState({
    dateMonthFrom: '',
    dateDayFrom: '',
    dateMonthTo: '',
    dateDatTo: ''
  })

  const [appointmentsData, setAppointmentsData] = useState({});
  const [signupData, setSignupData] = useState({});

  useEffect(() => {
    getAppointments()
      .then(res => { setAppointmentsData(res.data.data) });

    getSignups()
      .then(res => { setSignupData(res.data.data) })
  }, [])

  return (
    <>
      <Grid item md={8} container justifyContent="space-between">

        <Grid item md={4}>
          <PieChart chartName={'Appointments'} pieData={appointmentsData} />
        </Grid>
        <Grid item md={4}>
          <PieChart chartName={'SignUps'} pieData={signupData} />
        </Grid>
      </Grid>
      <Grid item md={8} container justifyContent="space-between" className="row row-cols-2 justify-content-evenly justify-content-md-center align-items-stretch mt-3">
        <Grid item md={4}>
          <AppointmentsChart />
        </Grid>
        <Grid item md={4}>
          <CustomerChart />
        </Grid>
      </Grid>
      {/* <h1>Statistics</h1> */}
    </>
  );
};

export default Statistics;

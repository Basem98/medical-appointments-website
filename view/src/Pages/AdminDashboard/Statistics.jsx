import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import IncomeChart from "./IncomeChart";
import AppointmentsChart from "./AppointmentsChart";
import PieChart from "./PieChart";
import { Formik, Form } from "formik";
import { getAppointments, getSignups, getWeekIncome, getWeekAppointments } from '../../Network/Admin/statistics';

const Statistics = () => {
  const [formInitialValues, setFormInitialValues] = useState({
    dateMonthFrom: '',
    dateDayFrom: '',
    dateMonthTo: '',
    dateDatTo: ''
  })

  const [appointmentsData, setAppointmentsData] = useState({});
  const [signupData, setSignupData] = useState({});
  const [weekIncomeData, setWeekIncomeData] = useState({});
  const [weekAppointmentsData, setWeekAppointmentsData] = useState({});

  useEffect(() => {
    getAppointments()
      .then(res => { setAppointmentsData(res.data.data) });

    getSignups()
      .then(res => { setSignupData(res.data.data) })

    getWeekIncome()
      .then(res => { console.log('getWeekIncome res: ', res.data.data); setWeekIncomeData(res.data.data) })
    // .catach(err => console.log(err))

    getWeekAppointments()
      .then(res => { console.log('getWeekAppointments res: ', res.data.data); setWeekAppointmentsData(res.data.data) })
    // .catach(err => console.log(err))

  }, [])

  return (
    <>
      <Grid item md={8} container justifyContent="space-between">

        <Grid item lg={4} md={5}>
          <PieChart chartName={'Appointments'} pieData={appointmentsData} />
        </Grid>
        <Grid item lg={4} md={5}>
          <PieChart chartName={'SignUps'} pieData={signupData} />
        </Grid>
      </Grid>
      <Grid item md={8} container justifyContent="space-between" className="row row-cols-2 justify-content-evenly justify-content-md-center align-items-stretch mt-3">
        <Grid item lg={4} md={5}>
          <AppointmentsChart weekAppointmentsData={weekAppointmentsData} />
        </Grid>
        <Grid item lg={4} md={5}>
          <IncomeChart weekIncomeData={weekIncomeData} />
        </Grid>
      </Grid>
      {/* <h1>Statistics</h1> */}
    </>
  );
};

export default Statistics;

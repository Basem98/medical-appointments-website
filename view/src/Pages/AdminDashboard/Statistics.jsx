import { Button, Grid, Typography, FormHelperText } from "@mui/material";
import { useState, useEffect } from "react";
import IncomeChart from "./IncomeChart";
import AppointmentsChart from "./AppointmentsChart";
import PieChart from "./PieChart";
import { Formik, Form } from "formik";
import { getAppointments, getSignups, getWeekIncome, getWeekAppointments } from '../../Network/Admin/statistics';
import DropdownField from "../../Components/DropdownField/DropdownField";
import { months, getDays } from '../../Helper/DateOptions';

const Statistics = () => {
  const [pieFormInitialValues, setPieFormInitialValues] = useState({
    dateFromMonth: '',
    dateFromDay: '',
    dateToMonth: '',
    dateToDay: ''
  })

  const [weekFormInitialValues, setWeekFormInitialValues] = useState({
    dateFromMonth: '',
    dateFromDay: '',
    dateToMonth: '',
    dateToDay: ''
  })

  const [appointmentsData, setAppointmentsData] = useState({});
  const [signupData, setSignupData] = useState({});
  const [weekIncomeData, setWeekIncomeData] = useState({});
  const [weekAppointmentsData, setWeekAppointmentsData] = useState({});

  useEffect(() => {
    getPiesData();
    getWeeklyData();
    let newDate = new Date()
  }, [])

  const getPiesData = (values) => {
    getAppointments(values)
      .then(res => {
        setAppointmentsData(res.data.data);
      })

    getSignups(values)
      .then(res => {
        setSignupData(res.data.data);
      })
  }

  const getWeeklyData = (values) => {
    getWeekIncome(values)
      .then(res => {
        setWeekIncomeData(res.data.data);
        // console.log('getWeekIncome res: ', res.data.data);
      })
    // .catach(err => console.log(err))

    getWeekAppointments(values)
      .then(res => {
        setWeekAppointmentsData(res.data.data);
        // console.log('getWeekAppointments res: ', res.data.data);
      })
    // .catach(err => console.log(err))
  }

  const validatePiesForm = (values) => {
    const errors = {};
    if (values.dateFromDay && values.dateFromMonth === '') {
      errors.dateFromMonth = "Required";
    }
    if (!values.dateFromDay && values.dateFromMonth !== '') {
      errors.dateFromDay = "Required";
    }
    if (values.dateToDay && values.dateToMonth === '') {
      errors.dateToMonth = "Required";
    }
    if (!values.dateToDay && values.dateToMonth !== '') {
      errors.dateToDay = "Required";
    }
    if (values.dateFromMonth && values.dateToMonth !== '') {
      if (values.dateFromMonth > values.dateToMonth) { errors.dateFromToMonth = "Dates should be chronological"; }
    }
    if (values.dateFromMonth !== '' && values.dateFromDay && values.dateToMonth === '' && !values.dateToDay) {
      errors.dateFromToMonth = 'Date To is reqired'
    }
    if (values.dateFromMonth !== '' && values.dateToMonth !== '' && values.dateFromDay && values.dateToDay) {
      if (values.dateFromMonth === values.dateToMonth && values.dateFromDay > values.dateToDay) {
        errors.dateFromToMonth = "Dates must be chronological";
      }
    }
    return errors;
  }

  const validateWeeklyDataForm = (values) => {
    const errors = {};
    if (values.dateFromDay && values.dateFromMonth === '') {
      errors.dateFromMonth = "Required";
    }
    if (!values.dateFromDay && values.dateFromMonth !== '') {
      errors.dateFromDay = "Required";
    }
    return errors;
  }

  return (
    <>

      <Grid item md={10} container justifyContent="space-between">
        <Grid item lg={3} md={2} xs={8} sx={{}}>
          <Formik
            initialValues={pieFormInitialValues}
            onSubmit={getPiesData}
            validate={validatePiesForm}
          >
            {(formik) =>
            (<Form
              style={{ minHeight: "100%", paddingTop: "20px" }}
            >
              <Grid container justifyContent="space-evenly">
                <Grid item xs={12} container
                  justifyContent="space-between"
                  rowSpacing={2}
                >
                  <Grid item xs={12}>
                    <Typography variant="h6">From</Typography>
                  </Grid>

                  <Grid item xs={7}><DropdownField
                    label={"Month"}
                    options={months}
                    name="dateFromMonth"
                    sx={{
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, .25)",
                      padding: 0,

                    }}
                  /></Grid>
                  <Grid item xs={4}>
                    <DropdownField
                      label={"Day"}
                      options={getDays()}
                      name="dateFromDay"
                      sx={{
                        // height:"56px",
                        boxShadow: "0px 4px 4px rgba(0, 0,0, .25)",
                        padding: 0,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} container
                  justifyContent="space-between"
                  rowSpacing={2}
                  sx={{ my: 1 }}
                >
                  <Grid item xs={12}>
                    <Typography variant="h6">To</Typography>
                  </Grid>
                  <Grid item xs={7}><DropdownField
                    label={"Month"}
                    options={months}
                    name="dateToMonth"
                    sx={{
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, .25)",
                      padding: 0,
                    }}
                  /></Grid>
                  <Grid item xs={4}>
                    <DropdownField
                      label={"Day"}
                      options={getDays()}
                      name="dateToDay"
                      sx={{
                        // height:"56px",
                        boxShadow: "0px 4px 4px rgba(0, 0,0, .25)",
                        padding: 0,
                      }}
                    />
                  </Grid>
                  {formik.errors.dateFromToMonth &&
                    <Grid item xs={12} sx={{ mb: 1 }}>
                      <FormHelperText sx={{ color: "red" }}>
                        {formik.errors.dateFromToMonth}
                      </FormHelperText>
                    </Grid>
                  }
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <Button
                    variant="contained"
                    type={'submit'}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Form>)}

          </Formik>
        </Grid>
        <Grid item lg={3} md={4}>
          <PieChart chartName={'Appointments'} pieData={appointmentsData} />
        </Grid>
        <Grid item lg={3} md={4}>
          <PieChart chartName={'SignUps'} pieData={signupData} />
        </Grid>
      </Grid>
      <Grid item md={10} container justifyContent="space-between" className="row row-cols-2 justify-content-evenly justify-content-md-center align-items-stretch mt-3">
        <Grid item lg={3} md={2} xs={8} sx={{}}>
          <Formik
            initialValues={weekFormInitialValues}
            enableReinitialize
            validate={validateWeeklyDataForm}
            onSubmit={getWeeklyData}
          >
            {(formik) =>
            (<Form
              style={{ minHeight: "100%", paddingTop: "20px" }}
            >
              <Grid container justifyContent="space-evenly">
                <Grid item xs={12} container
                  justifyContent="space-between"
                  rowSpacing={2}
                >
                  <Grid item xs={12}>
                    <Typography variant="h6">From</Typography>
                  </Grid>

                  <Grid item xs={7}><DropdownField
                    label={"Month"}
                    options={months}
                    name="dateFromMonth"
                    sx={{
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, .25)",
                      padding: 0,

                    }}
                  /></Grid>
                  <Grid item xs={4}>
                    <DropdownField
                      label={"Day"}
                      options={getDays()}
                      name="dateFromDay"
                      sx={{
                        // height:"56px",
                        boxShadow: "0px 4px 4px rgba(0, 0,0, .25)",
                        padding: 0,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <Button
                    variant="contained"
                    type={'submit'}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Form>)}

          </Formik>
        </Grid>
        <Grid item lg={3} md={4}>
          <AppointmentsChart weekAppointmentsData={weekAppointmentsData} />
        </Grid>
        <Grid item lg={3} md={4}>
          <IncomeChart weekIncomeData={weekIncomeData} />
        </Grid>
      </Grid>
    </>
  );
};

export default Statistics;

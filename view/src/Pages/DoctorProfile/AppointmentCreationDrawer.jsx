import { CircularProgress, Drawer, FormHelperText, Grid, Typography, useTheme } from "@mui/material";
import { WatchLaterRounded } from '@mui/icons-material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomCalender from "../../Components/CustomCalendar/CustomCalender";
import InputField from '../../Components/InputField/InputField';
import CustomFormButton from '../../Components/CustomFormButton/CustomFormButton';
import createAppointment from "../../Network/Doctors/createAppointment";
import { useState } from "react";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";

const AppointmentCreationDrawer = ({ openDrawer, setOpenDrawer }) => {
  const theme = useTheme();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [serverResponse, setServerResponse] = useState({ success: false, msg: '' });
  /** This should get the doctor's id from the store */
  const doctorId = "62fb8ab01e8c2fbdc0e44449";
  const appointmentInitialValues = {
    date: new Date(),
    time: {
      hour: "",
      minute: "",
      duration: ""
    },
    doctor: doctorId
  };
  const appointmentSchema = Yup.object({
    date: Yup.date().required('This field is required'),
    time: Yup.object({
      hour: Yup.number().min(0, 'Hours must be between 0 to 23').max(23, 'Hours must be between 0 to 23').required('This field is required'),
      minute: Yup.number().min(0, 'Minutes must be between 0 to 59').max(59, 'Minutes must be between 0 to 59').required('This field is required'),
      duration: Yup.number().required('This field is required'),
    }).required('This field is required')
  });
  const handleSubmit = (values) => {
    const body = { ...values };
    body.date = `${body.date.getFullYear()}-${body.date.getMonth() + 1}-${body.date.getDate()}`;
    setFormSubmitted(true);
    createAppointment(body)
      .then(res => {
        if (res.status === 201) {
          setFormSubmitted(false);
          setServerResponse({ success: true, msg: `Your appointment on ${res.data.data.date.split('T')[0]} has been added to our systems.` })
        }
      })
      .catch(err => {
        setFormSubmitted(false);
        setServerResponse({ success: false, msg: `Something went wrong. Please, try again.` })
      });
  }

  return (
    <Drawer
      open={openDrawer}
      anchor="left"
      onClose={() => { setOpenDrawer(!openDrawer) }}
      PaperProps={{
        sx: {
          width: { 'lg': '35vw', 'md': '50vw', 'sm': '70vw', 'xs': '90vw' },
          background: theme.palette.secondaryBg.main
        }
      }}
    >
      <Grid container justifyContent='center' alignItems='flex-start' minHeight='100vh'>
        <Formik
          initialValues={appointmentInitialValues}
          validationSchema={appointmentSchema}
          onSubmit={handleSubmit}
        >{(formik) => (
          <Form style={{ width: '100%', height: '100%' }}>
            <Grid container item xs={12} justifyContent='center' alignItems='center'>
              <Grid container item xs={12} flexDirection='column' justifyContent='center' alignItems='center' marginTop='25px'>
                <Typography variant="modalSmallText" sx={{ color: theme.palette.text.primary, fontWeight: 'bold', marginBottom: '25px' }}>Date</Typography>
                <CustomCalender setCalVal={(newDateVal) => formik.setFieldValue('date', newDateVal)} datesarray={[{ date: new Date() }, { date: new Date(2022, 7, 17) }]} />
                <FormHelperText >{formik.errors['date']}</FormHelperText>
              </Grid>

              <Grid container item xs={12} flexDirection='column' justifyContent='center' alignItems='center' marginTop='25px'>
                <Grid container item xs={12} flexDirection='column' alignItems='center' justifyContent='center'>
                  <Typography variant="modalSmallText" sx={{ color: theme.palette.text.primary, fontWeight: 'bold', marginBottom: '25px' }}>Time</Typography>
                  <Grid item xs={10} >
                    <InputField label="Hours" name='time.hour' placeholder="0-23"><WatchLaterRounded /></InputField>
                  </Grid>
                  <Grid item xs={10} marginTop='25px'>
                    <InputField label="Minutes" name='time.minute' placeholder="0-59"><WatchLaterRounded /></InputField>
                  </Grid>
                </Grid>
                <Grid container item xs={12} flexDirection='column' alignItems='center' justifyContent='center' marginTop='25px'>
                  <Typography variant="modalSmallText" sx={{ color: theme.palette.text.primary, fontWeight: 'bold', marginBottom: '25px' }}>Estimated Duration</Typography>
                  <Grid item xs={10} >
                    <InputField label="Duration" name='time.duration' placeholder="Duration in minutes"><WatchLaterRounded /></InputField>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={12} paddingY='20px' flexDirection='column' alignItems='center' justifyContent='center'  >
              <Grid item xs={4} minWidth='150px'>
                <CustomFormButton variant="contained" type="submit" disabled={!formik.isValid} fullWidth>Submit</CustomFormButton>
              </Grid>
              {
                formSubmitted && <CircularProgress color='highlight' sx={{ marginY: '10px' }} />
              }
              <Grid container item xs={10} justifyContent='center' alignItems='center' marginTop='25px'>
                {
                  serverResponse.msg &&
                  <CustomAlert severity={serverResponse.success ? 'success' : 'error'} onClose={() => setServerResponse({ success: false, msg: '' })}>{serverResponse.msg}</CustomAlert>
                }
              </Grid>
            </Grid>
          </Form>
        )}</Formik>
      </Grid>
    </Drawer >
  );
};

export default AppointmentCreationDrawer;
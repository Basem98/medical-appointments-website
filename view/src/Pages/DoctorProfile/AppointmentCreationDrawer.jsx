import { CircularProgress, Drawer, FormHelperText, Grid, Typography, useTheme } from "@mui/material";
import { WatchLaterRounded } from '@mui/icons-material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomCalender from "../../Components/CustomCalendar/CustomCalender";
import InputField from '../../Components/InputField/InputField';
import CustomFormButton from '../../Components/CustomFormButton/CustomFormButton';
import createAppointment from "../../Network/Doctors/createAppointment";
import { useEffect, useState } from "react";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from '../../Store/Features/UserDetails/userDetailsSlice';
import checkAuthentication from "../../Network/Base/checkAuthentication";
import { useNavigate } from "react-router-dom";
import { setAvailableAppointments } from "../../Store/Features/Appointments/availableAppointmentsSlice";

const AppointmentCreationDrawer = ({ openDrawer, setOpenDrawer }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [serverResponse, setServerResponse] = useState({ success: false, msg: '' });
  const dispatch = useDispatch();
  /** This should get the doctor's id from the store */
  const doctorData = useSelector(store => store.userDetails);
  const availableAppointments = useSelector((state) => state.availableAppointments.data);
  useEffect(() => {
    checkAuthentication()
      .then((response) => {
        dispatch(setUserDetails({
          role: response.data.role,
          data: response.data.data,
          email: response.data.data.email
        }))
      })
      .catch((error) => {
        navigate('/');
      })
  }, []);

  const appointmentInitialValues = {
    date: new Date(),
    time: {
      hour: "",
      minute: "",
      duration: ""
    },
    doctor: ""
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
    body.doctor = doctorData?.data?._id;
    setFormSubmitted(true);
    createAppointment(body)
      .then(res => {
        if (res.status === 201) {
          setFormSubmitted(false);
          setServerResponse({ success: true, msg: `Your appointment on ${res.data.data.date.split('T')[0]} has been added to our systems.` })
          dispatch(setAvailableAppointments({ availableAppointments:  [...availableAppointments, { date: res.data.data.date, time: res.data.data.time }]}));
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
                <CustomCalender setCalVal={(newDateVal) => formik.setFieldValue('date', newDateVal)} isCreatingAppointment={true} />
                <FormHelperText >{formik.errors['date']}</FormHelperText>
              </Grid>

              <Grid container item xs={12} flexDirection='column' justifyContent='center' alignItems='center' marginTop='25px'>
                <Grid container item xs={12} flexDirection='column' alignItems='center' justifyContent='center'>
                  <Typography variant="modalSmallText" sx={{ color: theme.palette.text.primary, fontWeight: 'bold', marginBottom: '25px' }}>Time</Typography>
                  <Grid item xs={10} maxWidth='287.200px'>
                    <InputField label="Hours" name='time.hour' placeholder="0-23"><WatchLaterRounded /></InputField>
                  </Grid>
                  <Grid item xs={10} maxWidth='287.200px' marginTop='25px'>
                    <InputField label="Minutes" name='time.minute' placeholder="0-59"><WatchLaterRounded /></InputField>
                  </Grid>
                </Grid>
                <Grid container item xs={12} flexDirection='column' alignItems='center' justifyContent='center' marginTop='25px'>
                  <Typography variant="modalSmallText" sx={{ color: theme.palette.text.primary, fontWeight: 'bold', marginBottom: '25px' }}>Estimated Duration</Typography>
                  <Grid item xs={10} maxWidth='287.200px' >
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
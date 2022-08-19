import { CircularProgress, Drawer, FormHelperText, Grid, Typography, useTheme } from "@mui/material";
import { WatchLaterRounded } from '@mui/icons-material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomCalender from "../../Components/CustomCalendar/CustomCalender";
import InputField from '../../Components/InputField/InputField';
import CustomFormButton from '../../Components/CustomFormButton/CustomFormButton';
import { useEffect, useState } from "react";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from '../../Store/Features/UserDetails/userDetailsSlice';
import checkAuthentication from "../../Network/Base/checkAuthentication";
import { useNavigate } from "react-router-dom";
import editAppointment from "../../Network/Doctors/editAppointment";


const EditAppointmentDrawer = ({ openDrawer, setOpenDrawer, appointmentDetails }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [serverResponse, setServerResponse] = useState({ success: false, msg: '' });
  const dispatch = useDispatch();
  const doctorData = useSelector(store => store.userDetails);


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
    date: appointmentDetails?.date,
    time: {
      hour: appointmentDetails?.time.hour,
      minute: appointmentDetails?.time.minute,
      duration: appointmentDetails?.time.duration
    }
  };

  const appointmentSchema = Yup.object({
    date: Yup.date(),
    time: Yup.object({
      hour: Yup.number().min(0, 'Hours must be between 0 to 23').max(23, 'Hours must be between 0 to 23'),
      minute: Yup.number().min(0, 'Minutes must be between 0 to 59').max(59, 'Minutes must be between 0 to 59'),
      duration: Yup.number(),
    })
  });

  const handleSubmit = (values) => {
    const body = { ...values };
    setFormSubmitted(true);
    editAppointment(body, appointmentDetails._id)
      .then(res => {
        if (res.status === 204) {
          setFormSubmitted(false);
          setServerResponse({ success: true, msg: `Your appointment has been updated successfully.` })
          const updatedDoctorData = {
            ...doctorData.data,
            appointments: doctorData.data.appointments.map(appointmentObject => {
              let updatedAppointmentObject = { ...appointmentObject };
              if (appointmentObject._id == appointmentDetails._id) {
                updatedAppointmentObject.date = new Date(values.date).toISOString();
              }
              return updatedAppointmentObject;
            })
          };
          dispatch(setUserDetails({ ...doctorData, data: updatedDoctorData }));
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
                <CustomCalender isCreatingAppointment={true} initialDate={appointmentDetails.date} setCalVal={(newDateVal) => formik.setFieldValue('date', newDateVal)} />
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
                  <Grid item xs={10} maxWidth='287.200px'>
                    <InputField label="Duration" name='time.duration' placeholder="Duration in minutes"><WatchLaterRounded /></InputField>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={12} paddingY='20px' flexDirection='column' alignItems='center' justifyContent='center'  >
              <Grid item xs={4} minWidth='150px'>
                <CustomFormButton variant="contained" type="submit" disabled={!formik.isValid} fullWidth>Edit</CustomFormButton>
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

export default EditAppointmentDrawer;
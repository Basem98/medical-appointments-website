import { Formik, Form } from 'formik';
import { CircularProgress, FormControl, InputAdornment, InputLabel, MenuItem, Select, useTheme } from "@mui/material";
import { Drawer, Grid, Typography, FormHelperText } from "@mui/material";
import { WatchLaterRounded } from '@mui/icons-material';
import CustomCalender from '../CustomCalendar/CustomCalender';
import DropdownField from '../DropdownField/DropdownField';
import { useState } from 'react';
import CustomFormControl from '../CustomFormControl/CustomFormControl';
import CustomFormButton from '../CustomFormButton/CustomFormButton';
import CustomAlert from '../CustomAlert/CustomAlert';
import checkAuthentication from '../../Network/Base/checkAuthentication';
import { Link } from 'react-router-dom';
import bookAppointment from '../../Network/Users/bookAppointment';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../../Store/Features/UserDetails/userDetailsSlice';

const BookingDrawer = ({ openDrawer, setOpenDrawer, appointments, doctorDetails, setDoctorDetails }) => {
  const theme = useTheme();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [serverResponse, setServerResponse] = useState({ success: false, msg: '' });
  const currUser = useSelector(store => store.userDetails.data);
  const dispatch = useDispatch();

  const appointmentInitialValues = {
    date: appointments && appointments.length > 0 ? new Date(appointments[0].date) : "",
    id: appointments && appointments.length > 0 ? appointments[0]._id : "",
  };


  const getTimes = (appointmentDate) => {
    return appointments.filter(appointment => {
      return (new Date(appointment.date).getDate() === appointmentDate.getDate() && new Date(appointment.date).getMonth() === appointmentDate.getMonth())
    })
      .map(appointment => {
        return { label: `${appointment.time.hour}:${appointment.time.minute}`, value: appointment._id }
      });
  }
  const times = getTimes(appointmentInitialValues.date);

  const [appointmentTimes, setAppointmentTimes] = useState([...times]);

  const handleSubmit = (values) => {
    setFormSubmitted(true);
    checkAuthentication()
      .then(authRes => {
        dispatch(setUserDetails({
          role: authRes.data.role,
          data: authRes.data.data,
          email: authRes.data.data.email
        }));
        bookAppointment(values)
          .then(res => {
            setFormSubmitted(false);
            if (res.status === 201) {
              setServerResponse({
                success: true,
                msg: `You have booked an appointment with Dr. ${doctorDetails.firstName} ${doctorDetails.lastName} on ${values.date.getFullYear()}-${values.date.getMonth() + 1}-${values.date.getDate()}. Please contact the clinic through the contact details if you have an inquiry regarding your appointment.`
              });

              const updatedUser = { ...authRes.data.data };
              updatedUser.appointments = [...updatedUser.appointments, values.id];
              dispatch(setUserDetails({ role: authRes.data.role, email: updatedUser.email, data: { ...updatedUser } }));

              const updatedDoctor = { ...doctorDetails };
              updatedDoctor.appointments = updatedDoctor.appointments && updatedDoctor.appointments.length > 1 ?
                updatedDoctor.appointments.filter(appointment => appointment._id !== values.id)
                : [];
                setDoctorDetails(updatedDoctor);
            }
          })
          .catch(err => {
            setFormSubmitted(false);
            if (err.response.status === 409) {
              setServerResponse({ success: false, msg: 'This appointment has been booked. Please choose another date/time' });
            } else {
              setServerResponse({ success: false, msg: 'Something went wrong! Please, try again. Contact us if the problem persists' });
            }
          })
      })
      .catch(err => {
        setFormSubmitted(false);
        setServerResponse({ success: false, msg: 'unauthorized' });
      })
  }


  return (
    <Drawer
      open={openDrawer}
      onClose={() => setOpenDrawer(!openDrawer)}
      anchor="left"
      PaperProps={{
        sx: {
          width: { 'lg': '35vw', 'md': '50vw', 'sm': '70vw', 'xs': '90vw' },
          background: theme.palette.secondaryBg.main
        }
      }}
    >
      <Grid container minHeight='100vh'>
        {appointments && appointments.length > 0 ?
          < Formik
            initialValues={appointmentInitialValues}
            onSubmit={handleSubmit}
            enableReinitialize={true}

          >{(formik) => (
            <Form style={{ height: '100%' }}>
              <Grid container item xs={12} justifyContent='center' alignItems='center'>
                <Grid container item xs={12} flexDirection='column' justifyContent='center' alignItems='center' marginTop='25px'>
                  <Typography variant="h2" sx={{ color: theme.palette.text.primary, fontWeight: 'bold', marginBottom: '25px' }}>Book an Appointment</Typography>
                </Grid>
                <Grid container item xs={12} flexDirection='column' justifyContent='center' alignItems='center' marginTop='25px'>
                  <Typography variant="modalSmallText" sx={{ color: theme.palette.text.primary, fontWeight: 'bold', marginBottom: '25px' }}>Date</Typography>
                  <CustomCalender setCalVal={(newDateVal) => {
                    const newAppointmentTimes = getTimes(newDateVal);
                    formik.setFieldValue('date', newDateVal);
                    setAppointmentTimes(newAppointmentTimes);
                    formik.setFieldValue('id', newAppointmentTimes[0].value);
                  }} availableDates={appointments} initialDate={appointments[0].date} />
                  <FormHelperText >{formik.errors['date']}</FormHelperText>
                </Grid>
              </Grid>
              <Grid container item xs={12} justifyContent='center' alignItems='center' marginTop='50px'>
                <Grid container item xs={12} md={6} justifyContent='center'>
                  <CustomFormControl fullWidth>
                    <InputLabel shrink htmlFor="select-multiple-native">
                      Time
                    </InputLabel>
                    <Select
                      variant='outlined'
                      id='id'
                      name="id"
                      label="Time"
                      inputProps={{
                        id: 'id',
                      }}
                      startAdornment={<InputAdornment position='start' sx={{ color: (theme) => theme.palette.highlight.main }}>{<WatchLaterRounded />}</InputAdornment>}
                      fullWidth
                      onChange={formik.handleChange}
                      value={formik.values.id}
                    >
                      {appointmentTimes.map((appointment) => {
                        return (
                          <MenuItem
                            value={appointment.value}
                            key={appointment.value}
                            sx={{ fontSize: theme.typography.body2 }}>
                            {appointment.label}
                          </MenuItem>
                        )
                      }
                      )}
                    </Select>
                  </CustomFormControl>
                </Grid>
              </Grid>
              <Grid container item xs={12} paddingY='20px' flexDirection='column' alignItems='center' justifyContent='center' marginTop='50px'>
                <Grid container item xs={12} justifyContent='center'>
                  <Grid item xs={4} minWidth='150px'>
                    <CustomFormButton variant="contained" type="submit" disabled={!formik.isValid} fullWidth>Submit</CustomFormButton>
                  </Grid>
                </Grid>
                {
                  formSubmitted && <CircularProgress color='highlight' sx={{ marginY: '10px' }} />
                }
                <Grid container item xs={10} justifyContent='center' alignItems='center' marginTop='25px'>
                  {
                    serverResponse.msg &&
                    <CustomAlert severity={serverResponse.success ? 'success' : 'error'} onClose={() => setServerResponse({ success: false, msg: '' })}>
                      {
                        serverResponse.msg === 'unauthorized' ?
                          <div style={{ display: 'flex', flexDirection: 'column' }}>You have to sign in or create an account to be able to book an appointment
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                              <Link to={"#"} state={{ showModal: true, form: 'UserLoginForm' }} style={{ textDecoration: 'none', marginTop: '10px' }}>
                                <CustomFormButton variant='contained'>
                                  Sign In
                                </CustomFormButton>
                              </Link>
                              <Link to={"#"} state={{ showModal: true, form: 'UserSignupForm' }} style={{ textDecoration: 'none', marginTop: '10px', marginLeft: '10px' }}>
                                <CustomFormButton variant='outlined'>
                                  Sign Up
                                </CustomFormButton>
                              </Link>
                            </div>
                          </div>
                          : <div>{serverResponse.msg}</div>
                      }
                    </CustomAlert>
                  }
                </Grid>
              </Grid>
            </Form>
          )}
          </Formik>
          :
          <Grid container height='fit-content' marginY='auto' item xs={10} flexDirection='column' justifyContent='center' alignItems='center' marginX='auto'>
            <Grid container item xs={12} justifyContent='center'>
              <CustomAlert severity='warning'>Looks like Dr. {doctorDetails.firstName} {doctorDetails.lastName} doesn't have any available appointments at the moment.</CustomAlert>
            </Grid>
            <Grid container height='fit-content' marginY='auto' item xs={12}>
              <CustomFormButton variant='contained'>
                <Link to={"/specialists"} style={{ textDecoration: 'none', color: '#fff' }}>Check other specialists</Link>
              </CustomFormButton>
              <CustomFormButton variant='outlined' sx={{ marginLeft: '10px' }} onClick={() => setOpenDrawer(false)}>
                Go Back
              </CustomFormButton>
            </Grid>
          </Grid>
        }
      </Grid>
    </Drawer >
  )
}


export default BookingDrawer;
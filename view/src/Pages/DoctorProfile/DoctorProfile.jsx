/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, useTheme, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, Snackbar, Alert } from "@mui/material";
import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import getUpcomings from "../../Network/Doctors/getUpcomings";
import InfoCard from "../../Components/InfoCard/InfoCard";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CustomFormButton from "../../Components/CustomFormButton/CustomFormButton";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../Helper/Authentication";
import getAvailableAppointments from "../../Network/Doctors/getAvailableAppointments";
import moment from "moment";
import EditAppointmentDrawer from "./EditAppointmentDrawer";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { setAvailableAppointments } from "../../Store/Features/Appointments/availableAppointmentsSlice";
import cancelAppointment from "../../Network/Appointments/CancelAppointment";
import AppointmentCreationDrawer from "./AppointmentCreationDrawer";

const DoctorProfile = () => {
    const doctorData = useSelector((state) => state.userDetails.data);
    const doctorId = useSelector((state) => state.userDetails.data?._id);
    const role = useSelector((state) => state.userDetails.role);
    const dispatch = useDispatch();
    const theme = useTheme();
    const [upcomings, setUpcomings] = useState(null);
    const availableAppointments = useSelector((state) => state.availableAppointments.data);
    const [openEditAppointmentDrawer, setOpenAppointmentDrawer] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState();
    const [openDeleteFeedback, setOpenDeleteFeedback] = useState(false);
    const [openSetAppointmentDrawer, setOpenSetAppointmentDrawer] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        authenticate('Doctor', navigate, dispatch);
    }, []);

    useEffect(() => {
        doctorId &&
            getUpcomings(doctorId)
                .then((response) => {
                    setUpcomings(response.data.message);
                })
                .catch((error) => {
                    console.log(error);
                })
    }, [doctorId]);

    useEffect(() => {
        getAvailableAppointments()
            .then((response) => {
                dispatch(setAvailableAppointments({
                    availableAppointments: response.data.data
                }))
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const handleEditAppointment = (appointment) => {
        setOpenAppointmentDrawer(true);
        setSelectedAppointment(appointment);
    }
    const handleDeleteAppointment = (id) => {
        cancelAppointment(id)
            .then((response) => {
                setOpenDeleteFeedback(true);
                dispatch(setAvailableAppointments({
                    availableAppointments: availableAppointments.filter((appointment) => {
                        return appointment._id !== id;
                    })
                }));
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleSetAppointment = () => {
        setOpenSetAppointmentDrawer(true);
    }

    return (
        <>

            {

                role === 'Doctor' ?

                    <Grid
                        container
                        spacing={2}
                        justifyContent='center'
                        alignContent="flex-start"
                        sx={{
                            width: {
                                'xs': '100%',
                                'md': '90%'
                            }
                        }}
                    >

                        {
                            !doctorData?.isVerified && (
                                <Grid
                                    item
                                    xs={11}
                                    md={9}
                                    sx={{ marginTop: '10px' }}
                                >
                                    <CustomAlert severity="warning">
                                        Your profile is not verified yet!
                                        Please check your email to verify.
                                    </CustomAlert>

                                </Grid>

                            )
                        }
                        {
                            !doctorData?.isAccepted && (
                                <Grid
                                    item
                                    xs={11}
                                    md={9}
                                    sx={{ marginTop: '10px' }}
                                >
                                    <CustomAlert severity="info">
                                        Your application is being previewed.
                                    </CustomAlert>
                                </Grid>
                            )
                        }

                        {
                            upcomings ? (
                                <Grid item>
                                    <InfoCard>
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <Grid item xs={10}>
                                                    <Typography>Welcome, Dr.{doctorData?.firstName}!</Typography>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Typography>You have {upcomings?.length} upcoming appointment(s).</Typography>
                                                    <Grid item xs={10} marginTop={4}>
                                                        <Link
                                                            to={`/doctors/${doctorData?._id}/appointments`}
                                                        >
                                                            <CustomFormButton variant="contained">
                                                                Show Appointments
                                                            </CustomFormButton>
                                                        </Link>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </InfoCard>
                                </Grid>
                            )
                                :
                                <Grid item xs={10} sx={{ textAlign: "center" }}>
                                    <CircularProgress
                                        sx={{
                                            color: theme.palette.highlight.main,
                                        }} />
                                </Grid>
                        }
                        {
                            availableAppointments ?
                                availableAppointments.length > 0 ?
                                    <Grid
                                        container
                                        item
                                        xs={12}
                                        md={10}
                                        justifyContent="center"
                                        alignItems="center"
                                        textAlign="center"
                                    >
                                        <Grid item md={3} xs={4}>
                                            <Typography
                                                sx={{
                                                    color: theme.palette.highlight.main,
                                                    textAlign: 'center',
                                                    marginTop: 3,
                                                    marginBottom: 3,
                                                    borderBottom: `1px solid ${theme.palette.highlight.main}`,
                                                    paddingBottom: 1,
                                                }}
                                            >
                                                Your Timetable
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={1} >
                                            <IconButton onClick={handleSetAppointment}>
                                                <AddCircleOutlineIcon />
                                            </IconButton>
                                        </Grid>
                                        <TableContainer>
                                            <Table aria-label="Prescription">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell sx={{
                                                            color: theme.palette.highlight.main,
                                                            fontWeight: 'bold',

                                                        }}
                                                        >
                                                            Date</TableCell>
                                                        <TableCell sx={{
                                                            color: theme.palette.highlight.main,
                                                            fontWeight: 'bold'
                                                        }}
                                                        >
                                                            At
                                                        </TableCell>
                                                        <TableCell sx={{
                                                            color: theme.palette.highlight.main,
                                                            fontWeight: 'bold'
                                                        }}
                                                        >
                                                            Duration
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {

                                                        availableAppointments?.map((appointment, index) => {
                                                            return (
                                                                <TableRow
                                                                    key={index}
                                                                >
                                                                    <TableCell component="th" sx={{
                                                                        fontSize: {
                                                                            sm: '16px',
                                                                            xs: '12px'
                                                                        }
                                                                    }}>
                                                                        {moment(appointment.date.split('T')[0]).format('dddd, MMMM Do YYYY')}
                                                                    </TableCell>
                                                                    <TableCell sx={{
                                                                        fontSize: {
                                                                            sm: '16px',
                                                                            xs: '12px'
                                                                        }
                                                                    }}>
                                                                        {appointment.time.hour} : {appointment.time.minute}
                                                                    </TableCell>
                                                                    <TableCell sx={{
                                                                        fontSize: {
                                                                            sm: '16px',
                                                                            xs: '12px'
                                                                        }
                                                                    }}>
                                                                        {appointment.time.duration} minutes
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Button
                                                                            sx={{
                                                                                fontSize: {
                                                                                    sm: '16px',
                                                                                    xs: '12px'
                                                                                }
                                                                            }}
                                                                            onClick={() => { handleEditAppointment(appointment) }}
                                                                        >Edit</Button>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Button sx={{
                                                                            fontSize: {
                                                                                sm: '16px',
                                                                                xs: '12px'
                                                                            },
                                                                            color: theme.palette.error.main
                                                                        }}
                                                                            onClick={() => { handleDeleteAppointment(appointment._id) }}
                                                                        >Delete</Button>
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        })
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                    :
                                    <Grid
                                        container
                                        item
                                        xs={12}
                                        md={10}
                                        justifyContent="center"
                                    >
                                        <Grid xs={12} item>
                                            <Typography textAlign='center'>Your timetable is empty!</Typography>
                                        </Grid>
                                        <Grid xs={12} item textAlign="center" marginTop="10px">
                                            <CustomFormButton variant="contained" onClick={handleSetAppointment}>
                                                Set appointment
                                            </CustomFormButton>
                                        </Grid>
                                    </Grid>
                                : <></>
                        }
                    </Grid>
                    :
                    <></>
            }
            <EditAppointmentDrawer
                openDrawer={openEditAppointmentDrawer}
                setOpenDrawer={setOpenAppointmentDrawer}
                appointmentDetails={selectedAppointment}
            />
            <AppointmentCreationDrawer 
                openDrawer={openSetAppointmentDrawer}
                setOpenDrawer={setOpenSetAppointmentDrawer}
            />

            <Snackbar
                open={openDeleteFeedback}
                autoHideDuration={3000}
                onClose={() => setOpenDeleteFeedback(false)}
            >
                <Alert severity="info">
                    Appointment deleted successfully.
                </Alert>
            </Snackbar>
        </>
    );
}

export default DoctorProfile;
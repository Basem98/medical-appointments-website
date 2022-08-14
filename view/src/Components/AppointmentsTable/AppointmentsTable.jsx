import React from "react";
import {
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography,
    Link,
    Button,
    CircularProgress
}
    from "@mui/material";
import { useTheme } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import AppointmentDetails from "../AppointmentDetails/AppointmentDetails";

const AppointmentsTable = ({ appointments, role }) => {
    const theme = useTheme();
    const [appointmentDetails, setAppointmentDetails] = useState();
    const [openDrawer, setOpenDrawer] = useState(false);
    const displayAccordingToRole = (appointment) => {
        return role === 'user' ?
            (
                <>
                    <Typography
                        marginTop={10}
                    >
                        <>With </>
                        <Link
                            sx={{
                                color: theme.palette.highlight.main,
                                '&:hover': {
                                    cursor: 'pointer'
                                }
                            }}
                            href='#'
                        >Dr. {appointment?.doctor.firstName} {appointment?.doctor.lastName}
                        </Link>
                    </Typography>
                </>)
            : role === 'doctor' ?
                (
                    <>
                        <Typography
                            marginTop={10}
                        >
                            <>With </>
                            <Link
                                sx={{
                                    color: theme.palette.highlight.main,
                                    '&:hover': {
                                        cursor: 'pointer'
                                    }
                                }}
                                href='#'
                            >Mr. {appointment?.user.firstName} {appointment?.user.lastName}
                            </Link>
                        </Typography>
                    </>)
                : role === 'admin' ?
                    (
                        <>
                            <Typography
                                marginTop={10}
                            >
                                <Link
                                    sx={{
                                        color: theme.palette.highlight.main,
                                        '&:hover': {
                                            cursor: 'pointer'
                                        }
                                    }}
                                    href='#'
                                >Dr. {appointment?.doctor.firstName} {appointment?.doctor.lastName}
                                </Link>
                                <> Examines </>
                                <Link
                                    sx={{
                                        color: theme.palette.highlight.main,
                                        '&:hover': {
                                            cursor: 'pointer'
                                        }
                                    }}
                                    href='#'
                                >Mr. {appointment?.user.firstName} {appointment?.user.lastName}
                                </Link>
                            </Typography>
                        </>)
                    :
                    (<></>)
    }
    if (!appointments) {
        return (
            <>
                <Grid item xs={10} sx={{
                    textAlign: "center",
                    marginTop: 10
                }}>
                    <CircularProgress sx={{
                        color: theme.palette.highlight.main
                    }} />
                </Grid>
            </>
        );
    }
    return appointments?.length === 0 ?
        (
            <>
                <Grid
                    container
                    justifyContent="center"
                    marginTop={10}
                >
                    <Grid item xs={10} textAlign="center">
                        <Typography>
                            No appointments to show.
                        </Typography>
                    </Grid>
                    {
                        role === 'user' ?
                            <Grid item xs={10} textAlign="center" marginTop={3}>
                                <Button
                                    sx={{
                                        backgroundColor: theme.palette.highlight.main,
                                        fontWeight: 'bold',
                                        padding: "20px",
                                        borderRadius: "20px",
                                        ':hover': {
                                            backgroundColor: theme.palette.highlight.main,
                                            opacity: 0.8,
                                            transform: 'scale(1.05)'
                                        }
                                    }}
                                    variant="contained"
                                >
                                    Book Now!
                                </Button>
                            </Grid> : <></>
                    }
                </Grid>
            </>)
        :
        (
            <Grid
                container
                spacing={6}
                justifyContent="center"
            >
                {
                    appointments?.map((appointment, index) => {
                        return (
                            <Grid item key={index} xs={12} md={10}>
                                <Card sx={{ boxShadow: `1px 1px 1px 1px ${theme.palette.highlight.main}` }}>
                                    <Grid container>
                                        <Grid item width="75%">
                                            <CardContent>
                                                <Grid>
                                                    <Typography display="inline" variant="h4">
                                                        {moment(appointment.date.split('T')[0]).format('dddd, MMMM Do YYYY')}
                                                    </Typography>
                                                    <Typography
                                                        display="inline"
                                                        color={theme.palette.grey[500]}
                                                        noWrap
                                                    > at {appointment.time.hour}
                                                        : {appointment.time.minute}
                                                    </Typography>
                                                </Grid>
                                                <Typography
                                                    variant="body2"
                                                    color={theme.palette.grey[500]}
                                                >
                                                    Lasts for {appointment.time.duration} minutes
                                                </Typography>
                                                <Typography
                                                    color={theme.palette.grey[500]}
                                                    marginTop={3}
                                                >
                                                    {
                                                        moment(appointment.date).fromNow()
                                                    }
                                                </Typography>

                                                {displayAccordingToRole(appointment)}

                                            </CardContent>
                                        </Grid>
                                        <Grid item alignSelf="center" width="25%">
                                            <CardActions>
                                                <Button
                                                    sx={{
                                                        backgroundColor: theme.palette.highlight.main,
                                                        fontWeight: 'bold',
                                                        padding: "15px",
                                                        borderRadius: "20px",
                                                        width: "90%",
                                                        ':hover': {
                                                            backgroundColor: theme.palette.highlight.main,
                                                            opacity: 0.8,
                                                            transform: 'scale(1.05)'
                                                        }
                                                    }}
                                                    variant="contained"
                                                    onClick={() => {
                                                        setOpenDrawer(!openDrawer);
                                                        setAppointmentDetails(appointment)
                                                    }}
                                                >
                                                    See Details
                                                </Button>
                                            </CardActions>
                                        </Grid>
                                    </Grid>
                                </Card>
                                <AppointmentDetails
                                    appointmentDetails={appointmentDetails}
                                    role="user"
                                    openDrawer={openDrawer}
                                    setOpenDrawer={setOpenDrawer}
                                />
                            </Grid>
                        );
                    })
                }
            </Grid>
        );
}

export default AppointmentsTable;
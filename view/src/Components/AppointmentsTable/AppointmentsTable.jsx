import React from "react";
import {
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography,
    Link,
    Button,
    CircularProgress,
    Drawer,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import { useTheme } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MedicationIcon from '@mui/icons-material/Medication';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Box } from "@mui/system";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

const AppointmentsTable = ({ appointments, role }) => {
    const details = [
        { drugName: 'Some weirdo drug name', dosage: '2 times a day' },
        { drugName: 'Some quirky drug name', dosage: '2 times a day' },
        { drugName: 'Some strange drug name', dosage: '2 times a day' }
    ];
    const theme = useTheme();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [appointmentDetails, setAppointmentDetails] = useState();
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
                marginTop={2}
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
                            </Grid>


                        );
                    })
                }
                <Drawer
                    open={openDrawer}
                    anchor="left"
                    onClose={() => { setOpenDrawer(!openDrawer) }}
                    PaperProps={{
                        sx: {
                            width: { 'md': '50vw', 'xs': '90vw' }
                        }
                    }}
                >
                    <Grid container justifyContent="flex-start" padding={2} spacing={2}>
                        <Grid
                            item
                            container
                            xs={12}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Grid item xs={6}>
                                <Box
                                    component="img"
                                    sx={{
                                        borderRadius: '50%',
                                        width: '200px',
                                        height: '200px',
                                        objectFit: 'contain'
                                    }}
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSleborUKlDqo2xbo3qSyXDV1Fs8B-4M9v6og&usqp=CAU"
                                />
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={12}>
                                    <Typography
                                    >Dr. {appointmentDetails?.doctor.firstName} {appointmentDetails?.doctor.lastName}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        sx={{
                                            color: theme.palette.grey[500]
                                        }}
                                    >{appointmentDetails?.doctor.specialization}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item
                            xs={10}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            <CalendarTodayIcon
                                fontSize="medium"
                                sx={{
                                    color: theme.palette.highlight.main,
                                    marginRight: 3
                                }}
                            />
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: 20
                                }}
                            >
                                {moment(appointmentDetails?.date.split('T')[0])
                                    .format('dddd, MMMM Do YYYY')}
                            </Typography>
                        </Grid>
                        <Grid item
                            xs={10}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            <QueryBuilderIcon
                                fontSize="medium"
                                sx={{
                                    color: theme.palette.highlight.main,
                                    marginRight: 3
                                }}
                            />
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: 20
                                }}
                            >
                                at {appointmentDetails?.time.hour}
                                : {appointmentDetails?.time.minute}
                            </Typography>
                        </Grid>
                        <Grid item
                            xs={10}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            <HourglassBottomIcon
                                fontSize="medium"
                                sx={{
                                    color: theme.palette.highlight.main,
                                    marginRight: 3
                                }}
                            />
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: 20
                                }}
                            >
                                Duration: {appointmentDetails?.time.duration} minutes
                            </Typography>
                        </Grid>
                        <Grid item
                            xs={10}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            <LocationOnIcon
                                fontSize="medium"
                                sx={{
                                    color: theme.palette.highlight.main,
                                    marginRight: 3
                                }}
                            />
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: 20
                                }}
                            >
                                <>{appointmentDetails?.doctor.clinics?.[0].address.streetName}, </>
                                <>{appointmentDetails?.doctor.clinics?.[0].address.city}, </>
                                <>{appointmentDetails?.doctor.clinics?.[0].address.governorate}, </>
                                <>{appointmentDetails?.doctor.clinics?.[0].address.country} </>
                            </Typography>
                        </Grid>
                        <Grid item
                            xs={10}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            <ApartmentIcon
                                fontSize="medium"
                                sx={{
                                    color: theme.palette.highlight.main,
                                    marginRight: 3
                                }}
                            />
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: 20
                                }}
                            >
                                Building No. {appointmentDetails?.doctor.clinics?.[0].address.buildingNo}
                            </Typography>
                        </Grid>
                        <Grid item
                            xs={10}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            <LocalPhoneIcon
                                fontSize="medium"
                                sx={{
                                    color: theme.palette.highlight.main,
                                    marginRight: 3
                                }}
                            />
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: 20
                                }}
                            >
                                {appointmentDetails?.doctor.clinics?.[0].phone.mobile}
                            </Typography>
                        </Grid>
                        <Grid container item
                            xs={12}
                        >
                            <Grid item xs={1}>
                                <MonitorHeartIcon
                                    fontSize="medium"
                                    sx={{
                                        color: theme.palette.highlight.main,
                                        marginRight: 3
                                    }}
                                />
                            </Grid>
                            <Grid item xs={11}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontSize: 20
                                    }}
                                >
                                    Some diagnosis Some diagnosis Some diagnosis Some diagnosis Some diagnosis Some diagnosis Some diagnosis Some diagnosisSome diagnosis Some diagnosis Some diagnosis
                                </Typography>
                            </Grid>
                        </Grid>
                        {
                            (appointmentDetails?.doctor.clinics?.[0].phone.landline)
                            &&
                            <Grid item
                                xs={10}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap'
                                }}
                            >
                                <LocalPhoneIcon
                                    fontSize="medium"
                                    sx={{
                                        color: theme.palette.highlight.main,
                                        marginRight: 3
                                    }}
                                />
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontSize: 20
                                    }}
                                >
                                    {appointmentDetails?.doctor.clinics?.[0].phone.mobile}
                                </Typography>
                            </Grid>

                        }
                        <Grid item
                            xs={10}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            <MedicationIcon
                                fontSize="medium"
                                sx={{
                                    color: theme.palette.highlight.main,
                                    marginRight: 3
                                }}
                            />
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: 20
                                }}
                            >
                                Prescription
                            </Typography>
                            <TableContainer>
                                <Table sx={{ maxWidth: 400 }} aria-label="Prescription">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{
                                                color: theme.palette.highlight.main,
                                                fontWeight: 'bold'
                                            }}
                                            >
                                                Drug Name</TableCell>
                                            <TableCell sx={{
                                                color: theme.palette.highlight.main,
                                                fontWeight: 'bold'
                                            }}
                                            >
                                                Dosage
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {

                                            details.map((drug) => {
                                                return (
                                                    <TableRow
                                                        key={drug.drugName}
                                                    >
                                                        <TableCell component="th">
                                                            {drug.drugName}
                                                        </TableCell>
                                                        <TableCell>
                                                            {drug.dosage}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Drawer>
            </Grid>
        );
}

export default AppointmentsTable;
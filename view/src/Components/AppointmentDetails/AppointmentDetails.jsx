import {
    Drawer,
    Grid,
    Typography,
    Box,
    useTheme,
    Link,
    Rating,
}
    from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import moment from "moment";
import AppointmentExamination from "./AppointmentExamination";
import AppointmentCancellation from "./AppointmentCancellation";
import { useState } from "react";
import CustomAlert from "../CustomAlert/CustomAlert";
import rateDoctor from "../../Network/Doctors/rateDoctor";

const AppointmentDetails = ({ appointmentDetails, role, openDrawer, setOpenDrawer }) => {
    const theme = useTheme();
    const [rateValue, setRateValue] = useState(0);
    const [ratingSent, setRatingSent] = useState(false);

    const handleRateDoctor = (value) => {
        setRateValue(value);
        const doctorId = appointmentDetails?.doctor._id;
        rateDoctor(value, doctorId)
            .then(() => {
                setRatingSent(true);
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const AppointmentDetail = (props) => {
        return (

            <Grid
                container item
                xs={10}
            >
                <Grid
                    item
                    xs={1}
                >
                    {props.children}
                </Grid>
                <Grid
                    item
                    xs={11}
                >
                    <Typography
                        variant="body2"
                        paddingLeft={2}
                    >
                        {props.detail}
                    </Typography>
                </Grid>
            </Grid>

        )
    }
    return (
        <>
            <Drawer
                open={openDrawer}
                anchor="left"
                onClose={() => { setOpenDrawer(!openDrawer) }}
                PaperProps={{
                    sx: {
                        width: { 'lg': '35vw', 'md': '50vw', 'sm': '70vw', 'xs': '90vw' },
                    }
                }}
                BackdropProps={{
                    sx: {
                        backgroundColor: 'rgba(0,0,0,0.2)'
                    }
                }}

            >
                <Grid container justifyContent="flex-start" padding={2} spacing={2}>

                    {
                        role === "user" ?

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
                                        src={appointmentDetails?.doctor.profilePicture}
                                    />
                                </Grid>
                                <Grid container item xs={6} paddingLeft="inherit">
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

                            : role === "doctor" ?

                                <AppointmentDetail
                                    detail={<Link
                                        href={`/doctors/${appointmentDetails?.doctor._id}/patients`}
                                        sx={{
                                            color: theme.palette.highlight.main
                                        }}>
                                        {appointmentDetails?.user.firstName} {appointmentDetails?.user.lastName}
                                    </Link>}
                                >
                                    <PersonIcon
                                        fontSize="medium"
                                        sx={{
                                            color: theme.palette.highlight.main,
                                            marginRight: 3
                                        }}
                                    />
                                </AppointmentDetail>
                                : <></>
                    }
                    <AppointmentDetail
                        detail={moment(appointmentDetails?.date.split('T')[0])
                            .format('dddd, MMMM Do YYYY')}
                    >
                        <CalendarTodayIcon
                            fontSize="medium"
                            sx={{
                                color: theme.palette.highlight.main,
                                marginRight: 3
                            }}
                        />
                    </AppointmentDetail>
                    <AppointmentDetail
                        detail={`at ${appointmentDetails?.time.hour}
                        : ${appointmentDetails?.time.minute}`}
                    >
                        <QueryBuilderIcon
                            fontSize="medium"
                            sx={{
                                color: theme.palette.highlight.main,
                                marginRight: 3
                            }}
                        />
                    </AppointmentDetail>
                    <AppointmentDetail
                        detail={`Duration: ${appointmentDetails?.time.duration} minutes`}
                    >
                        <HourglassBottomIcon
                            fontSize="medium"
                            sx={{
                                color: theme.palette.highlight.main,
                                marginRight: 3
                            }}
                        />
                    </AppointmentDetail>
                    <AppointmentDetail
                        detail={
                            <>
                                <>{appointmentDetails?.doctor.clinics?.[0].address.streetName}, </>
                                <>{appointmentDetails?.doctor.clinics?.[0].address.city}, </>
                                <>{appointmentDetails?.doctor.clinics?.[0].address.governorate}, </>
                                <>{appointmentDetails?.doctor.clinics?.[0].address.country} </>
                            </>
                        }
                    >
                        <LocationOnIcon
                            fontSize="medium"
                            sx={{
                                color: theme.palette.highlight.main,
                                marginRight: 3
                            }}
                        />
                    </AppointmentDetail>
                    <AppointmentDetail
                        detail={`Building No. ${appointmentDetails?.doctor.clinics?.[0].address.buildingNo}`}
                    >
                        <ApartmentIcon
                            fontSize="medium"
                            sx={{
                                color: theme.palette.highlight.main,
                                marginRight: 3
                            }}
                        />
                    </AppointmentDetail>
                    {
                        role === "user" ?
                            <AppointmentDetail
                                detail={appointmentDetails?.doctor.clinics?.[0].phone.mobile}
                            >
                                <LocalPhoneIcon
                                    fontSize="medium"
                                    sx={{
                                        color: theme.palette.highlight.main,
                                        marginRight: 3
                                    }}
                                />

                            </AppointmentDetail>

                            : role === "doctor" ?
                                <AppointmentDetail
                                    detail={appointmentDetails?.user.phoneNumber}
                                >
                                    <LocalPhoneIcon
                                        fontSize="medium"
                                        sx={{
                                            color: theme.palette.highlight.main,
                                            marginRight: 3
                                        }}
                                    />

                                </AppointmentDetail>
                                : <></>
                    }

                    <AppointmentExamination
                        appointmentDetails={appointmentDetails}
                        role={role}
                        setOpenDrawer={setOpenDrawer}
                    />

                    <Grid
                        item
                    >
                        <AppointmentCancellation
                            role={role}
                            state={appointmentDetails?.state}
                            appointmentId={appointmentDetails?._id}
                            setOpenDrawer={setOpenDrawer}
                        />
                    </Grid>

                    {
                        role === 'user' && appointmentDetails?.state === 'finished' && !ratingSent &&
                        <Grid item>
                            <Typography>How was your experience with Dr.{appointmentDetails?.doctor.firstName}?</Typography>
                            <Rating
                                name="rate-doctor"
                                value={rateValue}
                                onChange={(event, newValue) => { handleRateDoctor(newValue) }}
                                size="large"
                            />
                        </Grid>
                    }

                    {
                        role === 'user' && appointmentDetails?.state === 'finished' && ratingSent &&
                        <Grid item>
                            <CustomAlert severity="success">
                                Your rating is sent. Thank you!
                            </CustomAlert>
                        </Grid>
                    }
                </Grid>
            </Drawer>
        </>
    );
}

export default AppointmentDetails;
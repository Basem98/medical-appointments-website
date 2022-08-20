import { CardContent, CircularProgress, Typography, useTheme } from "@mui/material";
import React from "react";
import CustomFormButton from "../../Components/CustomFormButton/CustomFormButton";
import InfoCard from "../../Components/InfoCard/InfoCard";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

const Welcome = ({ userData }) => {
    const theme = useTheme();
    const isUpcomingAppointment = (index) => {
        let currentDate = new Date();
        let now = {
            year: currentDate.getUTCFullYear(),
            month: (currentDate.getUTCMonth() + 1),
            day: currentDate.getUTCDate(),
            hour: currentDate.getUTCHours(),
            minute: currentDate.getUTCMinutes()
        }
        let appointmentDate = {
            year: parseInt(userData?.appointments?.[index]?.date?.split('-')[0]),
            month: parseInt(userData?.appointments?.[index]?.date?.split('-')[1]),
            day: parseInt(userData?.appointments?.[index]?.date?.split('-')[2]),
            hour: parseInt(userData?.appointments?.[index]?.time?.hour),
            minute: parseInt(userData.appointments?.[index]?.time?.minute)
        }
        if (appointmentDate) {
            for (let property in appointmentDate) {
                return now[property] > appointmentDate[property] ? false : true;
            }
        }
    }
    const upcomingAppointments = userData?.appointments?.filter((_, index) => {
        return isUpcomingAppointment(index);
    });
    console.log(upcomingAppointments)
    return (
        <>
            <Grid>
                {
                    upcomingAppointments ?
                        <InfoCard>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={10}>
                                        <Typography>Welcome, {userData.firstName}!</Typography>
                                    </Grid>
                                    {
                                        upcomingAppointments?.length === 0 ?
                                            <Grid item xs={10}>
                                                <Typography>You don't have any upcoming appointments.</Typography>
                                                <Grid item xs={10} marginTop={4}>
                                                    <Link
                                                        to="/specialists"
                                                    >
                                                        <CustomFormButton variant="contained">
                                                            Book Now!
                                                        </CustomFormButton>
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                            :
                                            <Grid item xs={10}>
                                                <Typography>You have {upcomingAppointments?.length} upcoming appointment(s).</Typography>
                                                <Grid item xs={10} marginTop={4}>
                                                    <Link
                                                        to={`/users/${userData?._id}/appointments`}
                                                    >
                                                        <CustomFormButton variant="contained">
                                                            Show Appointments
                                                        </CustomFormButton>
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                    }
                                </Grid>
                            </CardContent>
                        </InfoCard>
                        :
                        <Grid item xs={10} sx={{ textAlign: "center" }}>
                            <CircularProgress sx={{
                                color: theme.palette.highlight.main
                            }} />
                        </Grid>
                }
            </Grid>
        </>
    );
}

export default Welcome;
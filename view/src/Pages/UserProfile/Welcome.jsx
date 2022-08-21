/* eslint-disable react-hooks/exhaustive-deps */
import { CardContent, CircularProgress, Typography, useTheme } from "@mui/material";
import React from "react";
import CustomFormButton from "../../Components/CustomFormButton/CustomFormButton";
import InfoCard from "../../Components/InfoCard/InfoCard";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import getUpcomings from "../../Network/Doctors/getUpcomings";
import { setUpcomingAppointments } from "../../Store/Features/Appointments/upcomingAppointmentsSlice";

const Welcome = ({ userData }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const upcomingAppointments = useSelector((state) => state.upcomingAppointments.data);
    const userId = useSelector((state) => state.userDetails?.data?._id);
    useEffect(() => {
        getUpcomings(userId)
            .then((response) => {
                dispatch((setUpcomingAppointments({
                    upcomingAppointments: response.data.message
                })));
            })
            .catch((error) => { console.log(error) })
    }, [userId])
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
                                                        style={{ textDecoration: "none" }}
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
                                                        style={{ textDecoration: 'none' }}
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
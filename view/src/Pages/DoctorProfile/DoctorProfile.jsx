import { Grid, useTheme } from "@mui/material";
import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import getDoctor from "../../Network/Doctors/getDocotor";
import getUpcomings from "../../Network/Doctors/getUpcomings";
import InfoCard from "../../Components/InfoCard/InfoCard";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CustomFormButton from "../../Components/CustomFormButton/CustomFormButton";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import checkAuthentication from "../../Network/Base/checkAuthentication";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../Store/Features/UserDetails/userDetailsSlice";

const DoctorProfile = () => {
    const dispatch = useDispatch();

    const theme = useTheme();
    const id = "62f8f6acc5842627fdd9d631";

    const [doctorData, setDoctorData] = useState(null);
    const [upcomings, setUpcomings] = useState(null);

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
                console.log(error);
            })
        getDoctor(id)
            .then((response) => {
                setDoctorData(response.data.message);
            })
            .catch((error) => {
                console.log(error);
            })
        getUpcomings(id)
            .then((response) => {
                console.log(response.data.message);
                setUpcomings(response.data.message);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [dispatch]);

    return (
        <>
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
                                                    to="/doctors/:id/appointments"
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
            </Grid>
        </>
    );
}

export default DoctorProfile;
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

const DoctorProfile = () => {
    const theme = useTheme();
    const id = "62e7c235150862d88def8161";

    const [doctorData, setDoctorData] = useState(null);
    const [upcomings, setUpcomings] = useState(null);

    useEffect(() => {
        getDoctor(id)
            .then((response) => {
                setDoctorData(response.data.message);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        getUpcomings(id)
            .then((response) => {
                console.log(response.data.message);
                setUpcomings(response.data.message);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

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
                    doctorData ? (
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
                        <Grid item xs={10} sx={{textAlign: "center"}}>
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
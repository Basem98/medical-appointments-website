/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, useTheme } from "@mui/material";
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
import checkAuthentication from "../../Network/Base/checkAuthentication";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../Store/Features/UserDetails/userDetailsSlice";
import { authenticate } from "../../Helper/Authentication";

const DoctorProfile = () => {
    const doctorData = useSelector((state) => state.userDetails.data)
    const role = useSelector((state) => state.userDetails.role);
    const dispatch = useDispatch();
    const theme = useTheme();
    const [upcomings, setUpcomings] = useState(null);

    const navigate = useNavigate();

    authenticate('Doctor', navigate, dispatch);

    useEffect(() => {
        doctorData?._id &&
            getUpcomings(doctorData?._id)
                .then((response) => {
                    setUpcomings(response.data.message);
                })
                .catch((error) => {
                    console.log(error);
                })
    }, [doctorData])

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
                :
                <></>
            }
        </>
    );
}

export default DoctorProfile;
import { Grid } from "@mui/material";
import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import getDoctor from "../../Network/Doctors/getDocotor";

const DoctorProfile = () => {
    const id = "62e7c235150862d88def8161";

    const [doctorData, setDoctorData] = useState(null);
    useEffect(() => {
        getDoctor(id)
            .then((response) => {
                setDoctorData(response.data.message);
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
                justifyContent='flex-end'
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
            </Grid>
        </>
    );
}

export default DoctorProfile;
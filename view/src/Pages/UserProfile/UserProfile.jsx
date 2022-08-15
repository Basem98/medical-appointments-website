import React from "react";
import { useState } from "react";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import loginUser from "../../Network/Users/login";
import Grid from "@mui/material/Grid";
import Welcome from "./Welcome";
import { useEffect } from "react";

const UserProfile = () => {

    const [userData, setUserData] = useState({});

    useEffect(() => {
        loginUser("62e88ec51b557976cbe9e1f9")
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => console.log(error));
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
                    !userData.isVerified &&
                    <Grid item xs={11} md={9} sx={{ marginTop: '10px' }}>
                        <CustomAlert
                            severity="warning"
                        >
                            Your profile is not verified yet!
                            Please check your email to verify.
                        </CustomAlert>
                    </Grid>
                }
                <Grid item xs={12} md={9}>
                    <Welcome
                        userData={userData}
                    />
                </Grid>

            </Grid>
        </>
    );
}

export default UserProfile;
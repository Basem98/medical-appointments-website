import React from "react";
import { useState } from "react";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import loginUser from "../../Network/Users/login";
import Grid from "@mui/material/Grid";
import Welcome from "./Welcome";
import { useEffect } from "react";

const UserProfile = () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZThkMzkzMWRiMDg4NmQ5ZDAxNzJlNyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjU5NDI1OTczLCJleHAiOjE2NTk1MTIzNzN9.a5Hm7AUjZ28-lVchOrTfBmsbtSHLa-AwjrISIt7xDMI";
    const [userData, setUserData] = useState({});

    useEffect(() => {
        loginUser("62e8d3931db0886d9d0172e7", token)
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            <Grid width='90%' container spacing={2} justifyContent='flex-end'>
                {
                    !userData.isVerified &&
                    <Grid item xs={9} md={9} sx={{ marginTop: '10px' }}>
                        <CustomAlert
                            severity="warning"
                        >
                            Your profile is not verified yet!
                            Please check your email to verify.
                        </CustomAlert>
                    </Grid>
                }
                <Grid item xs={9} md={9}>
                    <Welcome
                        userData={userData}
                    />
                </Grid>

            </Grid>
        </>
    );
}

export default UserProfile;
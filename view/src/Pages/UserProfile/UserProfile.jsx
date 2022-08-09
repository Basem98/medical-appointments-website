import React from "react";
import { useState } from "react";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import loginUser from "../../Network/Users/login";
import Grid from "@mui/material/Grid";
import Welcome from "./Welcome";
import { useEffect } from "react";

const UserProfile = () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTg4ZWM1MWI1NTc5NzZjYmU5ZTFmOSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjU5NjA0ODQwLCJleHAiOjE2NjIxOTY4NDB9.oOF8svSwyQAJK2MiPaz369XvDXUDUIGm9UBj7IjotuE";
    const [userData, setUserData] = useState({});

    useEffect(() => {
        loginUser("62e88ec51b557976cbe9e1f9", token)
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
                    <Grid item xs={12} md={9} sx={{ marginTop: '10px' }}>
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
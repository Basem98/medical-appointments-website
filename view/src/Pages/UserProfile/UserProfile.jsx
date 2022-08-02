import React from "react";
import { useState } from "react";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import loginUser from "../../Network/Users/login";
import NavBar from "../Home/NavBar";
import Grid from "@mui/material/Grid";
import Welcome from "./Welcome";
import { useEffect } from "react";

const UserProfile = () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTBmYTUwMWI1ZmUxYTVhZmNlMmI0ZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjU5MDMyMjQ3LCJleHAiOjE2NTkwMzU4NDd9.CVLKDpvWDjpvxZ1O3h4wGr3j-El2EFdiW82GMuXiIx4";
    const [userData, setUserData] = useState({});

    useEffect(() => {
        loginUser("62e0fa501b5fe1a5afce2b4e", token)
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            <NavBar></NavBar>
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
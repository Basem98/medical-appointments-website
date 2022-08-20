/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import loginUser from "../../Network/Users/login";
import Grid from "@mui/material/Grid";
import Welcome from "./Welcome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../../Helper/Authentication";
const UserProfile = () => {

    const userId = useSelector((state) => state.userDetails.data?._id);
    const role = useSelector((state) => state.userDetails.role);

    const navigate = useNavigate();

    const [userData, setUserData] = useState({});
    const dispatch = useDispatch();

   authenticate('User', navigate, dispatch);

    useEffect(() => {
        userId &&
            loginUser(userId)
                .then((response) => {
                    setUserData(response.data);
                })
                .catch((error) => console.log(error));
    }, [userId]);

    return (
        <>
            {
                role === 'User' ?
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
                    :
                    <></>
            }
        </>
    );
}

export default UserProfile;
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
import resendVerification from "../../Network/Base/resendVerification";
import Button from "@mui/material/Button";

const UserProfile = () => {

    const userId = useSelector((state) => state.userDetails.data?._id);
    const role = useSelector((state) => state.userDetails.role);

    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const [resendVerificationFeedback, setResendVerificationFeedback] = useState(false);
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

    const handleResendVerification = () => {
        resendVerification(userId, 'User')
            .then(() => {
                setResendVerificationFeedback(true);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            {
                role === 'User' ?
                    <Grid
                        container
                        spacing={2}
                        justifyContent='center'
                        sx={{
                            width: {
                                'xs': '100%',
                                'md': '90%'
                            },
                            margin: '0 auto'
                        }}
                    >
                        {
                            userData &&
                            !userData?.isVerified && !resendVerificationFeedback ?
                                <Grid item xs={11} md={9} sx={{ marginTop: '10px' }}>
                                    <CustomAlert severity="warning">
                                        Your profile is not verified yet!
                                        Please check your email to verify.
                                        <Grid>
                                            <Button xs={{ color: 'red' }} onClick={handleResendVerification}>
                                                Resend verification
                                            </Button>
                                        </Grid>
                                    </CustomAlert>
                                </Grid>
                                : resendVerificationFeedback ?
                                    <Grid
                                        item
                                        xs={11}
                                        md={9}
                                        sx={{ marginTop: '10px' }}
                                    >
                                        <CustomAlert severity="info">
                                            Verification email resent! Please checkout your email.
                                        </CustomAlert>

                                    </Grid> : <></>

                        }
                        <Grid item xs={12} md={9} marginBottom={2}>
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
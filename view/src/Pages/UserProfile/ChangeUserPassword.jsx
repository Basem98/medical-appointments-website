/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Formik, Form } from "formik";
import { Grid } from "@mui/material";
import InputField from "../../Components/InputField/InputField";
import CustomFormButton from "../../Components/CustomFormButton/CustomFormButton";
import * as Yup from "yup";
import { useRef, useEffect } from "react";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import changePassword from "../../Network/Users/changePassword";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import { useDispatch, useSelector } from "react-redux";
import checkAuthentication from "../../Network/Base/checkAuthentication";
import { setUserDetails } from "../../Store/Features/UserDetails/userDetailsSlice";

const ChangePassword = () => {
    const userId = useSelector((state) => state.userDetails.data?._id);
    const dispatch = useDispatch();
    const [wrongPassword, setWorongPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState('password');
    const [showNewPassword, setShowNewPassword] = useState('password');
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState('password');

    const formRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuthentication()
            .then((response) => {
                dispatch(setUserDetails({
                    role: response.data.role,
                    data: response.data.data,
                    email: response.data.data.email
                }))
                if(response.data.role !== 'User') {
                    navigate('/');
                }
            })
            .catch((error) => {
                navigate('/');
            })
    }, []);

    const handleSubmit = (e) => {
        const formValues = formRef.current.values;
        const data = {
            password: formValues.newPassword,
            currentPassword: formValues.currentPassword,
        };
        changePassword(userId, data)
            .then((response) => {
                navigate('/users/:id/profile', { replace: true });
            })
            .catch((error) => {
                setWorongPassword(true);
            })
    }
    return (
        <>
            <Grid
                container
                justifyContent="center"
            >
                {
                    wrongPassword &&
                    <CustomAlert 
                        severity="error"
                    >
                        Wrong password! Make sure to enter the correct password.
                    </CustomAlert>
                }
                <Grid
                    item
                >
                    <Formik
                        initialValues={{
                            currentPassword: '',
                            newPassword: '',
                            confirmNewPassword: ''
                        }}
                        validationSchema={
                            Yup.object({
                                newPassword: Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g, { message: 'Your password should be at least 8 characters long and it should consist of at least one uppercase letter, one lowercase letter, one number, and one symbol' }).required('This field is required'),
                                confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Your passwords must match').required('This field is required')
                            })
                        }
                        innerRef={formRef}
                        onSubmit={handleSubmit}
                    >
                        {
                            (props) => (
                                <Form>
                                    <Grid container justifyContent='center' alignItems='center'>
                                        <Grid item xs={10} sx={{ marginTop: '25px' }}>
                                            <InputField label='Password' name='currentPassword' placeholder='Current Password'
                                                type={showCurrentPassword}
                                            >
                                                <VpnKeyIcon></VpnKeyIcon>
                                                {showCurrentPassword === 'password' ?
                                                    <VisibilityIcon onClick={() => setShowCurrentPassword('text')} cursor='pointer' />
                                                    : <VisibilityOffIcon onClick={() => setShowCurrentPassword('password')} cursor='pointer' />
                                                }
                                            </InputField>
                                        </Grid>
                                        <Grid item xs={10} sx={{ marginTop: '25px' }}>
                                            <InputField label='Password' name='newPassword' placeholder='New Password'
                                                type={showNewPassword}
                                            >
                                                <VpnKeyIcon></VpnKeyIcon>
                                                {showNewPassword === 'password' ?
                                                    <VisibilityIcon onClick={() => setShowNewPassword('text')} cursor='pointer' />
                                                    : <VisibilityOffIcon onClick={() => setShowNewPassword('password')} cursor='pointer' />
                                                }
                                            </InputField>
                                        </Grid>
                                        <Grid item xs={10} sx={{ marginTop: '25px' }}>
                                            <InputField label='Confirm Password' name='confirmNewPassword' placeholder='Confirm New Password'
                                                type={showConfirmNewPassword}
                                            >
                                                <VpnKeyIcon></VpnKeyIcon>
                                                {showConfirmNewPassword === 'password' ?
                                                    <VisibilityIcon onClick={() => setShowConfirmNewPassword('text')} cursor='pointer' />
                                                    : <VisibilityOffIcon onClick={() => setShowConfirmNewPassword('password')} cursor='pointer' />
                                                }
                                            </InputField>
                                        </Grid>
                                        <Grid item xs={8} sx={{ marginTop: '25px' }}>
                                            <CustomFormButton variant="contained" type="submit" xs={8} sx={{ width: '100%', mb: '50px' }}>Submit</CustomFormButton>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )
                        }

                    </Formik>
                </Grid>
            </Grid>
        </>
    );
}

export default ChangePassword;
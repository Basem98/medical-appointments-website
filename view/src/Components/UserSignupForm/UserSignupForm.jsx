import React, { useRef, useState } from "react";
import "./UserSignupForm.css"
import { Grid } from "@mui/material";
import InputField from '../InputField/InputField'
import { Formik, Form } from "formik";
import theme from "../../Helper/CustomTheme";
import CustomFormButton from "../CustomFormButton/CustomFormButton";
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {personalFormStepValidation } from "../../Helper/ValidationSchema";

export default function UserSignupForm() {

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPasswordToggle = () => setShowPassword(!showPassword);

    const formRef = useRef(null);

    const handleSubmit = () => {
        const formValues = formRef.current.values;
        const userData = {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            phoneNumber: formValues.phoneNumber,
            email: formValues.email,
            password: formValues.password
        };
    }
    return (
        <>
            <Grid container height='100vh' justifyContent='center' alignItems='center' sx={{ backgroundColor: 'rgba(249, 249, 249, 0.5)', marginY: -1 }}>
                <Grid container item height='fit-content' xl={4} lg={6} md={6} sm={8} xs={12} sx={{
                    background: 'linear-gradient(180deg, #21D0C3 0%, rgba(166, 224, 214, 0.25) 22.4%)',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: '20px'
                }}>
                    <Grid item sx={{ width: '100%' }}>
                        <h2 style={{ ...theme.typography.h2, textAlign: 'center' }}>Sign Up</h2>
                    </Grid>
                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            phoneNumber: '',
                            email: '',
                            password: '',
                            passwordConfirmation: ''

                        }}
                        validationSchema={personalFormStepValidation}
                        onSubmit = {handleSubmit}
                        innerRef = {formRef}
                    >
                        {
                            (props) => (
                                <Form>
                                    <Grid container justifyContent='center' alignItems='center'>
                                        <Grid item xs={10} md={5} sx={{ marginTop: '25px' }}>
                                            <InputField 
                                            label='First Name' 
                                            name='firstName' 
                                            placeholder='First Name' 
                                            >
                                                <PersonIcon></PersonIcon>
                                            </InputField>
                                        </Grid>
                                        <Grid item xs={10} md={5} sx={{ marginTop: '25px', ml: '1px' }}>
                                            <InputField label='Last Name' name='lastName' placeholder='Last Name' >
                                                <PersonIcon></PersonIcon>
                                            </InputField>
                                        </Grid>
                                        <Grid item xs={10} sx={{ marginTop: '25px' }}>
                                            <InputField label='Phone Number' name='phoneNumber' placeholder='Phone Number'>
                                                <PhoneIcon></PhoneIcon>
                                            </InputField>
                                        </Grid>
                                        <Grid item xs={10} sx={{ marginTop: '25px' }}>
                                            <InputField label='Email' name='email' placeholder='Enter Your Email'>
                                                <EmailIcon></EmailIcon>
                                            </InputField>
                                        </Grid>
                                        <Grid item xs={10} sx={{ marginTop: '25px' }}>
                                            <InputField label='Password' name='password' placeholder='Password'
                                                type={showPassword ? "text" : "password"}
                                            >
                                                <VpnKeyIcon></VpnKeyIcon>
                                                {showPassword ?
                                                    <VisibilityOffIcon onClick={handleShowPasswordToggle} cursor='pointer' /> :
                                                    <VisibilityIcon onClick={handleShowPasswordToggle} cursor='pointer' />}
                                            </InputField>
                                        </Grid>
                                        <Grid item xs={10} sx={{ marginTop: '25px' }}>
                                            <InputField label='Confirm Password' name='passwordConfirmation' placeholder='Confirm Password'
                                                type={showPassword ? "text" : "password"}
                                            >
                                                <VpnKeyIcon></VpnKeyIcon>
                                                {showPassword ?
                                                    <VisibilityOffIcon onClick={handleShowPasswordToggle} cursor='pointer' /> :
                                                    <VisibilityIcon onClick={handleShowPasswordToggle} cursor='pointer' />}
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
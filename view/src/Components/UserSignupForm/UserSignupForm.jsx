import React, { useRef, useState } from "react";
import "./UserSignupForm.css"
import { Grid, Typography } from "@mui/material";
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
import { personalFormStepValidation } from "../../Helper/ValidationSchema";
import submitUserData from "../../Network/Users/register";
import CustomAlert from "../CustomAlert/CustomAlert";

export default function UserSignupForm() {

    const [showPassword, setShowPassword] = useState('password');
    const [showConfirmPassword, setShowConfirmPassword] = useState('password');
    const [isDuplicated, setIsDuplicated] = useState(false);
    const [duplicationErrorsArray, setDuplicationErrorsArray] = useState([]);

    const handleDuplicationError = () => {
        return duplicationErrorsArray.map((errorMessage, index) => {
            return (
                <CustomAlert
                    severity="error"
                    key={index}
                >
                    {errorMessage}
                </CustomAlert>
            );
        });
    }

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
        submitUserData(userData)
            .then((response) => console.log(response))
            .catch((error) => {
                setIsDuplicated(true);
                let errorMessagesArray = JSON.parse(error.response.data.error);
                setDuplicationErrorsArray(errorMessagesArray);
            })
    }

    return (
        <>
            <Grid container justifyContent='center' alignItems='center'>
                <Grid container item  sx={{
                    background: theme.palette.linearFormBg.main,
                    boxShadow: theme.shadows[5],
                    borderRadius: '20px'
                }}>
                    <Grid item sx={{ width: '100%' }}>
                        <Typography variant='h2' style={{ textAlign: 'center' }}>Sign Up</Typography>
                    </Grid>

                    <Grid item xs={10} sx={{ margin: '0 auto' }}>
                        {
                            isDuplicated &&
                            handleDuplicationError()
                        }
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
                        onSubmit={handleSubmit}
                        innerRef={formRef}
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
                                                type={showPassword}
                                            >
                                                <VpnKeyIcon></VpnKeyIcon>
                                                {showPassword === 'password' ?
                                                    <VisibilityIcon onClick={() => setShowPassword('text')} cursor='pointer' />
                                                    : <VisibilityOffIcon onClick={() => setShowPassword('password')} cursor='pointer' />
                                                }
                                            </InputField>
                                        </Grid>
                                        <Grid item xs={10} sx={{ marginTop: '25px' }}>
                                            <InputField label='Confirm Password' name='passwordConfirmation' placeholder='Confirm Password'
                                                type={showConfirmPassword}
                                            >
                                                <VpnKeyIcon></VpnKeyIcon>
                                                {showConfirmPassword === 'password' ?
                                                    <VisibilityIcon onClick={() => setShowConfirmPassword('text')} cursor='pointer' />
                                                    : <VisibilityOffIcon onClick={() => setShowConfirmPassword('password')} cursor='pointer' />
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
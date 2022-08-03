import { CircularProgress, FormGroup, Grid, IconButton, InputLabel, Link, Typography } from '@mui/material';
import { Form, Formik } from 'formik'
import { useTheme } from '@mui/material';
import InputField from '../InputField/InputField';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import { VisibilityRounded, VisibilityOffRounded, AccountCircleRounded, LocalHospitalRounded } from '@mui/icons-material';
import CustomFormButton from '../CustomFormButton/CustomFormButton';
import * as Yup from 'yup'
import React from 'react';
import { useState } from 'react';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import submitUserData from '../../Network/Users/userLogin';
import CustomAlert from '../CustomAlert/CustomAlert';


const UserSignInForm = () => {
    const [isVisible, setVisibility] = useState(false);
    const [role, setRole] = useState('user');
    const [serverResponse, setServerResponse] = useState({ success: false, msg: '' });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const handlePass = () => {
        if (isVisible) {
            setVisibility(false)
        }
        else {
            setVisibility(true)
        }
    }
    const initialValues = {
        email: "",
        password: "",
        rememberMe: false,
        role: "user"
    };
    const validationSchema = Yup.object({
        email: Yup.string().email('You must provide a valid email (example@organization.domain)').required('This field is required'),
        password: Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g, { message: 'Your password should be at least 8 characters long and it should consist of at least one uppercase letter, one lowercase letter, one number, and one symbol' }).required('This field is required')
    });
    const onSubmit = (values) => {
        setFormSubmitted(true);
        submitUserData(values)
            .then(async (res) => {
                setServerResponse({ success: true, msg: res.data.message });
            })
            .catch(err => {
                setServerResponse({ success: false, msg: err.response.data.message || err.response.data.error });
            })
    }

    const theme = useTheme()
    return (
        <Grid container style={{ background: theme.palette.linearFormBg.main, borderRadius: 20, boxShadow: theme.shadows[5] }} justifyContent='center'>
            <Grid item xs={12} justifyContent='center'>
                <Typography variant='h2' style={{ color: theme.palette.text.primary, textAlign: 'center' }}>Log In</Typography>
            </Grid>
            <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {(formik) => (<Form>
                    <Grid container item justifyContent='center'>
                        <Grid container item xs={8} md={7} justifyContent='space-evenly'>
                            <Grid item xs={4} justifyContent='center'>
                                <InputLabel
                                    htmlFor='userRadio'
                                    sx={{ whiteSpace: 'break-spaces', verticalAlign: 'top', textAlign: 'center', fontSize: '16px', marginY: '10px' }}>
                                    <p style={{ margin: 0 }}>As</p> a user</InputLabel>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <IconButton color="highlight" component='label'
                                        sx={{ borderBottom: role === 'user' ? `1px solid ${theme.palette.highlight.main}` : 'none' }}
                                        onClick={() => {
                                            setRole('user');
                                            formik.setFieldValue('role', 'user');
                                        }}>
                                        <input type="radio" name="role" value="user" id="userRadio" style={{ display: 'none' }} />
                                        <AccountCircleRounded
                                            sx={{ fontSize: 70, color: role === 'user' ? theme.palette.highlight.main : theme.palette.text.primary, marginX: 'auto' }} />
                                    </IconButton>
                                </div>
                            </Grid>
                            <Grid item xs={4} justifyContent='center'>
                                <InputLabel
                                    htmlFor='doctorRadio'
                                    sx={{ whiteSpace: 'break-spaces', verticalAlign: 'top', textAlign: 'center', fontSize: '16px', marginY: '10px' }}>
                                    <p style={{ margin: 0 }}>As</p> a doctor</InputLabel>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <IconButton color="highlight"
                                        component='label' sx={{ borderBottom: role === 'doctor' ? `1px solid ${theme.palette.highlight.main}` : 'none' }}
                                        onClick={() => {
                                            setRole('doctor');
                                            formik.setFieldValue('role', 'doctor');
                                        }}>
                                        <input type="radio" name="role" value="doctor" id="doctorRadio" style={{ display: 'none' }} />
                                        <LocalHospitalRounded
                                            sx={{ fontSize: 70, color: role === 'doctor' ? theme.palette.highlight.main : theme.palette.text.primary, marginX: 'auto' }} />
                                    </IconButton>
                                </div>
                            </Grid>
                        </Grid>
                        {
                            <Grid item xs={8} md={7} justifyContent='center' textAlign='center' marginTop='25px'>
                                {serverResponse.msg && formSubmitted ?
                                    <CustomAlert
                                        severity={serverResponse.success ? 'success' : 'error'}
                                        sx={{ boxShadow: theme.shadows[1] }}
                                        onClose={() => {
                                            setServerResponse({ success: false, msg: '' });
                                            setFormSubmitted(false);
                                        }}>{serverResponse.msg}</CustomAlert>
                                    : formSubmitted && <CircularProgress color='highlight' sx={{ marginY: '10px' }} />}
                            </Grid>
                        }
                        <Grid item xs={8} md={7} marginTop='25px'>
                            <InputField
                                id="email"
                                name="email"
                                type="text"
                                placeholder="Enter your email"><EmailRoundedIcon />
                            </InputField>
                        </Grid>
                        <Grid item xs={8} md={7} marginTop='25px'>
                            <InputField
                                id="password"
                                name="password"
                                type={isVisible ? "text" : "password"}
                                placeholder="Enter your password"

                            >
                                <VpnKeyRoundedIcon />
                                {isVisible ?
                                    <VisibilityOffRounded onClick={handlePass} cursor={'pointer'} /> :
                                    <VisibilityRounded onClick={handlePass} cursor={'pointer'} />}
                            </InputField>
                        </Grid>
                        <Grid container item xs={8} md={7} justifyContent={'space-between'} marginTop='25px'>
                            <FormGroup>
                                <CustomCheckbox label="Remember me" name='rememberMe' />
                            </FormGroup>
                            <Link href="#" style={{ ...theme.typography.body2, alignSelf: 'center', color: theme.palette.highlight.main }}>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid container marginTop='50px' marginLeft='1px' justifyContent={'center'}>
                            <Grid item xs={4} marginBottom='50px'>
                                <CustomFormButton variant='contained' type={'submit'} fullWidth>Log in</CustomFormButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Form >)}
            </Formik >

        </Grid >
    )
}
export default UserSignInForm;
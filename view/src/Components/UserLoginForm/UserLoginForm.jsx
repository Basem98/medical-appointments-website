import { CircularProgress, FormGroup, Grid, Typography } from '@mui/material';
import { Form, Formik } from 'formik'
import { useTheme } from '@mui/material';
import InputField from '../InputField/InputField';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import { VisibilityRounded, VisibilityOffRounded } from '@mui/icons-material';
import CustomFormButton from '../CustomFormButton/CustomFormButton';
import * as Yup from 'yup'
import React from 'react';
import { useState } from 'react';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import CustomAlert from '../CustomAlert/CustomAlert';
import submitUserData from '../../Network/Base/login';
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../Store/Features/UserDetails/userDetailsSlice";
import RoleToggler from '../RoleToggler/RoleToggler';
import { Link, useNavigate } from 'react-router-dom';

const UserSignInForm = ({ open, handleClose }) => {
    const dispatch = useDispatch()
    const [isVisible, setVisibility] = useState(false);
    const [role, setRole] = useState('User');
    const [serverResponse, setServerResponse] = useState({ success: false, msg: '' });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const navigate = useNavigate();
    const handleRoleChange = (newRole, setRoleValue) => {
        setRole(newRole);
        setRoleValue('role', newRole);
    }
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
        role: "User"
    };
    const validationSchema = Yup.object({
        email: Yup.string().email('You must provide a valid email (example@organization.domain)').required('This field is required'),
        password: Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g, { message: 'Your password should be at least 8 characters long and it should consist of at least one uppercase letter, one lowercase letter, one number, and one symbol' }).required('This field is required')
    });
    const onSubmit = (values) => {
        setFormSubmitted(true);
        submitUserData(values)
            .then((res) => {
                setServerResponse({ success: true, msg: `${res.data.message}. This form will close automatically in 1 second...` });
                dispatch(setUserDetails({
                    email: values.email,
                    token: res.data.token,
                    role: res.data.role,
                    data: res.data.data
                }));
                setTimeout(() => {handleClose(false)}, 1000);
                return res;
            })
            .catch(err => {
                if (err.response.status === 404 || err.response.status === 400) {
                    setServerResponse({ success: false, msg: 'Wrong email or password. Please make sure your credentials are correct.' });
                } else {
                    setServerResponse({ success: false, msg: 'Something went wrong! Please, try again. Contact us if you need any help with the process.' });
                }
            })
    }


    const theme = useTheme()
    return (
        <Grid container style={{ background: theme.palette.linearFormBg.main, borderRadius: 20, boxShadow: theme.shadows[5], padding: '30px 0' }} justifyContent='center'>
            <Grid item xs={12} justifyContent='center'>
                <Typography variant='h2' style={{ color: theme.palette.text.primary, textAlign: 'center' }}>Log In</Typography>
            </Grid>
            <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {(formik) => (<Form>
                    <Grid container item justifyContent='center'>
                        <Grid container item xs={8} md={7} justifyContent='space-evenly' marginY='10px'>
                            <RoleToggler role={role} setRole={(newRole) => handleRoleChange(newRole, formik.setFieldValue)} />
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
                        <Grid container item xs={8} md={7} justifyContent={'space-between'} alignItems='center' marginTop='25px'>
                            <FormGroup>
                                <CustomCheckbox label="Remember me" name='rememberMe' />
                            </FormGroup>
                            <Link
                                to={"/"}
                                state={{ showModal: true, form: 'VerificationForm' }}
                                style={{ textDecoration: 'none', color: theme.palette.highlight.main, ...theme.typography.body2 }}
                            >
                                Forgot your password?
                            </Link>
                        </Grid>
                        <Grid container marginTop='50px' justifyContent={'center'}>
                            <Grid item xs={4}>
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
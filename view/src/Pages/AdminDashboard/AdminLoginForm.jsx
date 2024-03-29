import { CircularProgress, FormGroup, Grid, Link, Typography, Box } from '@mui/material';
import { Form, Formik } from 'formik'
import { useTheme } from '@mui/material';
import InputField from '../../Components/InputField/InputField';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import { VisibilityRounded, VisibilityOffRounded } from '@mui/icons-material';
import CustomFormButton from '../../Components/CustomFormButton/CustomFormButton';
import * as Yup from 'yup'
import React from 'react';
import { useState } from 'react';
import CustomCheckbox from '../../Components/CustomCheckbox/CustomCheckbox';
import CustomAlert from '../../Components/CustomAlert/CustomAlert';
import submitUserData from '../../Network/Base/login';
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../Store/Features/UserDetails/userDetailsSlice";
import { useNavigate } from 'react-router-dom';
// import RoleToggler from '../RoleToggler/RoleToggler';

const AdminSignInForm = ({ setDisplayNavFooter }) => {
    setDisplayNavFooter(false);
    const dispatch = useDispatch()
    const [isVisible, setVisibility] = useState(false);

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
        role: "Admin"
    };
    const validationSchema = Yup.object({
        email: Yup.string().email('You must provide a valid email (example@organization.domain)').required('This field is required'),
        password: Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g, { message: 'Your password should be at least 8 characters long and it should consist of at least one uppercase letter, one lowercase letter, one number, and one symbol' }).required('This field is required')
    });
    const onSubmit = (values) => {
        setFormSubmitted(true);
        submitUserData(values)
            .then((res) => {
                setServerResponse({ success: true, msg: res.data.message });
                dispatch(setUserDetails({ email: values.email, role: res.data.role, data: res.data.data }));
                return res;
            })
            .then((res) => {
                if (res.status === 200) setTimeout(() => { navigate('/dashboard/statistics') }, 3000);
            })
            .catch(err => {
                if (err.response.status === 404) {
                    setServerResponse({ success: false, msg: 'Wrong email or password. Please make sure your credentials are correct.' });
                } else {
                    setServerResponse({ success: false, msg: 'Something went wrong! Please, try again. Contact us if you need any help with the process.' });
                }
            })
    }


    const theme = useTheme()
    const navigate = useNavigate();
    return (
        <Grid container justifyContent='center' alignItems='center' height="100vh">
            <Grid item md={4} sm={6} xs={10} container sx={{ background: theme.palette.linearFormBg.main, borderRadius: '20px', boxShadow: theme.shadows[5], padding: '30px 0'  }} justifyContent='center'>
                <Grid item xs={12} justifyContent='center'>
                    <Typography variant='h2' style={{ color: theme.palette.text.primary, textAlign: 'center' }}>Admin</Typography>
                    <Typography variant='h5' style={{ color: theme.palette.text.primary, textAlign: 'center' }}>Log In</Typography>
                </Grid>
                <Formik initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                    {(formik) => (<Form>
                        <Grid container item justifyContent='center'>
                            {/* <Grid container item xs={8} md={7} justifyContent='space-evenly'>
                                <RoleToggler role={role} setRole={(newRole) => handleRoleChange(newRole, formik.setFieldValue)} />
                            </Grid> */}
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
                            <Grid item xs={8} md={9} marginTop='25px'>
                                <InputField
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder="Enter your email"><EmailRoundedIcon />
                                </InputField>
                            </Grid>
                            <Grid item xs={8} md={9} marginTop='25px'>
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
                                <Link href="/verify" style={{ ...theme.typography.body2, alignSelf: 'center', color: theme.palette.highlight.main }}>
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
        </Grid>

    )
}
export default AdminSignInForm;
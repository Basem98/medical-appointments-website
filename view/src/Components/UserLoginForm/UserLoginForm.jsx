import { Checkbox, FormGroup, Grid, FormControlLabel, Link, Button } from '@mui/material';
import { Form, Formik } from 'formik'
import { useTheme } from '@mui/material';
import InputField from '../InputField/InputField';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import CustomFormButton from '../CustomFormButton/CustomFormButton';
import * as Yup from 'yup'
import React from 'react';
import { useState } from 'react';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import axios from 'axios'
import submitUserData from '../../Network/Users/userLogin';

const User_Login_url ='/userlogin'

const UserSignInForm = () => {
    const [isVisible, setVisibility] = useState(false)
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
        rememberMe:false
    };
    const validationSchema=Yup.object({
        email: Yup.string().email('You must provide a valid email (example@organization.domain)').required('This field is required'),
        password: Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g, { message: 'Your password should be at least 8 characters long and it should consist of at least one uppercase letter, one lowercase letter, one number, and one symbol' }).required('This field is required')
    });
    const onSubmit = async (values)=>{
        const email = values.email
        const password = values.password
        await submitUserData({email,password})
        .then((res)=>{console.log(res.data.token)})
        .catch(err=>console.log(err))
    }

    const Theme = useTheme()
    return (
        <Grid container style={{ background: Theme.palette.linearFormBg.main, borderRadius: 20, boxShadow: Theme.shadows[5] }}>
            <Grid xs={12} item style={{ ...Theme.typography.h2, color: Theme.palette.text.primary, textAlign: 'center' }}>
                <h2 style={{ textAlign: 'center' }}>Log in</h2>
            </Grid>
            <Formik initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
                <Form>
                    <Grid container item justifyContent={'center'}>
                        <Grid item xs={6} marginTop='25px' marginLeft='1px' >
                            <InputField
                                id="email"
                                name="email"
                                type="text"
                                placeholder="Enter your email"><EmailRoundedIcon />
                            </InputField>
                        </Grid>
                        <Grid item xs={6} marginTop='25px' marginLeft='1px'>
                            <InputField
                                id="password"
                                name="password"
                                type={isVisible ? "text" : "password"}
                                placeholder="Enter your password"

                            >
                                <VpnKeyRoundedIcon />
                                {isVisible ?
                                    <VisibilityRoundedIcon onClick={handlePass} cursor={'pointer'} /> :
                                    <VisibilityOffRoundedIcon onClick={handlePass} cursor={'pointer'} />}
                            </InputField>
                        </Grid>
                        <Grid container item xs={6} justifyContent={'space-between'} marginTop='25px'>
                            <FormGroup>
                                <CustomCheckbox label="Remember me" name='rememberMe' />
                            </FormGroup>
                            <Link href="#" style={{ ...Theme.typography.body2, alignSelf: 'center', color: Theme.palette.highlight.main }}>
                                Forgot password?
                                </Link>
                        </Grid>
                        <Grid container marginTop='50px' marginLeft='1px' justifyContent={'center'}>
                            <Grid item xs={4} marginBottom='50px'>
                                <CustomFormButton variant='contained' type={'submit'} fullWidth>Log in</CustomFormButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>

        </Grid>
    )
}
export default UserSignInForm;
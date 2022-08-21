import React, { useState } from 'react'
import { CircularProgress, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import ContactPic from '../../Assets/Images/ContactUs.svg'
import { Form, Formik } from 'formik'
import InputField from '../../Components/InputField/InputField'
import SendIcon from '@mui/icons-material/Send';
import * as Yup from 'yup'
import CustomFormButton from '../../Components/CustomFormButton/CustomFormButton'
import contactUs from '../../Network/Base/contact'
import CustomAlert from '../../Components/CustomAlert/CustomAlert';

const initialValues = {
    username: "",
    email: "",
    subject: "",
    emailText: ""
}

const validationSchema = Yup.object({
    username: Yup.string().required("Please enter your name"),
    email: Yup.string().required("Please enter your email"),
    subject: Yup.string().required("Please enter your subject"),
    emailText: Yup.mixed().required("Please enter your inquiry")
})

function ContactUs() {
    const theme = useTheme()
    const isTablet = useMediaQuery(theme.breakpoints.down('md'))
    const [serverResponse, setServerResponse] = useState({ success: false, msg: '' });
    const [formSubmitted, setFormSubmitted] = useState(false);

    const onSubmit = (values) => {
        setFormSubmitted(true);
        contactUs(values)
            .then(res => {
                setFormSubmitted(false);
                setServerResponse({ success: true, msg: `Your email has been recieved and our team will contact you as soon as possible on the same email.` });
            })
            .catch(err => {
                setFormSubmitted(false);
                setServerResponse({ success: false, msg: 'Something went wrong! Please, try again. Contact us if you need any help with the process.' });
            })
    }
    return (
        <>
            <Grid container justifyContent={'center'}>
                <Grid container justifyContent={'center'} alignItems={'center'} sx={{ flexDirection: isTablet ? "column" : "row" }} >
                    <Grid container item columns={12} md={6} sx={{ order: isTablet ? "2" : null }} justifyContent={isTablet ? 'center' : 'flex-start'}>
                        <img src={ContactPic} alt='Contact us svg' width="100%" height="500px" />
                    </Grid>
                    <Grid container item columns={12} md={6}
                        sx={{ order: isTablet ? "1" : null, flexDirection: isTablet ? "column" : "row", textAlign: isTablet ? "center" : null }} >
                        <Typography sx={{ ...theme.typography.h1, color: theme.palette.text.primary }}>
                            Contact us
                        </Typography>
                        <Typography sx={{ ...theme.typography.h2, color: theme.palette.text.primary }}>
                            Please fill the form below in order to reach us
                        </Typography>
                    </Grid>
                </Grid>
                {
                    <Grid item xs={8} md={7} justifyContent='center' textAlign='center' marginTop='25px'>
                        {serverResponse.msg && !formSubmitted ?
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
                <Grid container justifyContent={'center'} sx={{
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                    borderRadius: 5,
                    background: theme.palette.linearFormBg.main,

                }}
                    width={isTablet ? "75%" : "50%"}
                    marginY="25px"
                    paddingY={'25px'}>
                    <Grid item xs={12} textAlign="center">
                        <Typography sx={{ ...theme.typography.h2 }}>
                            Contact us form
                        </Typography>
                    </Grid>
                    <Grid item xs={12} textAlign="center">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}>

                            {formik =>
                                <Form>
                                    <Grid container justifyContent={'center'} marginTop="15px">
                                        <Grid container item justifyContent={'center'} marginTop="20px">
                                            <Grid item xs={6}>
                                                <InputField name="username" type="text" placeholder="user name">
                                                </InputField>
                                            </Grid>
                                        </Grid>
                                        <Grid container item justifyContent={'center'} marginTop="20px">
                                            <Grid item xs={6}>
                                                <InputField name="email" type="email" placeholder="user email">
                                                </InputField>
                                            </Grid>
                                        </Grid>
                                        <Grid container item justifyContent={'center'} marginTop="20px">
                                            <Grid item xs={6}>
                                                <InputField
                                                    placeholder="Subject"
                                                    name="subject"  >
                                                </InputField>
                                            </Grid>
                                        </Grid>
                                        <Grid container item justifyContent={'center'} marginTop="20px">
                                            <Grid item xs={6}>
                                                <InputField
                                                    multiline
                                                    rows={4}
                                                    type="text" name="emailText"
                                                    placeholder="Type in your maessage" >
                                                </InputField>
                                            </Grid>
                                        </Grid>
                                        <Grid container item justifyContent={'center'} marginY="30px">
                                            <Grid item xs={4}>
                                                <CustomFormButton
                                                    variant='contained' type={'submit'} fullWidth
                                                    disabled={!formik.isValid}
                                                >
                                                    <Typography sx={{ ...theme.typography.largerButtonText }}>
                                                        Send
                                                    </Typography>
                                                    <SendIcon />
                                                </CustomFormButton>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Form>
                            }

                        </Formik>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default ContactUs
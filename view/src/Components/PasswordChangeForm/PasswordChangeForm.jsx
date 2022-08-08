import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { CircularProgress, Grid, Typography, useTheme } from '@mui/material';
import { VisibilityRounded, VisibilityOffRounded, VpnKeyRounded } from '@mui/icons-material';
import InputField from '../InputField/InputField';
import CustomFormButton from '../CustomFormButton/CustomFormButton';
import changePassword from '../../Network/Base/changePass';
import CustomAlert from '../CustomAlert/CustomAlert';

const PasswordChangeForm = () => {
  const theme = useTheme();
  const { token } = useParams();
  const [serverResponse, setServerResponse] = useState({ success: false, msg: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    passwordConfirmation: ''
  };

  const [showOldPass, setShowOldPass] = useState('password');
  const [showNewPass, setShowNewPass] = useState('password');
  const [showConfirmPass, setShowConfirmPass] = useState('password');

  const passwordValidationSchema = Yup.object({
    oldPassword: Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g, { message: 'Your password should be at least 8 characters long and it should consist of at least one uppercase letter, one lowercase letter, one number, and one symbol' }).required('This field is required'),
    newPassword: Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g, { message: 'Your password should be at least 8 characters long and it should consist of at least one uppercase letter, one lowercase letter, one number, and one symbol' }).required('This field is required'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Your passwords must match').required('This field is required')
  });

  const handleSubmit = (values) => {
    setFormSubmitted(true);
    const reqBody = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      token
    };
    changePassword(reqBody)
      .then(res => {
        if (res.status === 200)
          setServerResponse({ success: true, msg: 'Your password has been updated successfully! Head to the login form to sign into your account with the new password.' })
      })
      .catch(err => {
        const msg = err.response.status === 404 ? "The token you have has either expired or is invalid. Go to the forget password form and try again to recieve a new token."
          : err.response.status === 403 ? "The old password you entered is wrong. Please, try again by making sure this is the latest password for your account."
            : "Something went wrong! Please, try again, or contact us if you can't solve the problem"
        setServerResponse({ success: false, msg });
      });
  };


  return (
    <Grid container style={{ background: theme.palette.linearFormBg.main, minHeight: '700px', paddingTop: '100px' }} flexDirection='column' justifyContent='center' alignItems='center'>
      <Typography variant='h2' style={{ textAlign: 'center', color: theme.palette.text.primary }}>
        Update Password
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={passwordValidationSchema}
        onSubmit={handleSubmit}
      >
        {
          (formik) => (
            <Form style={{ width: '100%' }}>
              <Grid container item xs={12} justifyContent='center' marginTop='50px'>
                <Grid container item xs={12} justifyContent='center'>
                  <Grid item xs={6} md={4} justifyContent='center' textAlign='center' marginTop='25px'>
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
                </Grid>
                <Grid container item xs={12} marginTop='25px' justifyContent='center'>
                  <Grid item xs={10} sm={6} md={5} lg={4}>
                    <InputField placeholder="Enter your old password" name="oldPassword" label="Old Password" type={showOldPass}>
                      <VpnKeyRounded />
                      {showOldPass === 'password' ?
                        <VisibilityRounded cursor="pointer" onClick={() => { setShowOldPass('text') }} />
                        : <VisibilityOffRounded cursor="pointer" onClick={() => { setShowOldPass('password') }} />
                      }
                    </InputField>
                  </Grid>
                </Grid>
                <Grid container item xs={12} marginTop='25px' justifyContent='center'>
                  <Grid item xs={10} sm={6} md={5} lg={4}>
                    <InputField placeholder="Enter your new password" name="newPassword" label="New Password" type={showNewPass}>
                      <VpnKeyRounded />
                      {showNewPass === 'password' ?
                        <VisibilityRounded cursor="pointer" onClick={() => { setShowNewPass('text') }} />
                        : <VisibilityOffRounded cursor="pointer" onClick={() => { setShowNewPass('password') }} />
                      }
                    </InputField>
                  </Grid>
                </Grid>
                <Grid container item xs={12} marginTop='25px' justifyContent='center'>
                  <Grid item xs={10} sm={6} md={5} lg={4}>
                    <InputField placeholder="Enter your new password again" name="passwordConfirmation" label="Confirm Password" type={showConfirmPass}>
                      <VpnKeyRounded />
                      {showConfirmPass === 'password' ?
                        <VisibilityRounded cursor="pointer" onClick={() => { setShowConfirmPass('text') }} />
                        : <VisibilityOffRounded cursor="pointer" onClick={() => { setShowConfirmPass('password') }} />
                      }
                    </InputField>
                  </Grid>
                  <Grid container item xs={12} marginTop='25px' justifyContent='center'>
                    <Grid item xs={4} md={2} lg={1}>
                      <CustomFormButton type="submit" variant="contained" disabled={!formik.isValid} fullWidth>Submit</CustomFormButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )
        }
      </Formik>
    </Grid>
  );
}

export default PasswordChangeForm;
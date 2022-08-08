import { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { CircularProgress, Grid, Typography, useTheme } from '@mui/material';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import InputField from '../InputField/InputField';
import CustomFormButton from '../CustomFormButton/CustomFormButton';
import RoleToggler from '../RoleToggler/RoleToggler';
import verifyEmail from '../../Network/Base/verify';
import CustomAlert from '../CustomAlert/CustomAlert';

const VerificationForm = () => {
  const [role, setRole] = useState('User');
  const [serverResponse, setServerResponse] = useState({ success: false, msg: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const theme = useTheme();
  const initialValues = {
    role: 'User',
    email: ''
  };

  const emailValidationSchema = Yup.object({
    email: Yup.string().required('This field is required').email('You must enter a valid email format')
  });

  const handleSubmit = (values) => {
    setFormSubmitted(true);
    verifyEmail(values)
      .then(res => {
        if (res.status >= 200 && res.status < 300)
          setServerResponse({ success: true, msg: 'An email has been sent to the email you typed! Go to the link we sent you to update your password.' });
      })
      .catch(err => {
        let msg = err.response.status === 404 ? "We couldn't find an account associated with this email. Please, check your email."
          : "Something went wrong. Please, try again, or contact us if you can't solve the problem";
        setServerResponse({ success: false, msg });
      });
  }

  const handleRoleChange = (newRole, setRoleValue) => {
    setRole(newRole);
    setRoleValue('role', newRole);
  }

  return (
    <Grid container style={{ background: theme.palette.linearFormBg.main, borderRadius: 20, boxShadow: theme.shadows[5], minHeight: '400px' }} justifyContent='center'>
      <Grid item xs={12} marginTop='25px'>
        <Typography variant='h2' style={{ textAlign: 'center', color: theme.palette.text.primary }}>
          Email Verification
        </Typography>
      </Grid>
      <Formik
        initialValues={initialValues}
        validationSchema={emailValidationSchema}
        onSubmit={handleSubmit}
      >
        {
          (formik) => (
            <>
              <Form style={{ width: '100%' }}>
                <Grid container item xs={12} justifyContent='center' marginY='25px'>
                  <Grid container item xs={12} justifyContent='center'>
                    <Grid container item xs={8} md={6} justifyContent='space-around'>
                      <RoleToggler role={role} setRole={(newRole) => handleRoleChange(newRole, formik.setFieldValue)} />
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} justifyContent='center'>
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
                  </Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={8} md={6} justifyContent='center' marginY='25px'>
                    <InputField placeholder="example@organization.domain" label="Email Address" name="email" type="text"><EmailRoundedIcon /></InputField>
                  </Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={4} marginY='25px' paddingY='25px'>
                    <CustomFormButton type="submit" variant='contained' fullWidth>
                      Submit
                    </CustomFormButton>
                  </Grid>
                </Grid>
              </Form>
            </>
          )
        }
      </Formik >
    </Grid >
  );
}


export default VerificationForm;
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Typography, useTheme } from '@mui/material';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import InputField from '../InputField/InputField';
import CustomFormButton from '../CustomFormButton/CustomFormButton';

const VerificationForm = () => {
  const theme = useTheme();
  const initialValues = {
    email: ''
  };
  const emailValidationSchema = Yup.object({
    email: Yup.string().required('This field is required').email('You must enter a valid email format')
  });
  const handleSubmit = (values) => {
    console.log(values);
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
              <Grid container item xs={12} justifyContent='center'>
                <Grid item xs={2}></Grid>
                <Grid item xs={8} md={6} justifyContent='center'>
                  <InputField placeholder="example@organization.domain" label="Email Address" name="email" type="text"><EmailRoundedIcon /></InputField>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={4}>
                  <CustomFormButton type="submit" variant='contained' disabled={!formik.isValid} fullWidth>
                    {'Submit'}
                  </CustomFormButton>
                </Grid>
              </Grid>
            </>
          )
        }
      </Formik >
    </Grid >
  );
}


export default VerificationForm;
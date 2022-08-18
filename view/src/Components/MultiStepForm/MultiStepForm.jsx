import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import FormNavigator from '../FormNavigator/FormNavigator';
import { useTheme, Grid, Step, StepLabel, CircularProgress, Typography } from '@mui/material';
import CustomFormStepper from '../CustomFormStepper/CustomFormStepper';
import CustomAlert from '../CustomAlert/CustomAlert';
import { isEmailDuplicated, isPhoneDuplicated } from '../../Network/Doctors/validate';

const MultiStepForm = ({ children, initialValues, onSubmit, serverResponse, setServerResponse }) => {
  const theme = useTheme();
  const [stepNumber, setStepNumber] = useState(0);
  const [valuesSnapshot, setValuesSnapshot] = useState(initialValues);
  const [isFormSubmitted, setFormSubmitted] = useState(false);

  const formSteps = React.Children.toArray(children);
  const currentStep = formSteps[stepNumber];
  const numberOfSteps = formSteps.length;
  const isLastStep = stepNumber === numberOfSteps - 1;

  const submitStepHandler = (values, actions) => {
    if (isLastStep) setFormSubmitted(true);
    if (currentStep.props.onSubmit) {
      currentStep.props.onSubmit(values, actions);
    }
    if (isLastStep) {
      return onSubmit(values, actions);
    } else {
      actions.setTouched({});
      nextStep(values);
    }
  }

  const handleSubmit = (values, actions) => {
    if (stepNumber == 0) {
      let emailDuplicated = false;
      isEmailDuplicated(values['email'])
        .then(response => {
          if (response.data.itExists) {
            actions.setFieldError('email', 'The email you entered is already taken!');
            emailDuplicated = true;
          }
        })
        .then(() => {
          return isPhoneDuplicated(values['phoneNumber'])
        })
        .then(response => {
          if (response.data.itExists) {
            actions.setFieldError('phoneNumber', 'The phone number you entered is already taken!');
            throw new Error('Invalid value');
          } else if (emailDuplicated) {
            throw new Error('Invalid value');
          }
        })
        .then(() => submitStepHandler(values, actions))
        .catch(err => console.error(err));
    } else
      submitStepHandler(values, actions);
  }

  const nextStep = (currentFormValues) => {
    setValuesSnapshot(currentFormValues);
    setStepNumber(stepNumber + 1);
  }
  const prevStep = (currentFormValues) => {
    setServerResponse({ success: false, msg: '' });
    setFormSubmitted(false);
    setValuesSnapshot(currentFormValues);
    setStepNumber(stepNumber - 1);
  }

  let currentStepKeys = [];

  const getCurrentStepKeys = (stepKeys) => { currentStepKeys = stepKeys };

  const isCurrentFormStepValid = (formErrors) => {
    let isStepValid = true;
    Object.keys(formErrors).forEach(errKey => {
      if (currentStepKeys.includes(errKey)) {
        isStepValid = false;
      }
    })
    return isStepValid;
  }



  return (
    <Grid container sx={{ background: theme.palette.linearFormBg.main, borderRadius: '20px', boxShadow: theme.shadows[5], padding:'30px 0' }} justifyContent='center'>
      <Grid item xs={12} justifyContent='center'>
        <Typography variant='h2' style={{ color: theme.palette.text.primary, textAlign: 'center' }}>Join Us</Typography>
      </Grid>
      <Grid item xs={12} marginTop='25px' marginBottom='50px'>
        <CustomFormStepper activeStep={stepNumber > 4 ? 4 : stepNumber} alternativeLabel>
          {formSteps.slice(0, 5).map((step, index) => (
            <Step key={step.props.stepName}>
              <StepLabel
                sx={stepNumber !== index ? { '& .MuiStepLabel-labelContainer': { display: { xs: 'none', xl: 'flex' }, justifyContent: 'center' }, '&.Mui-active': { display: 'flex' } } : {}}
              >{step.props.stepName}</StepLabel>
            </Step>
          ))}
        </CustomFormStepper>
      </Grid>
      <Grid item xs={10} justifyContent='center' textAlign='center'>
        {
          serverResponse.msg && isFormSubmitted ? <CustomAlert
            severity={serverResponse.success ? 'success' : 'error'}
            sx={{ boxShadow: theme.shadows[1] }}
            onClose={() => {
              setServerResponse({ success: false, msg: '' });
              setFormSubmitted(false);
            }}>
            {serverResponse.msg}
          </CustomAlert>
            : isFormSubmitted && <CircularProgress color='highlight' sx={{ marginY: '10px' }} />
        }
      </Grid>
      <Grid item xs={12}>
        <Formik initialValues={valuesSnapshot} validationSchema={currentStep.props.validationSchema}
          validate={currentStep.props.validate ? currentStep.props.validate : null}
          onSubmit={handleSubmit}>
          {
            (formik) => (
              <Form>
                {
                  React.cloneElement(currentStep, {
                    changeSnapshot: (newValues) => setValuesSnapshot(newValues),
                    valuesSnapshot: formik.values,
                    getStepKeys: (stepKeys) => getCurrentStepKeys(stepKeys),
                    setFormikFieldValue: formik.setFieldValue,
                    errors: formik.errors
                  })
                }
                <FormNavigator
                  goBack={() => prevStep(formik.values)}
                  hasPreviousStep={stepNumber > 0}
                  isLastStep={isLastStep}
                  isFormValid={() => isCurrentFormStepValid(formik.errors)}
                />
              </Form>
            )
          }
        </Formik>
      </Grid>
    </Grid>
  );
}

export default MultiStepForm;
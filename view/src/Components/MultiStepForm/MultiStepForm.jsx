import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import FormNavigator from '../FormNavigator/FormNavigator';
import { useTheme, Grid, Step, StepLabel } from '@mui/material';
import CustomFormStepper from '../CustomFormStepper/CustomFormStepper';



const MultiStepForm = ({ children, initialValues, onSubmit }) => {
  const theme = useTheme();
  const [stepNumber, setStepNumber] = useState(0);
  const [valuesSnapshot, setValuesSnapshot] = useState(initialValues);

  const formSteps = React.Children.toArray(children);
  const currentStep = formSteps[stepNumber];
  const numberOfSteps = formSteps.length;
  const isLastStep = stepNumber === numberOfSteps - 1;


  const handleSubmit = async (values, actions) => {
    if (currentStep.props.onSubmit) {
      await currentStep.props.onSubmit(values, actions);
    }
    if (isLastStep) {
      return onSubmit(values, actions);
    } else {
      actions.setTouched({});
      nextStep(values);
    }
  }

  const nextStep = (currentFormValues) => {
    setValuesSnapshot(currentFormValues);
    setStepNumber(stepNumber + 1);
  }
  const prevStep = (currentFormValues) => {
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
    <Grid container sx={{ background: theme.palette.linearFormBg.main, borderRadius: '20px', boxShadow: theme.shadows[5] }} justifyContent='center'>
      <Grid item xs={12} justifyContent='center'>
        <h2 style={{ ...theme.typography.h2, color: theme.palette.text.primary, textAlign: 'center' }}>Join Us</h2>
      </Grid>
      <Grid item xs={12} marginBottom='25px'>
        <CustomFormStepper activeStep={stepNumber > 4 ? 4 : stepNumber} alternativeLabel>
          {formSteps.slice(0, 5).map((step, index) => (
            <Step key={step.props.stepName}>
              <StepLabel
                sx={stepNumber !== index ? { '& .MuiStepLabel-labelContainer': { display: { xs: 'none', lg: 'flex' }, justifyContent: 'center' }, '&.Mui-active': { display: 'flex' } } : {}}
              >{step.props.stepName}</StepLabel>
            </Step>
          ))}
        </CustomFormStepper>
      </Grid>
      <Grid item xs={12}>
        <Formik initialValues={valuesSnapshot} validationSchema={currentStep.props.validationSchema} onSubmit={handleSubmit}>
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
                  isLastStep={isLastStep} isFormValid={() => isCurrentFormStepValid(formik.errors)} />
              </Form>
            )
          }
        </Formik>
      </Grid>
    </Grid>
  );
}

export default MultiStepForm;
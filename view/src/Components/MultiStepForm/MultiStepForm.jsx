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


  return (
    <Grid container sx={{ background: theme.palette.linearFormBg.main, borderRadius: '20px', boxShadow: theme.shadows[5] }} justifyContent='center'>
      <Grid item xs={12} justifyContent='center'>
        <h2 style={{ ...theme.typography.h2, color: theme.palette.text.primary, textAlign: 'center' }}>Join Us</h2>
      </Grid>
      <Grid item xs={12} marginBottom='25px'>
        <CustomFormStepper activeStep={stepNumber} alternativeLabel>
          {formSteps.map(step => (
            <Step key={step.props.stepName}>
              <StepLabel>{step.props.stepName}</StepLabel>
            </Step>
          ))}
        </CustomFormStepper>
      </Grid>
      <Formik initialValues={valuesSnapshot} validationSchema={currentStep.props.validationSchema} onSubmit={handleSubmit} enableReinitialize={true}>
        {
          (formik) => (
            <Form>
              {React.cloneElement(currentStep, { changeSnapshot: (newValues) => setValuesSnapshot(newValues), valuesSnapshot: formik.values })}
              <FormNavigator goBack={() => prevStep(formik.values)} hasPreviousStep={stepNumber > 0} isLastStep={isLastStep} isFormValid={formik.isValid} />
            </Form>
          )
        }
      </Formik>
    </Grid>
  );
}

export default MultiStepForm;
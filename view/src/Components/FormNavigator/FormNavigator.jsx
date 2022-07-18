import { Grid } from '@mui/material';
import CustomFormButton from '../CustomFormButton/CustomFormButton';



const FormNavigator = ({ hasPreviousStep, goBack, isLastStep, isFormValid }) => {
  return (
    <Grid container item xs={12} justifyContent='space-around' marginY='50px'>
      {
        hasPreviousStep && (
          <Grid item xs={4}>
            <CustomFormButton type='button' onClick={goBack} variant='outlined' fullWidth>
              Back
            </CustomFormButton>
          </Grid>
        )
      }
      <Grid item xs={hasPreviousStep ? 4 : 6}>
        <CustomFormButton type="submit" variant='contained' disabled={!isFormValid} fullWidth>
          {isLastStep ? 'Submit' : 'Next'}
        </CustomFormButton>
      </Grid>
    </Grid >
  );
}

export default FormNavigator;
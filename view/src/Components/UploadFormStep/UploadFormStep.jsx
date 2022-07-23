import { Input, Grid, useTheme, InputLabel, FormHelperText } from '@mui/material';

const UploadFormStep = ({ setFormikFieldValue, errors }) => {
  const theme = useTheme();
  return (
    <Grid container item xs={12} justifyContent='center'>
      <Grid item xs={10} justifyContent='center'>
        <h2 style={{ ...theme.typography.body1 }}>Your data is set now! There is only one last step left...</h2>
      </Grid>
      <Grid item xs={10} marginTop='25px' justifyContent='center'>
        <InputLabel htmlFor='personalImg' error={Boolean(errors.profilePicture)}>Personal Picture</InputLabel>
        <Input type='file' id='personalImg' error={Boolean(errors.profilePicture)} onChange={(event) => {
          setFormikFieldValue('profilePicture', event.target.value)
        }} fullWidth />
        <FormHelperText error={true}>{errors.profilePicture}</FormHelperText>
      </Grid>
      <Grid item xs={10} marginTop='25px' justifyContent='center'>
        <InputLabel htmlFor='licenseImg' error={Boolean(errors.professionalLicense)}>Professional Practitioner's License</InputLabel>
        <Input type='file' id='licenseImg' error={Boolean(errors.professionalLicense)} onChange={(event) => {
          setFormikFieldValue('professionalLicense', event.target.value)
        }} fullWidth />
        <FormHelperText error={true}>{errors.professionalLicense}</FormHelperText>
      </Grid>
    </Grid>
  );
}


export default UploadFormStep;
import { useState } from 'react';
import { Input, Grid, useTheme, InputLabel, FormHelperText, IconButton } from '@mui/material';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const UploadFormStep = ({ setFormikFieldValue, errors, valuesSnapshot }) => {
  const theme = useTheme();
  const [isPersonalImgUploaded, setPersonalIsImgUploaded] = useState(false);
  const [isLicenseImgUploaded, setLicenseIsImgUploaded] = useState(false);
  return (
    <Grid container item xs={12} justifyContent='center'>
      <Grid item xs={4} marginTop='25px' justifyContent='center' alignSelf='flex-end'>
        <InputLabel
          htmlFor='personalImg'
          error={Boolean(errors.profilePicture)}
          sx={{ whiteSpace: 'break-spaces', verticalAlign: 'top', textAlign: 'center', fontSize: '16px', marginY: '10px' }}
        ><p style={{ margin: 0 }}>Upload</p> Personal Picture</InputLabel>
        <IconButton color="highlight" component='label' sx={{ background: '#fff', padding: '20px', borderRadius: 50, width: '100%' }}>
          <Input
            type='file'
            accept='image/*'
            id='personalImg'
            name='images'
            sx={{ display: 'none' }}
            error={Boolean(errors.profilePicture)}
            onChange={(event) => {
              if (event.target.files[0] || valuesSnapshot['profilePicture']) setPersonalIsImgUploaded(true);
              setFormikFieldValue('profilePicture', event.target.files[0])
            }} fullWidth />
          {isPersonalImgUploaded || valuesSnapshot['profilePicture'] ? <CheckCircleIcon sx={{ fontSize: 150 }} />
            : <AddAPhotoOutlinedIcon sx={{ fontSize: 120 }} />}
        </IconButton>
        <FormHelperText error={true} sx={{ textAlign: 'center' }}>{errors.profilePicture}</FormHelperText>
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={4} marginTop='25px' justifyContent='center'>
        <InputLabel
          htmlFor='licenseImg'
          error={Boolean(errors.professionalLicense)}
          sx={{ whiteSpace: 'break-spaces', textAlign: 'center', fontSize: '16px', marginY: '10px' }}
        ><p style={{ margin: 0 }}>Upload</p> Practitioner's License</InputLabel>
        <IconButton color="highlight" component='label' sx={{background: '#fff', padding: '20px', borderRadius: 50, width: '100%' }}>
          <Input type='file'
            accept='images/*'
            id='licenseImg'
            name='images'
            sx={{ display: 'none' }}
            error={Boolean(errors.professionalLicense)}
            onChange={(event) => {
              if (event.target.files[0]) setLicenseIsImgUploaded(true);
              setFormikFieldValue('professionalLicense', event.target.files[0]);
            }} fullWidth />
          {isLicenseImgUploaded || valuesSnapshot['professionalLicense'] ? <CheckCircleIcon sx={{ fontSize: 150 }} />
            : <AddAPhotoOutlinedIcon sx={{ fontSize: 120 }} />}
        </IconButton>

        <FormHelperText error={true} sx={{ textAlign: 'center' }}>{errors.professionalLicense}</FormHelperText>
      </Grid>
    </Grid>
  );
}


export default UploadFormStep;
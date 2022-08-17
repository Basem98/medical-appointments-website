import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import InputField from '../InputField/InputField';
import {
  ViewHeadlineRounded, PhoneRounded, TtyRounded, LocalConvenienceStoreRounded, FollowTheSignsRounded,
} from '@mui/icons-material';

const ClinicsFormStep = ({ valuesSnapshot, changeSnapshot, getStepKeys }) => {
  const [clinics, changeClinics] = useState([...valuesSnapshot.clinics]);


  useEffect(() => {
    getStepKeys(['clinics']);
  });

  return (
    <Grid container justifyContent='center'>
      {
        clinics.map((clinic, index) => (
          <Grid container item xs={12} justifyContent='center' key={index}>
            <Grid container item xs={12} justifyContent='center'>
              <Grid item xs={10} marginTop='25px'>
                <InputField label="Clinic Name" name={`clinics[${index}].name`} placeholder='Clinic Name'>
                  <ViewHeadlineRounded />
                </InputField>
              </Grid>
              <Grid item xs={10} marginTop='25px'>
                <InputField label='Clinic Fees (In EGP)' name={`clinics[${index}].fees`} placeholder='Clinic Fees'>
                  <PhoneRounded />
                </InputField>
              </Grid>
              <Grid item xs={10} marginTop='25px'>
                <InputField label='Mobile Number' name={`clinics[${index}].phone.mobile`} placeholder='Mobile Number'>
                  <PhoneRounded />
                </InputField>
              </Grid>
              <Grid item xs={10} marginTop='25px'>
                <InputField label='Landline Number' name={`clinics[${index}].phone.landline`} placeholder='Landline Number (Optional)'>
                  <TtyRounded />
                </InputField>
              </Grid>
              <Grid item xs={4} md={3} marginTop='25px'>
                <InputField label='Building No.' name={`clinics[${index}].address.buildingNo`} placeholder='Building No.'>
                  <LocalConvenienceStoreRounded />
                </InputField>
              </Grid>
              <Grid item xs={6} md={7} marginTop='25px' sx={{ marginLeft: { xs: 'none', md: '1px' } }}>
                <InputField label='Street Name' name={`clinics[${index}].address.streetName`} placeholder='Street Name'>
                  <FollowTheSignsRounded />
                </InputField>
              </Grid>
              <Grid item xs={10} md={5} marginTop='25px'>
                <InputField label='Governorate' name={`clinics[${index}].address.governorate`} placeholder='Egyptian Governorate'>
                  <FollowTheSignsRounded />
                </InputField>
              </Grid>
              <Grid item xs={10} md={5} marginTop='25px' sx={{ marginLeft: { xs: 'none', md: '1px' } }}>
                <InputField label='Locality' name={`clinics[${index}].address.city`} placeholder='City/Town/Locality'>
                  <FollowTheSignsRounded />
                </InputField>
              </Grid>
            </Grid>
          </Grid >
        ))
      }
    </Grid >
  );
}


export default ClinicsFormStep;
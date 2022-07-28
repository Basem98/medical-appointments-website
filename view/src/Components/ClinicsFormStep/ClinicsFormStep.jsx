import { useState, useEffect } from 'react';
import { Grid, Collapse } from '@mui/material';
import InputField from '../InputField/InputField';
import {
  ViewHeadlineRounded, PhoneRounded, TtyRounded, LocalConvenienceStoreRounded, FollowTheSignsRounded,
  ArrowDropUp, ArrowDropDown, RemoveCircleOutlineRounded, AddCircleOutlineRounded
} from '@mui/icons-material';
import CustomCollapseListItem from '../CustomCollapseListItem/CustomCollapseListItem';
import { handleCollapse } from '../../Helper/CustomCollapseHandler';
import CustomFormButton from '../CustomFormButton/CustomFormButton';
import { AddAnotherEntry, RemoveLastEntry } from '../../Helper/FormFieldAdder';

const ClinicsFormStep = ({ valuesSnapshot, changeSnapshot, getStepKeys }) => {
  const [isExpanded, setIsExpanded] = useState([true]);
  const [clinics, changeClinics] = useState([...valuesSnapshot.clinics]);

  const fieldObjectToAdd = {
    name: '',
    address: {
      city: '',
      country: 'Egypt',
      governorate: '',
      buildingNo: '',
      streetName: '',
      postalCode: ''
    },
    geoLocation: {
      longitude: '',
      latitude: ''
    },
    phone: {
      mobile: '',
      landline: ''
    }
  };

  useEffect(() => {
    getStepKeys(['clinics']);
  });

  return (
    <Grid container justifyContent='center'>
      {
        clinics.map((clinic, index) => (
          <Grid container item xs={12} justifyContent='center' key={index}>
            <Grid item xs={10} marginTop='25px'>
              <CustomCollapseListItem onClick={() => handleCollapse(index, isExpanded, setIsExpanded)}>
                <span>
                  {index + 1}. Clinic Entry
                </span>
                {isExpanded[index] ? <ArrowDropUp /> : <ArrowDropDown />}
              </CustomCollapseListItem>
            </Grid>
            <Collapse in={isExpanded[index]} sx={{ width: '100%' }}>
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
            </Collapse>
          </Grid >
        ))
      }
      <Grid container item xs={6} marginY='25px' justifyContent='center'>
        {
          clinics.length > 1 &&
          <CustomFormButton
            variant='outlined'
            sx={{ marginTop: '5px', color: 'red !important', borderColor: 'red !important' }}
            startIcon={<RemoveCircleOutlineRounded sx={{ fill: 'red' }} />}
            onClick={() => RemoveLastEntry('clinics', valuesSnapshot, changeSnapshot, isExpanded, setIsExpanded, changeClinics)}>
            Remove Last Entry
          </CustomFormButton>
        }
        <CustomFormButton
          variant='outlined'
          sx={{ marginTop: '5px' }}
          startIcon={<AddCircleOutlineRounded />}
          onClick={() => AddAnotherEntry('clinics', valuesSnapshot, changeSnapshot, isExpanded, setIsExpanded, changeClinics, fieldObjectToAdd)}>
          Add Another Entry
        </CustomFormButton>
      </Grid>
    </Grid >
  );
}


export default ClinicsFormStep;
import { useState, useEffect } from 'react';
import { Grid, Divider, Collapse } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { RemoveCircleOutlineRounded, AddCircleOutlineRounded, ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import DropdownField from '../DropdownField/DropdownField';
import InputField from "../InputField/InputField";
import { months, getYearsUpTillNow } from '../../Helper/DateOptions';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import CustomFormButton from '../CustomFormButton/CustomFormButton';
import CustomCollapseListItem from '../CustomCollapseListItem/CustomCollapseListItem';
import { AddAnotherEntry, RemoveLastEntry } from '../../Helper/FormFieldAdder';
import { handleCollapse } from '../../Helper/CustomCollapseHandler';



const ExperienceFormStep = ({ valuesSnapshot, changeSnapshot, getStepKeys}) => {
  const [isExpanded, setIsExpanded] = useState([true]);
  const [experiences, changeExperiences] = useState([...valuesSnapshot.experiences]);
  const years = getYearsUpTillNow();

  const fieldObjectToAdd = {
    title: '',
    workplace: '',
    location: {
      city: '',
      country: ''
    },
    startDate: {
      month: '',
      year: ''
    },
    endDate: {
      month: '',
      year: ''
    },
    isCurrentlyWorking: false
  };

  useEffect(() => {
    getStepKeys(['experiences']);
  });

  return (
    <Grid container item xs={12} justifyContent='center'>

      {
        experiences.map((experience, index) => (
          <Grid container item xs={12} justifyContent='center' key={index} margin='5px'>
            <Grid item xs={10}>
              <CustomCollapseListItem onClick={() => handleCollapse(index, isExpanded, setIsExpanded)}>
                <span>
                  {index + 1}. Experience Entry
                </span>
                {isExpanded[index] ? <ArrowDropUp /> : <ArrowDropDown />}
              </CustomCollapseListItem>
            </Grid>
            <Collapse in={isExpanded[index]} sx={{ width: '100%' }}>
              <Grid container item xs={12} justifyContent='center'>
                <Grid item xs={10} marginTop='25px'>
                  <InputField label='Position Title' placeholder='Position Title' name={`experiences[${index}].title`} type='text'>
                    <WorkIcon />
                  </InputField>
                </Grid>
                <Grid item xs={10} marginTop='25px'>
                  <InputField label='ًWorkplace' placeholder='Workplace' name={`experiences[${index}].workplace`} type='text'>
                    <ApartmentIcon />
                  </InputField>
                </Grid>
                <Grid item md={5} xs={10} marginTop='25px'>
                  <InputField label='City' placeholder='City' name={`experiences[${index}].location.city`} type='text'>
                    <LocationOnIcon />
                  </InputField>
                </Grid>
                <Grid item md={5} xs={10} marginTop='25px' sx={{ marginLeft: { xs: 'none', md: '1px' } }}>
                  <InputField label='Country' placeholder='Country' name={`experiences[${index}].location.country`} type='text'>
                    <LocationOnIcon />
                  </InputField>
                </Grid>
                <Grid item xs={10} justifyContent='flex-start' marginTop='25px'>
                  <CustomCheckbox label='I am currently working there' name={`experiences[${index}].isCurrentlyWorking`} />
                </Grid>
                <Grid item xs={10} md={5} marginTop='25px'>
                  <DropdownField label='Start Month' name={`experiences[${index}].startDate.month`} options={months}>
                    <CalendarMonthIcon />
                  </DropdownField>
                </Grid>
                <Grid item xs={10} md={5} marginTop='25px' sx={{ marginLeft: { 'xs': 'none', 'md': '1px' } }}>
                  <DropdownField label='Start Year' name={`experiences[${index}].startDate.year`} options={years}>
                    <CalendarMonthIcon />
                  </DropdownField>
                </Grid>
                <Grid container item xs={12} justifyContent='center' display={valuesSnapshot.experiences[index]?.isCurrentlyWorking ? 'none' : 'flex'}>
                  <Grid item xs={10} md={5} marginTop='25px' sx={{ marginLeft: { 'xs': 'none', 'md': '1px' } }}>
                    <DropdownField label='End Month' name={`experiences[${index}].endDate.month`} options={months} >
                      <CalendarMonthIcon />
                    </DropdownField>
                  </Grid>
                  <Grid item xs={10} md={5} marginTop='25px' sx={{ marginLeft: { 'xs': 'none', 'md': '1px' } }}>
                    <DropdownField label='End Year' name={`experiences[${index}].endDate.year`} options={years}>
                      <CalendarMonthIcon />
                    </DropdownField>
                  </Grid>
                </Grid>
              </Grid >
              <Grid item xs={10} marginTop='10px' marginX='auto'>
                <Divider flexItem={true} sx={{ width: '100%' }}></Divider>
              </Grid>
            </Collapse>
          </Grid>
        ))
      }

      <Grid container item xs={6} marginY='25px' justifyContent='center'>
        {
          experiences.length > 1 &&
          <CustomFormButton
            variant='outlined'
            sx={{ marginTop: '5px', color: 'red !important', borderColor: 'red !important' }}
            startIcon={<RemoveCircleOutlineRounded sx={{ fill: 'red' }} />}
            onClick={() => RemoveLastEntry('experiences', valuesSnapshot, changeSnapshot, isExpanded, setIsExpanded, changeExperiences)}>
            Remove Last Entry
          </CustomFormButton>
        }
        <CustomFormButton
          variant='outlined'
          sx={{ marginTop: '5px' }}
          startIcon={<AddCircleOutlineRounded />}
          onClick={() => AddAnotherEntry('experiences', valuesSnapshot, changeSnapshot, isExpanded, setIsExpanded, changeExperiences, fieldObjectToAdd)}>
          Add Another Entry
        </CustomFormButton>
      </Grid>
    </Grid >
  );
}


export default ExperienceFormStep;
import { Grid, Divider, Pagination, Collapse } from '@mui/material';
import CustomFormButton from '../CustomFormButton/CustomFormButton';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import InputField from "../InputField/InputField";
import { useState } from 'react';
import DropdownField from '../DropdownField/DropdownField';
import CustomCollapseListItem from '../CustomCollapseListItem/CustomCollapseListItem';
import { AddAnotherEntry, RemoveLastEntry } from '../../Helper/FormFieldAdder';
import { handleCollapse } from '../../Helper/CustomCollapseHandler';



const EducationFormStep = ({ valuesSnapshot, changeSnapshot }) => {
  const [isExpanded, setIsExpanded] = useState([true]);
  const [education, changeEducation] = useState([...valuesSnapshot.education]);

  const fieldObjectToAdd = {
    degree: '',
    granter: '',
    issueDate: ''
  };
  const specialties = [
    'Dermatology',
    'Dentistry',
    'Psychiatry',
    'Pediatrics and New Born',
    'Neurology',
    'Orthopedics',
    'Gynaecology and Infertility',
    'Ear, Nose and Throat',
    'Cardiology and Vascular Disease',
    'Allergy and Immunology',
    'Andrology and Male Infertility',
    'Audiology',
    'Cardiology and Thoracic Surgery',
    'Chest and Respiratory',
    'Diabetes and Endocrinology',
    'Diagnostic Radiology',
    'Dietitian and Nutrition',
    'Family Medicine',
    'Gastroenterology and Endoscopy',
    'General Practice',
    'General Surgery',
    'Geriatrics',
    'Hematology',
    'Hepatology',
    'Internal Medicine',
    'IVF and Infertility',
    'Laboratories',
    'Nephrology',
    'Neurosurgery',
    'Obesity and Laparoscopic Surgery',
    'Oncology',
    'Oncology Surgery',
    'Ophthalmology',
    'Osteopathy',
    'Pain Management',
    'Pediatric Surgery',
    'Phoniatrics',
    'Physiotherapy and Sport Injuries',
    'Plastic Surgery',
    'Rheumatology',
    'Spinal Surgery',
    'Urology',
    'Vascular Surgery'
  ]

  return (
    <Grid container item justifyContent='center'>
      <Grid item xs={10} marginTop='25px'>
        <DropdownField
          label="Specialty"
          name='specialization'
          type="text"
          options={specialties}
        >
          <MedicalInformationIcon />
        </DropdownField>
      </Grid>
      <Grid item xs={10} marginY='10px'>
        <Divider flexItem={true} sx={{ width: '100%' }}></Divider>
      </Grid>
      {
        education.map((edu, index) => (
          <Grid container item xs={12} justifyContent='center' key={index} margin='5px'>
            <Grid item xs={10}>
              <CustomCollapseListItem onClick={() => handleCollapse(index, isExpanded, setIsExpanded)}>
                <span>
                  {index + 1}. Education Entry
                </span>
                {isExpanded[index] ? <ArrowDropUp /> : <ArrowDropDown />}
              </CustomCollapseListItem>
            </Grid>
            <Collapse in={isExpanded[index]} sx={{ width: '100%' }}>
              <Grid container item xs={12} justifyContent='center'>
                <Grid item xs={10} marginTop='25px'>
                  <DropdownField
                    label="Degree"
                    name={`education[${index}].degree`}
                    type="text"
                    options={["Bachelor's Degree (BSc)", "Master's Degree (MSc)", "Doctor of Medicine (MD)"]}
                  >
                    <SchoolIcon />
                  </DropdownField>
                </Grid>
                <Grid item xs={10} marginTop='25px'>
                  <InputField
                    label="Institute"
                    name={`education[${index}].granter`}
                    type="text"
                    placeholder="Cairo University"
                  >
                    <AccountBalanceIcon />
                  </InputField>
                </Grid>
                <Grid item xs={10} marginTop='25px'>
                  <InputField
                    label="Issue Date"
                    name={`education[${index}].issueDate`}
                    type="text"
                    placeholder="Month/Year (07/2005)">
                    <CalendarMonthIcon />
                  </InputField>
                </Grid>
                <Grid item xs={10} marginY='10px'>
                  <Divider flexItem={true} sx={{ width: '100%' }}></Divider>
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        )
        )
      }

      <Grid container item xs={6} marginY='25px' justifyContent='center'>
        {
          education.length > 1 &&
          <CustomFormButton
            variant='outlined'
            sx={{ marginTop: '5px', color: 'red !important', borderColor: 'red !important' }}
            startIcon={<RemoveCircleOutlineRoundedIcon sx={{ fill: 'red' }} />}
            onClick={() => RemoveLastEntry('education', valuesSnapshot, changeSnapshot, isExpanded, setIsExpanded, changeEducation)}>
            Remove Last Entry
          </CustomFormButton>
        }
        <CustomFormButton
          variant='outlined'
          sx={{ marginTop: '5px' }}
          startIcon={<AddCircleOutlineRoundedIcon />}
          onClick={() => AddAnotherEntry('education', valuesSnapshot, changeSnapshot, isExpanded, setIsExpanded, changeEducation, fieldObjectToAdd)}>
          Add Another Entry
        </CustomFormButton>
      </Grid>
    </Grid >
  );
}

export default EducationFormStep;
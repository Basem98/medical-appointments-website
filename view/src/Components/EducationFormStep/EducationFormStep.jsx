import { Grid, Divider, Pagination } from '@mui/material';
import CustomFormButton from '../CustomFormButton/CustomFormButton';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import InputField from "../InputField/InputField";
import { useState } from 'react';
import DropdownField from '../DropdownField/DropdownField';


const EducationFormStep = ({ valuesSnapshot, changeSnapshot }) => {
  const [numOfSections, incrementNumOfSections] = useState(valuesSnapshot.education.length);
  const [currentSection, setCurrentSection] = useState(0);
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

      <Grid container item xs={12} justifyContent='center'>
        <Grid item xs={10} marginTop='10px'>
          <Divider flexItem={true} sx={{ width: '100%' }}></Divider>
        </Grid>
        <Grid item xs={10} marginTop='25px'>
          <DropdownField
            label="Degree"
            name={`education[${currentSection}].degree`}
            type="text"
            options={["Bachelor's Degree (BSc)", "Master's Degree (MSc)", "Doctor of Medicine (MD)"]}
          >
            <SchoolIcon />
          </DropdownField>
        </Grid>
        <Grid item xs={10} marginTop='25px'>
          <InputField
            label="Institute"
            name={`education[${currentSection}].granter`}
            type="text"
            placeholder="Cairo University"
          >
            <AccountBalanceIcon />
          </InputField>
        </Grid>
        <Grid item xs={10} marginTop='25px'>
          <InputField
            label="Issue Date"
            name={`education[${currentSection}].issueDate`}
            type="text"
            placeholder="Month/Year (07/2005)">
            <CalendarMonthIcon />
          </InputField>
        </Grid>
      </Grid>

      <Grid container item xs={6} marginY='25px' justifyContent='center'>
        {
          numOfSections > 1 &&
          <CustomFormButton
            variant='outlined'
            sx={{ marginTop: '5px', color: 'red !important', borderColor: 'red !important' }}
            startIcon={<RemoveCircleOutlineRoundedIcon sx={{ fill: 'red' }} />}
            onClick={() => {
              if (numOfSections > 1) {
                incrementNumOfSections( numOfSections - 1);
                setCurrentSection(0);
                let newSnapshot = valuesSnapshot;
                newSnapshot.education.pop();
                changeSnapshot(newSnapshot);
              }
            }}>
            Remove Last Qualification
          </CustomFormButton>
        }
        <CustomFormButton
          variant='outlined'
          sx={{ marginTop: '5px' }}
          startIcon={<AddCircleOutlineRoundedIcon />}
          onClick={() => {
            incrementNumOfSections(numOfSections + 1);
            let newSnapshot = valuesSnapshot;
            newSnapshot.education.push(fieldObjectToAdd);
            changeSnapshot(newSnapshot);
          }}>
          Add Another Qualification
        </CustomFormButton>
      </Grid>
      <Grid container item xs={10} justifyContent='center'>
        <Pagination color='highlight' count={numOfSections} page={currentSection + 1} onChange={(e, p) => { setCurrentSection(p - 1) }} size="small" />
      </Grid>
    </Grid >
  );
}

export default EducationFormStep;
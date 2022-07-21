import { useState, useEffect } from 'react';
import { Grid, Divider, Collapse } from '@mui/material';
import CustomFormButton from '../CustomFormButton/CustomFormButton';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InputField from "../InputField/InputField";
import DropdownField from '../DropdownField/DropdownField';
import CustomCollapseListItem from '../CustomCollapseListItem/CustomCollapseListItem';
import { AddAnotherEntry, RemoveLastEntry } from '../../Helper/FormFieldAdder';
import { handleCollapse } from '../../Helper/CustomCollapseHandler';
import { months, getYearsUpTillNow } from '../../Helper/DateOptions';



const CertificationsFormStep = ({ valuesSnapshot, changeSnapshot, getStepKeys }) => {
  const [isExpanded, setIsExpanded] = useState([true]);
  const [certifications, changeCertifications] = useState([...valuesSnapshot.certifications]);

  const fieldObjectToAdd = {
    title: '',
    granter: '',
    issueDate: {
      month: '',
      year: ''
    }
  };
  
  const years = getYearsUpTillNow();

  useEffect(() => {
    getStepKeys(['certifications']);
  });

  return (
    <Grid container item justifyContent='center'>
      {
        certifications.map((edu, index) => (
          <Grid container item xs={12} justifyContent='center' key={index} margin='5px'>
            <Grid item xs={10}>
              <CustomCollapseListItem onClick={() => handleCollapse(index, isExpanded, setIsExpanded)}>
                <span>
                  {index + 1}. Certificate Entry
                </span>
                {isExpanded[index] ? <ArrowDropUp /> : <ArrowDropDown />}
              </CustomCollapseListItem>
            </Grid>
            <Collapse in={isExpanded[index]} sx={{ width: '100%' }}>
              <Grid container item xs={12} justifyContent='center'>
                <Grid item xs={10} marginTop='25px'>
                  <InputField
                    label="Certificate"
                    name={`certifications[${index}].title`}
                    type="text"
                    placeholder="Certificate/Training Title"
                  >
                    <SchoolIcon />
                  </InputField>
                </Grid>
                <Grid item xs={10} marginTop='25px'>
                  <InputField
                    label="Institute"
                    name={`certifications[${index}].granter`}
                    type="text"
                    placeholder="Certificate/Training Institute"
                  >
                    <AccountBalanceIcon />
                  </InputField>
                </Grid>
                <Grid item xs={10} md={5} marginTop='25px'>
                  <DropdownField label='Month' name={`certifications[${index}].issueDate.month`} options={months}>
                    <CalendarMonthIcon />
                  </DropdownField>
                </Grid>
                <Grid item xs={10} md={5} marginTop='25px'>
                  <DropdownField label='Year' name={`certifications[${index}].issueDate.year`} options={years}>
                    <CalendarMonthIcon />
                  </DropdownField>
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
          certifications.length > 1 &&
          <CustomFormButton
            variant='outlined'
            sx={{ marginTop: '5px', color: 'red !important', borderColor: 'red !important' }}
            startIcon={<RemoveCircleOutlineRoundedIcon sx={{ fill: 'red' }} />}
            onClick={() => RemoveLastEntry('certifications', valuesSnapshot, changeSnapshot, isExpanded, setIsExpanded, changeCertifications)}>
            Remove Last Entry
          </CustomFormButton>
        }
        <CustomFormButton
          variant='outlined'
          sx={{ marginTop: '5px' }}
          startIcon={<AddCircleOutlineRoundedIcon />}
          onClick={() => AddAnotherEntry('certifications', valuesSnapshot, changeSnapshot, isExpanded, setIsExpanded, changeCertifications, fieldObjectToAdd)}>
          Add Another Entry
        </CustomFormButton>
      </Grid>
    </Grid >
  );
}

export default CertificationsFormStep;
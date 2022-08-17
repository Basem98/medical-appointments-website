import { StaticDatePicker } from '@mui/x-date-pickers';
import { StyledEngineProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import './CustomCalendar.css'


/**
 * @param {*} setCalVal A callback that calls Formik's setFieldValue function with the calender's field name in it
 * @param {*} availableDates An array of objects that have a 'date' JS Date object property with the dates to show in the calender
 */
function CustomCalender({ setCalVal, availableDates }) {
  const [value, setValue] = useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StyledEngineProvider injectFirst>
        < StaticDatePicker
          component="div"
          variant="div"
          displayStaticWrapperAs="desktop"
          openTo="day"
          value={value}
          renderInput={(params) => <TextField {...params} />}
          onChange={(newValue) => {
            setValue(newValue);
            setCalVal(newValue)
          }}
          disableHighlightToday
          shouldDisableDate={(date) =>
            availableDates.every((dateel) => (dateel?.date.getDate() !== date.getDate()) || (dateel?.date.getMonth() !== date.getMonth()))}
        />
      </StyledEngineProvider>
    </LocalizationProvider>
  )
}

export default CustomCalender


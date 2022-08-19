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
function CustomCalender({ setCalVal, availableDates, isCreatingAppointment, initialDate }) {
  const [value, setValue] = useState(new Date(initialDate) ? new Date(initialDate) : new Date());

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
          shouldDisableDate={(date) => {
            if (!isCreatingAppointment && availableDates)
              return availableDates.every((dateel) => (new Date(dateel?.date).getDate() !== date.getDate()) || (new Date(dateel?.date).getMonth() !== date.getMonth()))
            else
              return (
                (date.getMonth() === new Date().getMonth() && date.getDate() < new Date().getDate())
                || (date.getMonth() < new Date().getMonth())
              );
          }
          }
        />
      </StyledEngineProvider>
    </LocalizationProvider>
  )
}

export default CustomCalender


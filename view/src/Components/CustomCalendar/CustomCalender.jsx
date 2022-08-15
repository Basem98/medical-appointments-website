import { StaticDatePicker } from '@mui/x-date-pickers';
import { StyledEngineProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import './CustomCalendar.css'


function CustomCalender({ setCalVal }) {
  const [value, setValue] = useState(new Date());
  const datesarray = [
    { date: new Date(2022, 7, 15) },
    { date: new Date(2022, 7, 17) },
    { date: new Date(2022, 7, 19) },
    { date: new Date(2022, 7, 21) },
    { date: new Date(2022, 7, 23) }]
    
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
            datesarray.every((dateel) => dateel.date.getDate() !== date.getDate())}
        />
      </StyledEngineProvider>
    </LocalizationProvider>
  )
}

export default CustomCalender


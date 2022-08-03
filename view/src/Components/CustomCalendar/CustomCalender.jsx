import { StaticDatePicker, DesktopDatePicker } from '@mui/x-date-pickers';
import { StyledEngineProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';

import { useState } from 'react';
import './CustomCalendar.css'

function CustomCalender() {
  const [value, setValue] = useState(new Date());
  return (
    // import moment.js to use it in the data adapter
    <LocalizationProvider dateAdapter={}>
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
          }}
          minDate={new Date('2022-08-02T13:34:50.445Z')}
          maxDate={new Date('2022-08-12')}
        />
      </StyledEngineProvider>
    </LocalizationProvider>
  )
}

export default CustomCalender


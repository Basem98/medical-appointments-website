import React from 'react';
import { InputAdornment, InputLabel, Select, MenuItem, FormHelperText, useTheme, Menu } from '@mui/material';
import { useField } from 'formik';
import CustomFormControl from '../CustomFormControl/CustomFormControl';



const DropdownField = ({ label, children, options, ...props }) => {
  const [field, meta] = useField(props);
  const passedIcons = React.Children.toArray(children);
  const theme = useTheme();
  return (
    <CustomFormControl fullWidth>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        labelId='select-label'
        label={label}
        placeholder={label}
        variant='outlined'
        fullWidth
        {...field}
        {...props}
        startAdornment={<InputAdornment position='start' sx={{ color: (theme) => theme.palette.highlight.main }}>{passedIcons[0]}</InputAdornment>}
        error={meta.touched && Boolean(meta.error)}
      >
        {
          options.map(option => (
            <MenuItem value={option} key={option} sx={{ fontSize: theme.typography.body2 }}>{option}</MenuItem>
          ))
        }
      </Select>
      {meta.touched && <FormHelperText sx={{color: 'red'}}>{meta.error}</FormHelperText>}
    </CustomFormControl>
  );
}

export default DropdownField;
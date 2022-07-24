import React from 'react';
import { InputAdornment, InputLabel, Select, MenuItem, FormHelperText, useTheme } from '@mui/material';
import { useField } from 'formik';
import CustomFormControl from '../CustomFormControl/CustomFormControl';


/**
 * @description A custom-styled dropdown form field that extends MUI's FormControl component
 * @param {*} label The label for your dropdown field 
 * @param {*} options The array of the values you want to show in your dropdown
 * (It can be an array of string or an array of objects {label: "", value: ""})
 * @param {*} children The component of the icon you want to use at the start of your field
 * (Pass it between the opening & enclosing tags of the DropdownField component)
 */
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
          options.map(option => {
            return (
              <MenuItem
                value={!isNaN(option.value) ? option.value : option}
                key={!isNaN(option.value) ? option.value : option}
                sx={{ fontSize: theme.typography.body2 }}>
                {option.label ? option.label : option}
              </MenuItem>
            )
          })
        }
      </Select>
      {meta.touched && <FormHelperText sx={{ color: 'red' }}>{meta.error}</FormHelperText>}
    </CustomFormControl>
  );
}

export default DropdownField;
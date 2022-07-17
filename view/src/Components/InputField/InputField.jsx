import React from 'react';
import { InputAdornment } from '@mui/material';
import { useField } from 'formik';
import CustomTextField from '../CustomTextField/CustomTextField';



const InputField = ({ label, children, ...props }) => {
  const [field, meta] = useField(props);
  const passedIcons = React.Children.toArray(children);

  return (
    <CustomTextField
      variant='outlined'
      fullWidth
      label={label}
      {...field}
      {...props}
      InputProps={passedIcons ? {
        startAdornment: (
          <InputAdornment position='start' sx={{ color: (theme) => theme.palette.highlight.main }}>{passedIcons[0]}</InputAdornment>
        ),
        endAdornment: passedIcons[1] ?
          <InputAdornment position='end' sx={{ color: (theme) => theme.palette.highlight.main }}>{passedIcons[1]}</InputAdornment>
          : null
      } : null}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
}

export default InputField;
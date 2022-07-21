import { Checkbox, FormControlLabel, useTheme } from '@mui/material';
import { useField } from 'formik';

/**
 * @description A custom checkbox component that extends MUI's FormControlLabel,
 * and integrates it with Formik to be used in any form built with it
 * @param {String} label the label to be used for the field in the form
 * @param {String} name the name of this field in your formik's initialValues object
 * @returns A <FormControlLabel> component that's used to create a customized Checkbox component with our wireframe's design
 */
const CustomCheckbox = ({ label, ...props }) => {
  const [field] = useField(props);
  const theme = useTheme();

  return (
    <FormControlLabel
      control={<Checkbox checked={field.value} size='small' sx={{
        color: theme.palette.highlight.main,
        '&.Mui-checked': {
          color: theme.palette.highlight.main,
        }
      }} />}
      label={label}
      {...field}
      {...props}
      sx={{
        '& .MuiFormControlLabel-label': {
          fontSize: 14,
          color: theme.palette.text.primary
        }
      }}
    />
  );
}


export default CustomCheckbox;
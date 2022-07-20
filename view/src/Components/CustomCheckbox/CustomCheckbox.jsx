import { Checkbox, FormControlLabel, useTheme } from '@mui/material';
import { useField } from 'formik';


const CustomCheckbox = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const theme = useTheme();

  return (
    <FormControlLabel
      control={<Checkbox size='small' sx={{
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
import { FormControl, styled } from "@mui/material";

const CustomFormControl = styled(FormControl)(({ theme }) => ({
  minHeight: 36,
  '& label': {
    fontSize: 16,
    top: -10,
    fontWeight: 'lighter'
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'lighter',
    '& .MuiSelect-select': {
      height: 26,
      padding: '5px 15px',
      display: 'flex',
      alignItems: 'flex-end'
    },
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.highlight.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.highlight.main,
    }
  },
  '& label.Mui-focused': {
    color: `${theme.palette.text.primary} !important`,
  }
}));

export default CustomFormControl;
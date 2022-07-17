import { TextField, styled } from "@mui/material";

const CustomTextField = styled(TextField)(({ theme }) => ({
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
    '& input': {
      height: 26,
      padding: '5px 15px'
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
  },
  '& .MuiFormHelperText-root.Mui-error': {
    color: 'red'
  }
}))

export default CustomTextField;
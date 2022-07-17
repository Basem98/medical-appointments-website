import { Button, styled } from "@mui/material";

const CustomFormButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  '&.MuiButton-contained': {
    backgroundColor: theme.palette.highlight.main,
    color: '#FFFFFF',
    ':hover': {
      backgroundColor: theme.palette.highlight.main,
      opacity: 0.8,
      transform: 'scale(1.05)'
    }
  },
  '&.MuiButton-outlined': {
    borderColor: theme.palette.highlight.main,
    color: theme.palette.highlight.main
  }
}));


export default CustomFormButton;
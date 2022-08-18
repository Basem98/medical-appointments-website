import { Button, styled } from "@mui/material";

const CustomFormButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  '&.MuiButton-contained': {
    backgroundColor: theme.palette.highlight.main,
    color: '#FFFFFF',
    ':hover': {
      backgroundColor: theme.palette.highlight.main,
      opacity: 0.8,
      boxShadow: theme.shadows[10]
    }
  },
  '&.MuiButton-outlined': {
    borderColor: theme.palette.highlight.main,
    color: theme.palette.highlight.main
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.grey.main,
    color: theme.palette.text.primary
  }
}));


export default CustomFormButton;
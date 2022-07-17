import { Stepper, styled } from "@mui/material";


const CustomFormStepper = styled(Stepper)(({ theme }) => ({
  '& .MuiSvgIcon-root': {
    color: theme.palette.grey.main,
    '& .MuiStepIcon-text': {
      fill: theme.palette.text.primary,
    },
    '&.Mui-active': {
      color: theme.palette.highlight.main,
      '& .MuiStepIcon-text': {
        fill: '#fff',
      }
    },
    '&.Mui-completed': {
      color: theme.palette.highlight.main
    }
  }
}));

export default CustomFormStepper;
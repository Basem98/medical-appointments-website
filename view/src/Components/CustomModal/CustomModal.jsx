import React from 'react'
import { Box, Checkbox, Grid, Typography, Button, IconButton } from '@mui/material';
import CustomFormButton from '../CustomFormButton/CustomFormButton';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material';
import UserSignInForm from '../UserLoginForm/UserLoginForm'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BookingForm from '../BookingForm/BookingForm';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';




function CustomModal() {

  const Theme = useTheme()
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const descriptionElementRef = React.useRef(null);
  // React.useEffect(() => {
  //   if (open) {
  //     const { current: descriptionElement } = descriptionElementRef;
  //     if (descriptionElement !== null) {
  //       descriptionElement.focus();
  //     }
  //   }
  // }, [open]);
  // const [open, setOpen] = React.useState(false);
  const [isBooking, setIsBooking] = React.useState(true)
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);


  return (
    <>
      <Button onClick={handleClickOpen('paper')}>Open me</Button>
      {/* <Button onClick={handleClickOpen('body')}>scroll=body</Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={isBooking?"md":"sm"}
        PaperProps={{ sx: isBooking ? null :   { borderRadius: '20px'} }}
        componentsProps={
          {
            backdrop: {
              sx: {
                backgroundColor: 'rgba(0,0,0, 0.1)',

              }
            }
          }
        }
      >

        <DialogContent style={isBooking ?  null:  {overflow:"hidden",padding:0}} >
          <  BookingForm />
        </DialogContent>
      </Dialog>
      
    </>
  )
}

export default CustomModal
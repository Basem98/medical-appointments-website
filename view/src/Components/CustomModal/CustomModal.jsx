import React from 'react'
import { Box, Checkbox, Grid, Typography, Button, IconButton } from '@mui/material';
import CustomFormButton from '../CustomFormButton/CustomFormButton';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material';
import UserSignInForm from '../UserLoginForm/UserLoginForm'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BookingForm from '../BookingForm/BookingForm';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



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
        // scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
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
      {/* <Grid container justifyContent={'center'} >
        <Grid container item maxWidth={'md'} justifyContent={'center'} alignItems={'center'}> */}

      {/* <Button onClick={handleOpen}>Open modal</Button>
          


          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{overflow: 'hidden',height:'100%',
            display:'block'}}
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
            

            <Grid container >
           
            <Grid item xs={12}  sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              borderRadius: 5,
              '@media (min-width: 320px) and (max-width: 780px)': {
                width: '100%',
                
              },
              '@media (min-width: 781px) and (max-width: 1400px)': {
                width: '80%',
                
              },
            }}
            >
               <Grid container justifyContent={'flex-end'}>
              <IconButton sx={{
                color:isBooking?Theme.palette.highlight.main:'white',
                '&:hover':{
                  color:'red'
                },
                paddingY:'5px'
              }}
              onClick={handleClose}
              size="large">
                <HighlightOffIcon
                sx={{fontSize:32}}/>
              </IconButton>
              </Grid>
              < BookingForm />
            </Grid>
            </Grid>
          </Modal> */}
    </>
  )
}

export default CustomModal
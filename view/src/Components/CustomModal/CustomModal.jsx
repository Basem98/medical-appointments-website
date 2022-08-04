import React from 'react'
import { Box, Checkbox, Grid,Typography,Button} from '@mui/material';
import CustomFormButton from '../CustomFormButton/CustomFormButton';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material';

import UserSignInForm from '../UserLoginForm/UserLoginForm'

function BookingDetailsModal() {

    const Theme = useTheme()
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
    <Grid container justifyContent={'center'} >
        <Grid container item maxWidth={'md'} justifyContent={'center'} alignItems={'center'}>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius:5
        }}>
          <UserSignInForm/>
        </Box>
      </Modal>
        </Grid>
    </Grid>
    </>
  )
}

export default BookingDetailsModal
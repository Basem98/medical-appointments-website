import { Dialog, DialogContent } from '@mui/material';


const FormModal = ({ children, openModal, setOpenModal }) => {
  return (
    <Dialog
      open={openModal}
      onClose={() => setOpenModal(!openModal)}
      PaperProps={{
        sx: {
          borderRadius: '20px'
        }
      }}
    >
      {children}
    </Dialog>
  )
}

export default FormModal;
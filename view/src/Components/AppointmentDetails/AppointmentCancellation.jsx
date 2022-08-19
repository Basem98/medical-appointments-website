import { Grid, Button, useTheme, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import AppointmentCancellationConfirm from "./AppointmentCancellationConfirm";

const AppointmentCancellation = ({ role, state, appointmentId, setOpenDrawer }) => {
    const theme = useTheme();
    const [wantToCancel, setWantToCancel] = useState(false);
    const [showCancel, setShowCancel] = useState(true);
    const [open, setOpen] = useState(false);
    const handleCancellation = () => {
        setWantToCancel(!wantToCancel);
    }
    return (role === 'user' && state === 'booked')
        || (role === 'doctor' && state === 'available') ?
        (
            showCancel ?
                <Grid item xs={12}>
                    {
                        wantToCancel ?
                            <AppointmentCancellationConfirm
                                appointmentId={appointmentId}
                                handleCancellation={handleCancellation}
                                setShowCancel={setShowCancel}
                                setOpenDrawer={setOpenDrawer}
                                setOpen={setOpen}
                            />
                            :
                            <Button
                                sx={{
                                    backgroundColor: theme.palette.error.main,
                                    color: 'white',
                                    border: `1px solid ${theme.palette.error.main}`,
                                    '&:hover': {
                                        color: theme.palette.error.main
                                    }
                                }}
                                onClick={handleCancellation}
                            >
                                Cancel Appointment
                            </Button>
                    }
                </Grid>
                : <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    sx={{
                        marginRight: 'auto'
                    }}
                >
                    <Alert
                        severity="info"
                        sx={{ width: '100%' }}
                    >
                        Appointment is cancelled successfully.
                    </Alert>
                </Snackbar>
        ) : <></>
}

export default AppointmentCancellation;
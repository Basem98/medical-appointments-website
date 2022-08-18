import { Grid, Button, useTheme } from "@mui/material";
import { useState } from "react";
import AppointmentCancellationConfirm from "./AppointmentCancellationConfirm";

const AppointmentCancellation = ({ role, state }) => {
    const theme = useTheme();
    const [wantToCancel, setWantToCancel] = useState(false);
    const handleCancellation = () => {
        setWantToCancel(!wantToCancel);
    }
    return role === 'user' && state === 'booked' ?
        (
            <Grid item xs={12}>
                {
                    wantToCancel ?
                        <AppointmentCancellationConfirm
                            handleCancellation={handleCancellation}
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
        ) : <></>
}

export default AppointmentCancellation;
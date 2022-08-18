import { Grid, Button, useTheme } from "@mui/material";

const AppointmentCancellation = ({ role, state }) => {
    const theme = useTheme();
    return role === 'user' && state === 'booked' ? 
    (
        <Grid item xs={12}>
            <Button
                sx={{
                    backgroundColor: theme.palette.error.main,
                    color: 'white',
                    '&:hover': {
                        border: `1px solid ${theme.palette.error.main}`,
                        color: theme.palette.error.main
                    }
                }}
            >
                Cancel Appointment
            </Button>
        </Grid>
    ) : <></>
}

export default AppointmentCancellation;
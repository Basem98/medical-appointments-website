import { Grid, Typography, useTheme } from "@mui/material";
import cancelAppointment from "../../Network/Appointments/CancelAppointment";
import CustomFormButton from "../CustomFormButton/CustomFormButton";

const AppointmentCancellationConfirm = ({ handleCancellation, appointmentId }) => {
    const theme = useTheme();
    const confirmCancellation = () => {
        const data = {
            state: 'canceled'
        }
        cancelAppointment(appointmentId, data)
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <Grid
            container
            sx={{
                border: `1px solid ${theme.palette.grey[500]}`,
                borderRadius: '10px',
                padding: '20px',
            }}
        >
            <Grid
                item
                xs={12}
            >
                <Typography>Are you sure you want to cancel?</Typography>
            </Grid>
            <Grid
                item
            >
                <CustomFormButton variant="contained"
                    onClick={confirmCancellation}
                    appointmentId={appointmentId}
                >
                    Yes
                </CustomFormButton>
            </Grid>
            <Grid
                item
            >
                <CustomFormButton
                    sx={{
                        backgroundColor: theme.palette.grey[500],
                        color: 'white',
                        border: `1px solid ${theme.palette.grey[500]}`,
                        marginLeft: '10px',
                        '&:hover': {
                            color: theme.palette.grey[500]
                        }
                    }}
                    onClick={handleCancellation}
                >
                    No
                </CustomFormButton>
            </Grid>
        </Grid>
    )
}

export default AppointmentCancellationConfirm;
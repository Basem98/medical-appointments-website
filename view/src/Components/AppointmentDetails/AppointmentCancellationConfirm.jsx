import { Grid, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import cancelAppointment from "../../Network/Appointments/CancelAppointment";
import { setUpcomingAppointments } from "../../Store/Features/Appointments/upcomingAppointmentsSlice";
import CustomFormButton from "../CustomFormButton/CustomFormButton";

const AppointmentCancellationConfirm = ({ handleCancellation, appointmentId, setShowCancel, setOpenDrawer, setOpen }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const upcomingAppointments = useSelector((state) => state.upcomingAppointments.data);
    const confirmCancellation = () => {
        cancelAppointment(appointmentId)
            .then((response) => {
                dispatch(setUpcomingAppointments({
                    upcomingAppointments: upcomingAppointments.map((appointment) => {
                        if(appointment._id === appointmentId) {
                            appointment = {...appointment, state: 'canceled'}
                        }
                        return appointment;
                    })
                }))
                setShowCancel(false);
                setOpen(true);
                setTimeout(() => {
                    setOpenDrawer(false)
                }, 5000);
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
import { Typography, useTheme } from "@mui/material";

const AppointmentStatus = ({ state }) => {
    const theme = useTheme();
    const baseStyle = {
        borderRadius: '20px',
        color: 'white',
        padding: '2px',
        width: {
            xs: '100%',
            md: '50%'

        },
        textAlign: 'center'
    }
    const stateStyle = state === 'canceled' ? {
        ...baseStyle,
        backgroundColor: theme.palette.error.main
    } : state === 'available' ? {
        ...baseStyle,
        backgroundColor: theme.palette.success.main
    } : state === 'booked' ? {
        ...baseStyle,
        backgroundColor: theme.palette.warning.main
    } : state === 'finished' ? {
        ...baseStyle,
        backgroundColor: theme.palette.grey[500]
    } : {}
    return (
        <>
            <Typography
                sx={stateStyle}
                variant="body2"
                marginLeft='auto'
            >
                {state}
            </Typography>
        </>
    );
}

export default AppointmentStatus;
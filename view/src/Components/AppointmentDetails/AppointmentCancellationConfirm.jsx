import { Grid, Typography, useTheme } from "@mui/material";
import CustomFormButton from "../CustomFormButton/CustomFormButton";

const AppointmentCancellationConfirm = ({ handleCancellation }) => {
    const theme = useTheme();
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
                <CustomFormButton variant="contained">
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
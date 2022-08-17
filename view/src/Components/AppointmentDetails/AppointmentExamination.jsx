import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Grid,
    Typography,
    useTheme
} from "@mui/material";
import MedicationIcon from '@mui/icons-material/Medication';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import CustomFormButton from "../CustomFormButton/CustomFormButton";

const AppointmentExamination = ({ appointmentDetails, role }) => {
    const theme = useTheme();
    const AppointmentDetail = (props) => {
        return (

            <Grid
                container item
                xs={10}
            >
                <Grid
                    item
                    xs={1}
                >
                    {props.children}
                </Grid>
                <Grid
                    item
                    xs={11}
                >
                    <Typography
                        variant="body2"
                        paddingLeft={2}
                    >
                        {props.detail}
                    </Typography>
                </Grid>
            </Grid>

        )
    }
    return (
        <>
            {
                appointmentDetails?.info?.diagnosis ?
                    <Grid container>
                        <Grid item xs={10}>
                            <AppointmentDetail
                                detail={appointmentDetails?.info.diagnosis}
                            >
                                <MonitorHeartIcon
                                    fontSize="medium"
                                    sx={{
                                        color: theme.palette.highlight.main,
                                        marginRight: 3
                                    }}
                                />
                            </AppointmentDetail>
                        </Grid>
                    </Grid>
                    : role === 'doctor' ?
                        <CustomFormButton
                            variant="contained"
                            sx={{
                                marginRight: '5px'
                            }}
                        >
                            Add Diagnosis
                        </CustomFormButton>
                        :
                        <></>


            }

            {
                appointmentDetails?.info?.prescription?.length > 0 ?
                    <Grid
                        container
                        item
                        xs={10}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap'
                        }}
                    >
                        <Grid item xs={1}>
                            <MedicationIcon
                                fontSize="medium"
                                sx={{
                                    color: theme.palette.highlight.main,
                                }}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <Typography
                                variant="body2"
                                paddingLeft={2}
                            >
                                Prescription
                            </Typography>
                        </Grid>
                        <TableContainer>
                            <Table sx={{ maxWidth: 400 }} aria-label="Prescription">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{
                                            color: theme.palette.highlight.main,
                                            fontWeight: 'bold'
                                        }}
                                        >
                                            Drug Name</TableCell>
                                        <TableCell sx={{
                                            color: theme.palette.highlight.main,
                                            fontWeight: 'bold'
                                        }}
                                        >
                                            Dosage
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {

                                        appointmentDetails?.info?.prescription.map((drug) => {
                                            return (
                                                <TableRow
                                                    key={drug.drugName}
                                                >
                                                    <TableCell component="th">
                                                        {drug.drugName}
                                                    </TableCell>
                                                    <TableCell>
                                                        {drug.dosage}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    : role === 'doctor' ?
                        <CustomFormButton
                            variant="contained"
                            sx={{
                                marginLeft: '5px'
                            }}
                        >
                            Add Prescription
                        </CustomFormButton>
                        :
                        <></>
            }

        </>
    );
}

export default AppointmentExamination;
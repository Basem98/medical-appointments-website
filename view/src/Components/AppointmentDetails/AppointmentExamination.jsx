import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Grid,
    Typography,
    useTheme,
    IconButton,
    Snackbar,
    Alert
} from "@mui/material";
import MedicationIcon from '@mui/icons-material/Medication';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import CustomFormButton from "../CustomFormButton/CustomFormButton";
import { useState } from "react";
import { Form, Formik } from "formik";
import InputField from "../InputField/InputField";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import writePrescription from "../../Network/Doctors/writePrescription";
import { prescriptionAndDiagnosisValidation } from "../../Helper/ValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { setUpcomingAppointments } from "../../Store/Features/Appointments/upcomingAppointmentsSlice";
const AppointmentExamination = ({ appointmentDetails, role, setOpenDrawer }) => {
    const intialValues = {
        diagnosis: '',
        prescription: [{
            drugName: '',
            dosage: ''
        }]
    }
    const theme = useTheme();
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);
    const [drugList, setDrugList] = useState([]);
    const [appointmentId, setAppointmentId] = useState();
    const [open, setOpen] = useState(false);
    const [showAddPrescription, setShowAddPrescription] = useState(true);
    const upcomingAppointments = useSelector((state) => state.upcomingAppointments.data)
    const handleClick = (id) => {
        setAppointmentId(id)
        setShowForm(!showForm);
    }
    const handleSubmit = (values) => {
        const data = {
            info: { ...values },
            state: 'finished'
        }
        writePrescription(appointmentId, data)
            .then((response) => {
                setShowAddPrescription(false);
                setOpen(true);
                setTimeout(() => {
                    setOpenDrawer(false)
                }, 5000)
                dispatch(setUpcomingAppointments({
                    upcomingAppointments: upcomingAppointments.map((appointment) => {
                        if (appointment._id === appointmentId) {
                            appointment = { ...appointment, ...data }
                        }
                        return appointment;
                    })
                }))
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const addNewDrug = () => {
        setDrugList(drugList.concat(
            <Grid key={drugList.length} container>
                <Grid
                    item
                    xs={4}
                    sx={{
                        border: `1px solid ${theme.palette.highlight.main}`,
                        borderRadius: '12px',
                        marginBottom: '10px',
                        marginRight: '5px'
                    }}
                >
                    <InputField
                        placeholder="Drug name"
                        name={`prescription[${drugList.length + 1}].drugName`}
                        type="text"
                    />
                </Grid>
                <Grid
                    item
                    xs={4}
                    sx={{
                        border: `1px solid ${theme.palette.highlight.main}`,
                        borderRadius: '12px',
                        marginBottom: '10px',
                        marginLeft: '5px'

                    }}
                >
                    <InputField
                        placeholder="Dosage"
                        name={`prescription[${drugList.length + 1}].dosage`}
                        type="text"
                    />
                </Grid>
            </Grid>
        ))
    }
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

        appointmentDetails?.info?.diagnosis &&
            appointmentDetails?.info?.prescription?.length > 0 ?
            <>
                <Grid item xs={12}>
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

                                    appointmentDetails?.info?.prescription.map((drug, index) => {
                                        return (
                                            <TableRow
                                                key={index}
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
            </>
            : (role === 'doctor' && appointmentDetails?.state === 'booked' && showAddPrescription) ?
                <>
                    <CustomFormButton
                        variant="contained"
                        onClick={() => handleClick(appointmentDetails._id)}
                        sx={{
                            marginLeft: 2,
                            marginTop: 2
                        }}
                    >
                        Add prescription and diagnosis
                    </CustomFormButton>
                    {
                        showForm &&
                        <Grid
                            sx={{
                                marginLeft: 2,
                                marginTop: 2
                            }}
                        >
                            <Formik
                                initialValues={intialValues}
                                onSubmit={handleSubmit}
                                validationSchema={prescriptionAndDiagnosisValidation}
                            >
                                {
                                    (props) =>
                                        <>
                                            <Form>
                                                <Grid
                                                    container
                                                >
                                                    <Grid
                                                        item
                                                        xs={10}
                                                        sx={{
                                                            border: `1px solid ${theme.palette.highlight.main}`,
                                                            borderRadius: '12px',
                                                            marginBottom: '10px'

                                                        }}
                                                    >
                                                        <InputField
                                                            name="diagnosis"
                                                            placeholder="Diagnosis"
                                                            multiline
                                                            rows={4}

                                                            type="text"
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={4}
                                                        sx={{
                                                            border: `1px solid ${theme.palette.highlight.main}`,
                                                            borderRadius: '12px',
                                                            marginBottom: '10px',
                                                            marginRight: '5px'
                                                        }}
                                                    >
                                                        <InputField
                                                            placeholder="Drug name"
                                                            name="prescription[0].drugName"
                                                            type="text"
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={4}
                                                        sx={{
                                                            border: `1px solid ${theme.palette.highlight.main}`,
                                                            borderRadius: '12px',
                                                            marginBottom: '10px',
                                                            marginLeft: '5px'

                                                        }}
                                                    >
                                                        <InputField
                                                            placeholder="Dosage"
                                                            name="prescription[0].dosage"
                                                            type="text"
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={2}
                                                    >
                                                        <IconButton
                                                            sx={{
                                                                color: theme.palette.highlight.main
                                                            }}
                                                            onClick={addNewDrug}
                                                        >
                                                            <AddCircleOutlineIcon />
                                                        </IconButton>
                                                    </Grid>
                                                    {
                                                        drugList
                                                    }
                                                    <Grid
                                                        item
                                                        xs={10}
                                                    >
                                                        <CustomFormButton
                                                            variant="contained"
                                                            sx={{
                                                                marginRight: '5px'
                                                            }}
                                                            type="submit"
                                                        >
                                                            Submit
                                                        </CustomFormButton>
                                                        <CustomFormButton
                                                            onClick={handleClick}
                                                            sx={{
                                                                backgroundColor: theme.palette.grey[500],
                                                                color: 'black',
                                                                marginLeft: '5px'
                                                            }}
                                                        >
                                                            Cancel
                                                        </CustomFormButton>
                                                    </Grid>
                                                </Grid>
                                            </Form>
                                        </>
                                }


                            </Formik>
                        </Grid>
                    }

                </> :
                <Grid>
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                    >
                        <Alert
                            severity="success"
                            sx={{ width: '100%' }}
                        >
                            Diagnosis and prescription added successfully! Now appointment is finished.
                        </Alert>
                    </Snackbar>
                </Grid>
    );
}

export default AppointmentExamination;
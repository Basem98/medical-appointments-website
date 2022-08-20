/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getPatients from "../../Network/Doctors/getPatients";
import { setDoctorPatients } from "../../Store/Features/DoctorPatients/doctorPatientsSlice";
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    useTheme,
    Grid,
    CircularProgress

} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../../Helper/Authentication";
const Patients = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const doctorId = useSelector((state) => state.userDetails.data?._id);
    const patients = useSelector((state) => state.doctorPatients.patients);
    const role = useSelector((state) => state.userDetails.role);

    authenticate('Doctor', navigate, dispatch);

    useEffect(() => {
        doctorId &&
            getPatients(doctorId)
                .then((response) => {
                    dispatch(setDoctorPatients({
                        patients: response.data.message[0]
                    }))
                })
                .catch((error) => {
                    console.log(error);
                })
    }, [doctorId]);

    return (
        <>
            {
                role === 'Doctor' ?
                    <Grid
                        container
                        justifyContent="center"
                        marginTop={5}
                    >
                        {
                            patients ?
                                <Grid
                                    item
                                    xs={12}
                                    md={10}
                                >
                                    <TableContainer>
                                        <Table aria-label="Prescription">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{
                                                        color: theme.palette.highlight.main,
                                                        fontWeight: 'bold'
                                                    }}
                                                    >
                                                        First Name</TableCell>
                                                    <TableCell sx={{
                                                        color: theme.palette.highlight.main,
                                                        fontWeight: 'bold'
                                                    }}
                                                    >
                                                        Last Name
                                                    </TableCell>
                                                    <TableCell sx={{
                                                        color: theme.palette.highlight.main,
                                                        fontWeight: 'bold'
                                                    }}
                                                    >
                                                        Phone
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {

                                                    patients?.patients.map((patient) => {
                                                        console.log(patient);
                                                        return (
                                                            <TableRow
                                                                key={patient._id}
                                                            >
                                                                <TableCell component="th">
                                                                    {patient.firstName}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {patient.lastName}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {patient.phoneNumber}
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                :
                                <Grid item xs={10} sx={{ textAlign: "center" }}>
                                    <CircularProgress sx={{
                                        color: theme.palette.highlight.main
                                    }} />
                                </Grid>
                        }
                    </Grid>
                    :
                    <></>

            }
        </>
    );
}

export default Patients;
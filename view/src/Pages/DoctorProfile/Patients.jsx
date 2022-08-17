import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getPatients from "../../Network/Doctors/getPatients";
import { setDoctorPatients } from "../../Store/Features/DoctorPatients/doctorPatientsSlice";
import checkAuthentication from "../../Network/Base/checkAuthentication";
import { setUserDetails } from "../../Store/Features/UserDetails/userDetailsSlice";
import {
    Typography,
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
import { Link, useNavigate } from "react-router-dom";
const Patients = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const doctorId = useSelector((state) => state.userDetails.data?._id);
    const patients = useSelector((state) => state.doctorPatients.patients)

    useEffect(() => {
        checkAuthentication()
            .then((response) => {
                dispatch(setUserDetails({
                    role: response.data.role,
                    data: response.data.data,
                    email: response.data.data.email
                }))
                if(response.data.role !== 'Doctor') {
                    navigate('/');
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);
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

        </>
    );
}

export default Patients;
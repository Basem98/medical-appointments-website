import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getPatients from "../../Network/Doctors/getPatients";
import { setDoctorPatients } from "../../Store/Features/DoctorPatients/doctorPatientsSlice";
import checkAuthentication from "../../Network/Base/checkAuthentication";
import { setUserDetails } from "../../Store/Features/UserDetails/userDetailsSlice";
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    useTheme,
    Grid

} from "@mui/material";
import { Link } from "react-router-dom";
const Patients = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
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
                                        Name
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
                                                    {patient.firstName} {patient.lastName}
                                                </TableCell>
                                                <TableCell>
                                                    {patient.phoneNumber}
                                                </TableCell>
                                                <TableCell>
                                                    <Link
                                                        to=""
                                                        style={{
                                                            textDecoration: 'none',
                                                            color: theme.palette.highlight.main,
                                                            fontWeight: 'bold'
                                                        }}
                                                    >
                                                        View history
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

        </>
    );
}

export default Patients;
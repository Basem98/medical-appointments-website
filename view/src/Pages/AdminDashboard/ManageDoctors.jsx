import { getDoctorsData, acceptDoctor, rejectDoctor } from '../../Network/Admin/doctors'
import {
    CircularProgress, Table, TableHead, TableRow, TableBody, Button, Grid, TableContainer, Paper, Snackbar
} from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { StyledTableCell, StyledTableRow } from "../../Helper/CustomTableItems";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function ManageDoctors() {
    const [doctorsData, setDoctorsData] = useState([]);
    const [paginatePage, setPaginatePage] = useState({ pageNum: 0, nextPage: true });
    const [snakbarStatus, setSnakbarStatus] = useState(false);
    const [alertStatus, setAlertStatus] = useState({ severity: '', msg: '' });

    useEffect(() => {
        getDoctorsData({ type: 'all', pageNum: paginatePage.pageNum })
            .then(res => {
                setDoctorsData(res.data.data);
            })
            .catch(err => {
                if (err.response.status === 404) {
                    if (paginatePage.pageNum > 0) {
                        setPaginatePage({ pageNum: paginatePage.pageNum - 1, nextPage: false });
                        setAlertStatus({ severity: 'error', msg: 'No pages found!' });
                        setSnakbarStatus(true);
                    }
                }
            })
    }, [paginatePage.pageNum])

    const handlePageForward = () => {
        setPaginatePage({ ...paginatePage, pageNum: paginatePage.pageNum + 1 });
    }

    const handlePageBackward = () => {
        if (paginatePage.pageNum > 0) setPaginatePage({ nextPage: true, pageNum: paginatePage.pageNum - 1 });
    }

    const handleDeleteDoctor = (doctorId) => {
        rejectDoctor(doctorId)
            .then(res => {
                if (res.status === 204) {
                    setDoctorsData(doctorsData.filter(doctor => doctor._id !== doctorId));
                    setAlertStatus({ severity: 'success', msg: 'Doctor Deleted' });
                    setSnakbarStatus(true);
                }
            })
            .catch(err => {
                setAlertStatus({ severity: 'error', msg: 'Could not delete!' });
                setSnakbarStatus(true);
            })

    }
    return (
        <>
            <Grid item xs={11} sx={{ py: 3, display: "flex", flexDirection: "column", justifyContent: "space-between" }} >

                {doctorsData.length ? (
                    <>
                        <Box sx={{ flexGrow: 1 }}>
                            <TableContainer component={Paper} >
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Name</StyledTableCell>
                                            <StyledTableCell>E-mail</StyledTableCell>
                                            <StyledTableCell>Phone No.</StyledTableCell>
                                            <StyledTableCell>Education</StyledTableCell>
                                            <StyledTableCell>No. of Appointments</StyledTableCell>
                                            {/* <StyledTableCell>Verified</StyledTableCell> */}
                                            <StyledTableCell>Details</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {doctorsData.length && doctorsData.map((doctorRow, indx) => (
                                            <StyledTableRow key={doctorRow._id}>
                                                <StyledTableCell>{`${doctorRow.firstName} ${doctorRow.lastName}`}</StyledTableCell>
                                                <StyledTableCell>{doctorRow.email}</StyledTableCell>
                                                <StyledTableCell>{doctorRow.phoneNumber}</StyledTableCell>
                                                {/* <StyledTableCell>{doctorRow.isVerified ? "Yes" : "No"}</StyledTableCell> */}
                                                <StyledTableCell>{doctorRow.education[0].degree}</StyledTableCell>
                                                <StyledTableCell>{doctorRow.appointments.length}</StyledTableCell>
                                                <StyledTableCell><Button variant="contained" color="error" onClick={() => handleDeleteDoctor(doctorRow._id)}>Delete</Button></StyledTableCell>
                                                {/* <StyledTableCell><Button variant="contained" onClick={(function (doctorRow) { let data = doctorRow; return (() => { let data = doctorRow; handleDrawerOpen(data) }) })(doctorRow)}>More details</Button></StyledTableCell> */}

                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                        <Box sx={{ my: 3, px: 15, display: "flex", justifyContent: paginatePage.pageNum ? "space-between" : "end", position: "static", bottom: "20px" }}>
                            {paginatePage.pageNum ? (<ArrowCircleLeftOutlinedIcon cursor="pointer" onClick={handlePageBackward} sx={{ fontSize: 40, "&:hover": { opacity: .7 } }} />) : ('')}
                            {paginatePage.nextPage ? (<ArrowCircleRightOutlinedIcon cursor="pointer" onClick={handlePageForward} sx={{ fontSize: 40, "&:hover": { opacity: .7 } }} />) : ('')}
                        </Box>
                        <Snackbar open={snakbarStatus} autoHideDuration={5000} onClose={() => setSnakbarStatus(false)}>
                            <CustomAlert
                                severity={alertStatus.severity}
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setSnakbarStatus(false);
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                            >
                                {alertStatus.msg}
                            </CustomAlert>
                        </Snackbar>
                    </>
                ) : (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <CircularProgress color='highlight' sx={{ marginY: '10px' }} />
                    </Box>
                )
                }
            </Grid >
        </>

    )
}
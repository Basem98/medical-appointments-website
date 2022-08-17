import { getAppointmentsData, deleteAppointment } from '../../Network/Admin/appointments';
import {
    CircularProgress, Table, TableHead, TableRow, TableBody, Button, Grid, TableContainer, Paper, useTheme, Snackbar, Alert
} from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { StyledTableCell, StyledTableRow } from "../../Helper/CustomTableItems";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function AppointmentsList() {
    const [appointmentsData, setAppointmentsData] = useState([]);
    const [paginatePage, setPaginatePage] = useState({ pageNum: 0, nextPage: true });
    const [snakbarStatus, setSnakbarStatus] = useState(false);
    const [alertStatus, setAlertStatus] = useState({ severity: '', msg: '' });

    useEffect(() => {
        getAppointmentsData({ type: 'all', pageNum: paginatePage.pageNum })
            .then(res => {
                console.log('res.data.data: ', res)
                setAppointmentsData(res.data.data);
            })
            .catch(err => {
                console.log('erro: ', err)
                if (err.response.status === 404) {
                    setPaginatePage({ pageNum: paginatePage.pageNum - 1, nextPage: false });
                    setAlertStatus({ severity: 'error', msg: 'No pages found!' });
                    setSnakbarStatus(true);
                }
            })
    }, [paginatePage.pageNum])

    const handlePageForward = () => {
        console.log('paginatePageNumber: ', paginatePage.pageNum)
        setPaginatePage({ ...paginatePage, pageNum: paginatePage.pageNum + 1 });
    }

    const handlePageBackward = () => {
        if (paginatePage.pageNum > 0) setPaginatePage({ nextPage: true, pageNum: paginatePage.pageNum - 1 });
    }

    const handleDeleteAppointment = (userId) => {
        deleteAppointment(userId)
            .then(res => {
                if (res.status === 204) {
                    setAppointmentsData(appointmentsData.filter(user => user._id !== userId));
                    setAlertStatus({ severity: 'success', msg: 'Appointment Deleted' });
                    setSnakbarStatus(true);
                }
            })
            .catch(err => {
                setAlertStatus({ severity: 'error', msg: 'Could not delete!' });
                setSnakbarStatus(true);
            })
    }

    return (
        <Grid item xs={11} sx={{ py: 3, display: "flex", flexDirection: "column", justifyContent: "space-between" }} >
            {appointmentsData.length ? (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Date</StyledTableCell>
                                    <StyledTableCell>Time</StyledTableCell>
                                    <StyledTableCell>Duration</StyledTableCell>
                                    <StyledTableCell>State</StyledTableCell>
                                    <StyledTableCell>Doctor</StyledTableCell>
                                    <StyledTableCell>User</StyledTableCell>
                                    <StyledTableCell>Delete</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {appointmentsData.length && appointmentsData.map(appointmentRow => (
                                    <StyledTableRow key={appointmentRow._id}>
                                        <StyledTableCell>{appointmentRow.date.slice(0, 10)}</StyledTableCell>
                                        <StyledTableCell>{`${appointmentRow.time.hour} : ${appointmentRow.time.minute}`}</StyledTableCell>
                                        <StyledTableCell>{`${appointmentRow.time.duration} minutes`}</StyledTableCell>
                                        <StyledTableCell>{appointmentRow.state}</StyledTableCell>
                                        <StyledTableCell>{`${appointmentRow.doctor.firstName} ${appointmentRow.doctor.lastName}`}</StyledTableCell>
                                        <StyledTableCell>{appointmentRow.user ? (`${appointmentRow.user.firstName} ${appointmentRow.user.lastName}`) : ('Not Booked')}</StyledTableCell>
                                        <StyledTableCell><Button variant="contained" color="error" onClick={() => handleDeleteAppointment(appointmentRow._id)}>Delete</Button></StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
    )
}
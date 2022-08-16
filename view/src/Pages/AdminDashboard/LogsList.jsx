import getAdminLogs from '../../Network/Admin/logs'
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableCell, StyledTableRow } from '../../Helper/CustomTableItems'
import { Grid, Box, Snackbar } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const LogsList = () => {

    const [logsData, setLogsData] = useState([]);
    const [paginatePage, setPaginatePage] = useState({ pageNum: 0, nextPage: true });
    const [snakbarStatus, setSnakbarStatus] = useState(false);
    const [alertStatus, setAlertStatus] = useState({ severity: '', msg: '' });

    useEffect(() => {
        getAdminLogs(paginatePage.pageNum)
            .then(res => { setLogsData(res.data.data); console.log(res) })
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
        console.log('paginatePage: ', paginatePage)
        setPaginatePage({ ...paginatePage, pageNum: paginatePage.pageNum + 1 });
    }

    const handlePageBackward = () => {
        if (paginatePage.pageNum > 0)
            setPaginatePage({ ...paginatePage, pageNum: paginatePage.pageNum - 1 });
    }

    return (
        <Grid item xs={11} sx={{ py: 3, display: "flex", flexDirection: "column", justifyContent: "space-between" }} >
            {/* <h1>Logs</h1> */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell align="left">Time</StyledTableCell>
                            <StyledTableCell align="left">Level</StyledTableCell>
                            <StyledTableCell align="left">Sender IP</StyledTableCell>
                            <StyledTableCell align="left">Methods</StyledTableCell>
                            <StyledTableCell align="left">Route</StyledTableCell>
                            <StyledTableCell align="left">Status Code</StyledTableCell>
                            <StyledTableCell align="left">Message</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {logsData.length && logsData.map((row) => (
                            <StyledTableRow key={row._id}>
                                {Object.keys(row).map(key => (
                                    <StyledTableCell align="left">{row[key]}</StyledTableCell>
                                ))}
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
        </Grid>

    )
}

export default LogsList;
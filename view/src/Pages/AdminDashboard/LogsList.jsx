import getAdminLogs from '../../Network/Admin/logs'
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableCell, StyledTableRow } from '../../Helper/CustomTableItems'
import { Grid, Box } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

const LogsList = () => {

    const [logsData, setLogsData] = useState([]);
    const [paginatePageNumber, setPaginatePageNumber] = useState(0);

    useEffect(() => {
        getAdminLogs(paginatePageNumber)
            .then(res => setLogsData(res.data.data))
            .catch(err => console.log(err))
    }, [paginatePageNumber])

    const handlePageForward = () => {
        console.log('paginatePageNumber: ', paginatePageNumber)
        setPaginatePageNumber(paginatePageNumber + 1);
    }

    const handlePageBackward = () => {
        if (paginatePageNumber > 0) setPaginatePageNumber(paginatePageNumber - 1);
    }

    return (
        <Grid item xs={11} sx={{ py: 3 }}>
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
                            <StyledTableRow key={row.name}>
                                {Object.keys(row).map(key => (
                                    <StyledTableCell align="left">{row[key]}</StyledTableCell>
                                ))}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ mt: 3, px: 15, display: "flex", justifyContent: "space-between" }}>
                <ArrowCircleLeftOutlinedIcon onClick={handlePageBackward} sx={{ fontSize: 40 }} />
                <ArrowCircleRightOutlinedIcon onClick={handlePageForward} sx={{ fontSize: 40 }} />
            </Box>
        </Grid>

    )
}

export default LogsList;
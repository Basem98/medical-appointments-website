import getAdminLogs from '../../Network/Admin/logs'
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableCell, StyledTableRow } from '../../Helper/CustomTableItems'
import { Grid } from '@mui/material';



const LogsList = () => {

    const [logsData, setLogsData] = useState([]);

    useEffect(() => {
        getAdminLogs()
            .then(res => setLogsData(res.data.data))
            .catch(err => console.log(err))
    }, [])

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
        </Grid>

    )
}

export default LogsList;
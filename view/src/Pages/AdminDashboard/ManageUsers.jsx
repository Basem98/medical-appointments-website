import getUsersData from '../../Network/Admin/user'
import {
    CircularProgress, Table, TableHead, TableRow, TableBody, Button, Grid, TableContainer, Paper
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { useState, useEffect } from "react";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import { StyledTableCell, StyledTableRow } from "../../Helper/CustomTableItems";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';


const ManageUsers = () => {
    const [usersData, setUsersData] = useState([]);
    const [paginatePageNumber, setPaginatePageNumber] = useState(0);
    const [serverResponse, setServerResponse] = useState({ sucess: false, msg: '' });

    useEffect(() => {
        getUsersData(paginatePageNumber)
            .then(res => {
                setUsersData(res.data.data);
                setServerResponse({ ...serverResponse, success: true })
                console.log(res.data.data);
            })
            .catch(err => setServerResponse({ ...serverResponse, success: false }))
    }, [paginatePageNumber])

    const handlePageForward = () => {
        console.log('paginatePageNumber: ', paginatePageNumber)
        setPaginatePageNumber(paginatePageNumber + 1);
    }

    const handlePageBackward = () => {
        if (paginatePageNumber > 0) setPaginatePageNumber(paginatePageNumber - 1);
    }

    const theme = useTheme();
    return (
        <Grid item xs={11} sx={{ py: 3, }} >
            {usersData.length ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>E-mail</StyledTableCell>
                                <StyledTableCell>Phone No.</StyledTableCell>
                                <StyledTableCell>Verified</StyledTableCell>
                                <StyledTableCell>No. of Appointments</StyledTableCell>
                                <StyledTableCell>Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usersData.length && usersData.map(userRow => (
                                <StyledTableRow key={userRow._id}>
                                    <StyledTableCell>{`${userRow.firstName} ${userRow.lastName}`}</StyledTableCell>
                                    <StyledTableCell>{userRow.email}</StyledTableCell>
                                    <StyledTableCell>{userRow.phoneNumber}</StyledTableCell>
                                    <StyledTableCell>{userRow.isVerified ? "Yes" : "No"}</StyledTableCell>
                                    <StyledTableCell>{userRow.appointments.length}</StyledTableCell>
                                    <StyledTableCell><Button>Delete</Button></StyledTableCell>

                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <CircularProgress color='highlight' sx={{ marginY: '10px' }} />
            )}
            <Box sx={{ mt: 3, px: 15, display: "flex", justifyContent: "space-between" }}>
                <ArrowCircleLeftOutlinedIcon onClick={handlePageBackward} sx={{ fontSize: 40 }} />
                <ArrowCircleRightOutlinedIcon onClick={handlePageForward} sx={{ fontSize: 40 }} />
            </Box>
            {/* {
                !serverResponse.sucess && serverResponse.msg ?
                    <CustomAlert
                        severity={serverResponse.success ? 'success' : 'error'}
                        sx={{ boxShadow: theme.shadows[1] }}
                        onClose={() => {
                            setServerResponse({ success: false, msg: '' });
                        }}>{serverResponse.msg}</CustomAlert>
                    : <CircularProgress color='highlight' sx={{ marginY: '10px' }} />
            } */}
        </Grid>
    )
}

export default ManageUsers;
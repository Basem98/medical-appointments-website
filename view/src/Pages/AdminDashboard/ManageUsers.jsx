import { getUsersData, deleteUser } from '../../Network/Admin/user'
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
    const [paginatePage, setPaginatePage] = useState({ pageNum: 0, nextPage: true });
    const [serverResponse, setServerResponse] = useState({ sucess: false, msg: '' });

    useEffect(() => {
        getUsersData(paginatePage.pageNum)
            .then(res => {
                setUsersData(res.data.data);
                setServerResponse({ ...serverResponse, success: true })
            })
            .catch(err => {
                console.log('erro: ', err)
                if (err.response.status === 404) {
                    setPaginatePage({ pageNum: paginatePage.pageNum - 1, nextPage: false });
                }
                setServerResponse({ msg: err.response.status, success: false })
            })
    }, [paginatePage.pageNum])

    const handlePageForward = () => {
        console.log('paginatePageNumber: ', paginatePage.pageNum)
        setPaginatePage({ ...paginatePage, pageNum: paginatePage.pageNum + 1 });
    }

    const handlePageBackward = () => {
        if (paginatePage.pageNum > 0) setPaginatePage({ nextPage: true, pageNum: paginatePage.pageNum - 1 });
    }

    const handleDeleteUser = (userId) => {
        deleteUser(userId)
            .then(res => {
                if (res.status === 204) setUsersData(usersData.filter(user => user._id !== userId));
            })
            .catch(err => console.log(err))
    }

    return (
        <Grid item xs={11} sx={{ py: 3, display: "flex", flexDirection: "column", justifyContent: "space-between" }} >
            {usersData.length ? (
                <>
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
                                        <StyledTableCell><Button variant="contained" color="error" onClick={() => handleDeleteUser(userRow._id)}>Delete</Button></StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{ my: 3, px: 15, display: "flex", justifyContent: paginatePage.pageNum ? "space-between" : "end", position: "static", bottom: "20px" }}>
                        {paginatePage.pageNum ? (<ArrowCircleLeftOutlinedIcon cursor="pointer" onClick={handlePageBackward} sx={{ fontSize: 40, "&:hover": { opacity: .7 } }} />) : ('')}
                        {paginatePage.nextPage ? (<ArrowCircleRightOutlinedIcon cursor="pointer" onClick={handlePageForward} sx={{ fontSize: 40, "&:hover": { opacity: .7 } }} />) : ('')}
                    </Box>
                </>
            ) : (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress color='highlight' sx={{ marginY: '10px' }} />
                </Box>
            )
            }

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
        </Grid >
    )
}

export default ManageUsers;
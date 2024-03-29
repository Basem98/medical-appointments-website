import { useState } from 'react';
import {
    Drawer, Divider, Typography, Grid, Table, TableHead, TableRow, TableBody, Button, id, TableContainer, Paper, Snackbar, Box
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { StyledTableCell, StyledTableRow } from "../../Helper/CustomTableItems";

import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import licenceImg from '../../../src/Assets/Images/okasha.jpg'

export default function ReviewDoctorApplication({ open, handleDrawerClose, currentDoctorRow, handleAcceptDoctor, handleRejectDoctor }) {

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    }));
    const drawerWidth = `${100 - 2 * 100 / 12}%`;

    const theme = useTheme();

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                },
                backgroundColor: "red"
            }}
            variant="persistent"
            anchor="right"
            open={open}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronRightIcon />
                </IconButton>
            </DrawerHeader>
            <Divider />
            <Grid container alignItems="center" justifyContent="center" sx={{ height: "100%" }}>
                <Grid item xs={11} >
                    <TableContainer component={Paper} >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell>E-mail</StyledTableCell>
                                    <StyledTableCell>Phone No.</StyledTableCell>
                                    <StyledTableCell>Verified</StyledTableCell>
                                    <StyledTableCell>Education</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {Object.keys(currentDoctorRow).length &&
                                    <StyledTableRow key={currentDoctorRow?._id}>
                                        <StyledTableCell>{`${currentDoctorRow?.firstName} ${currentDoctorRow?.lastName}`}</StyledTableCell>
                                        <StyledTableCell>{currentDoctorRow?.email}</StyledTableCell>
                                        <StyledTableCell>{currentDoctorRow?.phoneNumber}</StyledTableCell>
                                        <StyledTableCell>{currentDoctorRow?.isVerified ? "Yes" : "No"}</StyledTableCell>
                                        <StyledTableCell>{currentDoctorRow?.education[0]?.degree}</StyledTableCell>
                                    </StyledTableRow>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={11} container justifyContent="space-between">
                    <Grid item md={5} >
                        <Typography variant="h5" sx={{ mb: 2 }}>Professional License:</Typography>
                        <img
                            src={currentDoctorRow.professionalLicense}
                            // src={licenceImg}
                            alt="professional license"
                            style={{ borderRadius: "5%", maxWidth: "70%", border: "3px solid grey" }}
                        />
                    </Grid>
                    <Grid item md={7} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "space-between" }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>

                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "space-between" }}>
                                <Typography variant="h5">Experience:</Typography>
                                {currentDoctorRow?.experiences?.map((exp, index) => (<Box>
                                    {/* <span style={{ display: "inline" }}>&rarr;Exprience::</span> */}
                                    <ul style={{ listStyleType: "none", margin: 0, padding: 0, display: "inline", marginBottom: "10px", border: "3px solid #fff" }}>
                                        <li>{`${exp.title} at ${exp.workplace}`}</li>
                                        <li>{`From: ${exp.startDate.slice(0, 10)} to: ${!exp.isCurrentlyWorking ? exp.endDate.slice(0, 10) : 'now'}`}</li>
                                        <li>{`Location: ${exp.location.city}, ${exp.location.country}`}</li>
                                    </ul>
                                </Box>))}
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "space-between" }}>
                                <Typography variant="h5">Clinics:</Typography>
                                {currentDoctorRow?.clinics?.map((clinic, index) => (<Box>
                                    {/* <span style={{ display: "inline" }}>&rarr;Exprience::</span> */}
                                    <ul style={{ listStyleType: "none", margin: 0, padding: 0, display: "inline", marginBottom: "10px", border: "3px solid #fff" }}>
                                        <li>{`Name: ${clinic.name}`}</li>
                                        <li>{`Mobile: ${clinic.phone.mobile}`}</li>
                                        <li>{`Location: ${clinic.address.city}, ${clinic.address.country}`}</li>
                                    </ul>
                                </Box>))}
                            </Box>
                            {currentDoctorRow?.certifications?.length ?
                                (<Box sx={{ display: "flex", flexDirection: "column", alignItems: "space-between" }}>
                                    <Typography variant="h5">Certificates:</Typography>
                                    {currentDoctorRow?.certifications?.map((cert, index) => (<Box>
                                        {/* <span style={{ display: "inline" }}>&rarr;Exprience::</span> */}
                                        <ul style={{ listStyleType: "none", margin: 0, padding: 0, display: "inline", marginBottom: "10px", border: "3px solid #fff" }}>
                                            <li>{`Title: ${cert.title}`}</li>
                                            <li>{`Granter: ${cert.granter}`}</li>
                                            <li>{`Issue Date: ${cert.issueDate.slice(0, 10)}`}</li>
                                        </ul>
                                    </Box>))}
                                </Box>) :
                                ("")
                            }

                        </Box>

                        <Box sx={{ p: 5, display: "flex", justifyContent: "start" }}>
                            {!currentDoctorRow?.isAccepted ?
                                <Button variant="contained" color="success" sx={{ mr: 7, px: 3, py: 1 }} onClick={() => handleAcceptDoctor(currentDoctorRow?._id)}>Accept</Button>
                                :
                                <Button variant="contained" color="success" sx={{ mr: 7, px: 3, py: 1 }} disabled >Accept</Button>
                            }
                            {!currentDoctorRow?.isAccepted && <Button variant="contained" color="error" sx={{ px: 3 }} onClick={() => handleRejectDoctor(currentDoctorRow?._id)}>Reject</Button>}
                        </Box>
                    </Grid>
                </Grid>

            </Grid>
        </Drawer >
    )
}
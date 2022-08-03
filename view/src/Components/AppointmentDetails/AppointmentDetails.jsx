import {
    Drawer,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Grid,
    Typography,
    Box,
    useTheme
}
    from "@mui/material";
import { useState } from "react";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MedicationIcon from '@mui/icons-material/Medication';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import moment from "moment";

const AppointmentDetails = ({ appointmentDetails, role, openDrawer, setOpenDrawer }) => {
    const details = [
        { drugName: 'Some weirdo drug name', dosage: '2 times a day' },
        { drugName: 'Some quirky drug name', dosage: '2 times a day' },
        { drugName: 'Some strange drug name', dosage: '2 times a day' }
    ];
    const theme = useTheme();
    return (
        <>
            <Drawer
                open={openDrawer}
                anchor="left"
                onClose={() => { setOpenDrawer(!openDrawer) }}
                PaperProps={{
                    sx: {
                        width: { 'md': '50vw', 'xs': '90vw' }
                    }
                }}
            >
                <Grid container justifyContent="flex-start" padding={2} spacing={2}>
                    <Grid
                        item
                        container
                        xs={12}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Grid item xs={6}>
                            <Box
                                component="img"
                                sx={{
                                    borderRadius: '50%',
                                    width: '200px',
                                    height: '200px',
                                    objectFit: 'contain'
                                }}
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSleborUKlDqo2xbo3qSyXDV1Fs8B-4M9v6og&usqp=CAU"
                            />
                        </Grid>
                        <Grid container item xs={6}>
                            <Grid item xs={12}>
                                <Typography
                                >Dr. {appointmentDetails?.doctor.firstName} {appointmentDetails?.doctor.lastName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    sx={{
                                        color: theme.palette.grey[500]
                                    }}
                                >{appointmentDetails?.doctor.specialization}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item
                        xs={10}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap'
                        }}
                    >
                        <CalendarTodayIcon
                            fontSize="medium"
                            sx={{
                                color: theme.palette.highlight.main,
                                marginRight: 3
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: 20
                            }}
                        >
                            {moment(appointmentDetails?.date.split('T')[0])
                                .format('dddd, MMMM Do YYYY')}
                        </Typography>
                    </Grid>
                    <Grid item
                        xs={10}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap'
                        }}
                    >
                        <QueryBuilderIcon
                            fontSize="medium"
                            sx={{
                                color: theme.palette.highlight.main,
                                marginRight: 3
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: 20
                            }}
                        >
                            at {appointmentDetails?.time.hour}
                            : {appointmentDetails?.time.minute}
                        </Typography>
                    </Grid>
                    <Grid item
                        xs={10}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap'
                        }}
                    >
                        <HourglassBottomIcon
                            fontSize="medium"
                            sx={{
                                color: theme.palette.highlight.main,
                                marginRight: 3
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: 20
                            }}
                        >
                            Duration: {appointmentDetails?.time.duration} minutes
                        </Typography>
                    </Grid>
                    <Grid item
                        xs={10}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap'
                        }}
                    >
                        <LocationOnIcon
                            fontSize="medium"
                            sx={{
                                color: theme.palette.highlight.main,
                                marginRight: 3
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: 20
                            }}
                        >
                            <>{appointmentDetails?.doctor.clinics?.[0].address.streetName}, </>
                            <>{appointmentDetails?.doctor.clinics?.[0].address.city}, </>
                            <>{appointmentDetails?.doctor.clinics?.[0].address.governorate}, </>
                            <>{appointmentDetails?.doctor.clinics?.[0].address.country} </>
                        </Typography>
                    </Grid>
                    <Grid item
                        xs={10}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap'
                        }}
                    >
                        <ApartmentIcon
                            fontSize="medium"
                            sx={{
                                color: theme.palette.highlight.main,
                                marginRight: 3
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: 20
                            }}
                        >
                            Building No. {appointmentDetails?.doctor.clinics?.[0].address.buildingNo}
                        </Typography>
                    </Grid>
                    <Grid item
                        xs={10}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap'
                        }}
                    >
                        <LocalPhoneIcon
                            fontSize="medium"
                            sx={{
                                color: theme.palette.highlight.main,
                                marginRight: 3
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: 20
                            }}
                        >
                            {appointmentDetails?.doctor.clinics?.[0].phone.mobile}
                        </Typography>
                    </Grid>
                    <Grid container item
                        xs={12}
                    >
                        <Grid item xs={1}>
                            <MonitorHeartIcon
                                fontSize="medium"
                                sx={{
                                    color: theme.palette.highlight.main,
                                    marginRight: 3
                                }}
                            />
                        </Grid>
                        <Grid item xs={11}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: 20
                                }}
                            >
                                Some diagnosis Some diagnosis Some diagnosis Some diagnosis Some diagnosis Some diagnosis Some diagnosis Some diagnosisSome diagnosis Some diagnosis Some diagnosis
                            </Typography>
                        </Grid>
                    </Grid>
                    {
                        (appointmentDetails?.doctor.clinics?.[0].phone.landline)
                        &&
                        <Grid item
                            xs={10}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            <LocalPhoneIcon
                                fontSize="medium"
                                sx={{
                                    color: theme.palette.highlight.main,
                                    marginRight: 3
                                }}
                            />
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: 20
                                }}
                            >
                                {appointmentDetails?.doctor.clinics?.[0].phone.mobile}
                            </Typography>
                        </Grid>

                    }
                    <Grid item
                        xs={10}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap'
                        }}
                    >
                        <MedicationIcon
                            fontSize="medium"
                            sx={{
                                color: theme.palette.highlight.main,
                                marginRight: 3
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: 20
                            }}
                        >
                            Prescription
                        </Typography>
                        <TableContainer>
                            <Table sx={{ maxWidth: 400 }} aria-label="Prescription">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{
                                            color: theme.palette.highlight.main,
                                            fontWeight: 'bold'
                                        }}
                                        >
                                            Drug Name</TableCell>
                                        <TableCell sx={{
                                            color: theme.palette.highlight.main,
                                            fontWeight: 'bold'
                                        }}
                                        >
                                            Dosage
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {

                                        details.map((drug) => {
                                            return (
                                                <TableRow
                                                    key={drug.drugName}
                                                >
                                                    <TableCell component="th">
                                                        {drug.drugName}
                                                    </TableCell>
                                                    <TableCell>
                                                        {drug.dosage}
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
            </Drawer>
        </>
    );
}

export default AppointmentDetails;
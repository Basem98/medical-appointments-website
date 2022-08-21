import { Grid, Typography, List, ListItem, ListItemIcon, ListItemText, Rating, Divider, CircularProgress, FormHelperText } from '@mui/material';
import CustomFormButton from '../../Components/CustomFormButton/CustomFormButton';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import { useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import Map from '../../Components/Map/Map';
import CallIcon from '@mui/icons-material/Call';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BookingDrawer from '../../Components/BookingDrawer/BookingDrawer';
import getDoctor from '../../Network/Doctors/getDocotor';
import rateDoctor from '../../Network/Doctors/rateDoctor';

function DoctorDetails() {
    const theme = useTheme();
    const { id } = useParams();
    const bookingSectionRef = useRef();
    const [openBookingDrawer, setOpenBookingDrawer] = useState(false);
    let storeData = useSelector(store => store.specialists.specialists.find(doctor => doctor._id === id));
    const [doctorDetails, setDoctorDetails] = useState(storeData ? { ...storeData } : {});
    const currUser = useSelector(store => store.userDetails);
    const [ratingLabel, setRatingLabel] = useState('');

    useEffect(() => {
        if (!storeData) {
            getDoctor(id)
                .then(res => {
                    const sortedDetails = { ...res.data.message };
                    sortedDetails.appointments = sortedDetails.appointments ? [...res.data.message.appointments].sort((date1, date2) => new Date(date1).getDate() - new Date(date2).getDate()) : [];
                    setDoctorDetails({ ...sortedDetails });
                })
                .catch(err => console.log(err));
        } else {
            const sortedDetails = { ...doctorDetails };
            sortedDetails.appointments = sortedDetails.appointments ? [...doctorDetails.appointments].sort((date1, date2) => new Date(date1).getDate() - new Date(date2).getDate()) : [];
            setDoctorDetails({ ...sortedDetails });
        }
    }, []);

    const calculateRating = (newRating, id) => {
        rateDoctor(newRating, id)
            .then(res => {
                const updatedDoctorDetails = { ...doctorDetails };
                updatedDoctorDetails.rating = res.data.rating;
                updatedDoctorDetails.raters += updatedDoctorDetails.raters;
                setDoctorDetails({ ...updatedDoctorDetails });
            })
            .catch(err => { console.log(err) })
    }

    return (
        <>
            {
                doctorDetails && doctorDetails?.clinics?.length > 0 ?
                    <Grid container>
                        <>
                            <Grid
                                container
                                justifyContent={'center'}
                                sx={{
                                    background: theme.palette.linearDetailsBg.main,
                                    padding: '30px 0'
                                }}
                            >
                                <Grid container item xs={12} md={6}>
                                    {/* Hero section */}
                                    <Grid container item xs={12} style={{ marginTop: 20 }} alignItems='center' justifyContent='center'>
                                        {/* Doctor's pic here */}
                                        <img
                                            src={doctorDetails.profilePicture}
                                            alt="doctorImage"
                                            style={{
                                                width: "250px",
                                                height: "250px",
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                boxShadow: theme.shadows[5]
                                            }}
                                        />
                                    </Grid>
                                    {/* Hero's section grid */}
                                    <Grid container item xs={12} marginTop='25px' flexDirection='column' alignItems='center'>
                                        <Grid item>
                                            <Typography sx={{
                                                ...theme.typography.h1,
                                                color: theme.palette.text.primary,
                                                textAlign: 'center'
                                            }}
                                            >
                                                Dr. {doctorDetails.firstName} {doctorDetails.lastName}
                                            </Typography>
                                            <Grid
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Rating value={parseFloat(doctorDetails.rating)} precision={.5} size="large"
                                                    readOnly={currUser?.role !== 'User'}
                                                    onChangeActive={(event, currRating) => setRatingLabel(`${currRating}`)}
                                                    onChange={(event, newRating) => calculateRating(newRating, doctorDetails._id)} />
                                                    {ratingLabel > 0 && <FormHelperText sx={{color: theme.palette.highlight.main, fontWeight: 'bold', fontSize:14}}>{ratingLabel}</FormHelperText>}
                                            </Grid>
                                            <Grid container item justifyContent='center'>
                                                <FormHelperText sx={{color: theme.palette.text.primary, fontWeight: 'bold', fontSize:14}}>{parseFloat(doctorDetails.rating).toFixed(2)}</FormHelperText>
                                            </Grid>
                                            <Typography sx={{
                                                ...theme.typography.modalSmallText,
                                                color: theme.palette.text.primary,
                                                textAlign: 'center'
                                            }}>
                                                {doctorDetails.specialization}
                                            </Typography>
                                        </Grid>
                                        <Grid item marginTop='50px'>
                                            Appointment Fees: {doctorDetails.clinics[0].fees} EGP
                                        </Grid>
                                        <Grid
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                marginTop: "25px"
                                            }}>
                                            {/* HERE */}
                                            <CustomFormButton variant='contained' style={{ ...theme.typography.body1 }} onClick={() => bookingSectionRef.current.scrollIntoView()}>
                                                Booking information
                                            </CustomFormButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} md={1}>
                                    <Divider orientation='vertical' sx={{ display: { xs: 'none', md: 'block' } }} flexItem />
                                    <Divider flexItem sx={{ width: '100%', display: { xs: 'block', md: 'none' }, marginTop: '50px' }} />
                                </Grid>
                                <Grid container item xs={12} md={5} alignItems='center' justifyContent='center'>
                                    {/* the Education section */}
                                    <Grid container>
                                        <Grid container item xs={12} style={{ marginTop: '30px' }} alignItems={{ xs: 'center', md: 'flex-start' }} justifyContent={{ xs: 'center', md: 'flex-start' }}
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column'
                                            }}>
                                            <Typography style={{
                                                ...theme.typography.h4,
                                                fontWeight: 'bold',
                                                color: theme.palette.text.primary,
                                            }}
                                            >
                                                Education
                                            </Typography>
                                            <List>
                                                {doctorDetails.education.map((item, index) => (
                                                    <Grid item key={item.issueDate + index}>
                                                        <ListItem sx={{
                                                            ...theme.typography.largerButtonText,
                                                            color: theme.palette.text.primary,
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'flex-start',
                                                            padding: '0px'
                                                        }}
                                                        >
                                                            {item.degree}
                                                        </ListItem>
                                                        <ListItem alignItems={'center'}
                                                            sx={{
                                                                ...theme.typography.body2,
                                                                color: theme.palette.text.primary,
                                                                padding: "0px"

                                                            }}>
                                                            {item.granter}
                                                        </ListItem>
                                                        <ListItem alignItems={'center'}
                                                            sx={{
                                                                ...theme.typography.body2,
                                                                color: theme.palette.text.primary,
                                                                padding: "0px"
                                                            }}>
                                                            {item.issueDate.replace(/T.*Z/, '')}
                                                        </ListItem>
                                                    </Grid>
                                                ))}
                                            </List>
                                        </Grid>
                                    </Grid>
                                    {/* Certification section */}
                                    {doctorDetails.certifications.length > 0 && <Grid container>
                                        <Grid container item xs={12} style={{ marginTop: '30px' }} alignItems={{ xs: 'center', md: 'flex-start' }} justifyContent={{ xs: 'center', md: 'flex-start' }}
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}>
                                            <Typography style={{
                                                ...theme.typography.h4,
                                                fontWeight: 'bold',
                                                color: theme.palette.text.primary,
                                            }}
                                            >
                                                Certification
                                            </Typography>
                                            <List>
                                                {doctorDetails.certifications.map((item, index) => (
                                                    <Grid item key={item.issueDate + index}>
                                                        <ListItem style={{
                                                            ...theme.typography.largerButtonText,
                                                            color: theme.palette.text.primary,
                                                        }}
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'flex-start',
                                                                padding: '0px'
                                                            }}
                                                        >
                                                            {item.title}
                                                        </ListItem>
                                                        <ListItem alignItems={'center'}
                                                            sx={{
                                                                ...theme.typography.body2,
                                                                color: theme.palette.text.primary,
                                                                padding: '0px'
                                                            }}>
                                                            {item.granter}
                                                        </ListItem>
                                                        <ListItem alignItems={'center'}
                                                            style={{
                                                                ...theme.typography.body2,
                                                                color: theme.palette.text.primary,
                                                                padding: '0px'
                                                            }}>
                                                            {item.issueDate.replace(/T.*Z/, '')}
                                                        </ListItem>
                                                    </Grid>
                                                ))}
                                            </List>
                                        </Grid>
                                    </Grid>
                                    }
                                    {/* doctor's contacts */}
                                    <Grid container item xs={12} style={{ marginTop: '30px' }} alignItems={{ xs: 'center', md: 'flex-start' }} justifyContent={{ xs: 'center', md: 'flex-start' }}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}>
                                        <Typography style={{
                                            ...theme.typography.h4,
                                            fontWeight: 'bold',
                                            color: theme.palette.text.primary,
                                        }}
                                        >
                                            Contact information
                                        </Typography>
                                        <List>
                                            <ListItem sx={{
                                                ...theme.typography.body2,
                                                color: theme.palette.text.primary,
                                                padding: 0
                                            }}
                                            >
                                                <ListItemIcon><PhoneAndroidIcon /></ListItemIcon>
                                                <ListItemText primary={doctorDetails.clinics[0].phone.mobile} />
                                            </ListItem>
                                            {doctorDetails.clinics[0].phone.landline && <ListItem sx={{
                                                ...theme.typography.body2,
                                                color: theme.palette.text.primary,
                                                padding: 0
                                            }}
                                            >
                                                <ListItemIcon><CallIcon /></ListItemIcon>
                                                <ListItemText primary={doctorDetails.clinics[0].phone.landline} />
                                            </ListItem>}
                                            <ListItem sx={{
                                                ...theme.typography.body2,
                                                color: theme.palette.text.primary,
                                                padding: 0
                                            }}
                                            >
                                                <ListItemIcon><EmailIcon /></ListItemIcon>
                                                <ListItemText primary={doctorDetails.email} />
                                            </ListItem>
                                        </List>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* clinic's location section */}
                            <Grid container
                                justifyContent={'center'}
                                sx={{
                                    backgroundColor: theme.palette.secondaryBg.main,
                                    marginTop: '100px',
                                    padding: { xs: '30px 0', lg: '0' }
                                }}>
                                <Grid container item xs={12} lg={6} flexDirection='column' alignItems='center' justifyContent='center'>
                                    <Typography style={{
                                        ...theme.typography.h4,
                                        fontWeight: 'bold',
                                        color: theme.palette.text.primary,
                                    }}
                                    >
                                        Clinic's Location
                                    </Typography>
                                    <Typography style={{
                                        ...theme.typography.body2,
                                        color: theme.palette.text.primary,
                                    }}
                                    >
                                        {`${doctorDetails.clinics[0].address.buildingNo} ${doctorDetails.clinics[0].address.streetName} - ${doctorDetails.clinics[0].address.city}, ${doctorDetails.clinics[0].address.governorate}, ${doctorDetails.clinics[0].address.country}`}
                                    </Typography>
                                </Grid>

                                <Grid container item xs={12} sm={10} md={6} lg={5} style={{ border: "5px solid white", }} justifyContent='flex-start'
                                    sx={{
                                        flexDirection: 'column',
                                        marginY: "25px",
                                        height: "450px",
                                        borderRadius: "10px"
                                    }}>
                                    {doctorDetails.clinics.map((item, index) =>
                                        <Map key={item.geoLocation.latitude + item.geoLocation.longitude} centerCoordinates={{ lat: parseFloat(item.geoLocation.latitude), lng: parseFloat(item.geoLocation.longitude) }} />)}

                                </Grid>

                            </Grid>

                            {/* Booking information */}
                            <Grid container paddingY='50px' justifyContent='center' ref={bookingSectionRef}>
                                <Grid container item xs={12} md={6} flexDirection='column' justifyContent='center' alignItems='center'>
                                    <Grid item>
                                        <Typography style={{
                                            ...theme.typography.h4,
                                            fontWeight: 'bold',
                                            color: theme.palette.text.primary,
                                        }}
                                        >
                                            Booking information
                                        </Typography>
                                    </Grid>
                                    <Grid container item justifyContent='space-evenly' alignItems='center' marginTop='50px'>
                                        <Grid
                                            item
                                            sx={{
                                                backgroundColor: "white",
                                                borderRadius: "10px",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                boxShadow: theme.shadows[5],
                                                width: '150px',
                                                height: '150px',
                                                margin: '25px'
                                            }}
                                        >
                                            <Grid style={{
                                                textAlign: 'center',
                                                ...theme.typography.body1,
                                                backgroundColor: theme.palette.highlight.main,
                                                color: 'white',
                                                width: "100%",
                                                padding: "10px 0px",
                                                borderTopLeftRadius: "10px",
                                                borderTopRightRadius: "10px"
                                            }}
                                            >
                                                Cost
                                            </Grid>
                                            <Typography style={{
                                                ...theme.typography.body2,
                                            }} sx={{ paddingX: "30px", paddingY: "30px", textAlign: "center" }}>{doctorDetails.clinics[0].fees} EGP</Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            sx={{
                                                backgroundColor: "white",
                                                borderRadius: "10px",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                boxShadow: theme.shadows[5],
                                                width: '150px',
                                                height: '150px',
                                                margin: '25px'
                                            }}
                                        >
                                            <Grid style={{
                                                textAlign: 'center',
                                                ...theme.typography.body1,
                                                backgroundColor: theme.palette.highlight.main,
                                                color: 'white',
                                                width: "100%",
                                                padding: "10px 0px",
                                                borderTopLeftRadius: "10px",
                                                borderTopRightRadius: "10px"
                                            }}
                                            >
                                                Method
                                            </Grid>
                                            <Typography style={{
                                                ...theme.typography.body2,
                                            }} sx={{ paddingX: "30px", paddingY: "30px", textAlign: "center" }}>
                                                Cash
                                            </Typography>
                                        </Grid>
                                        {doctorDetails.appointments && doctorDetails.appointments.length > 0 && <Grid
                                            item
                                            sx={{
                                                backgroundColor: "white",
                                                borderRadius: "10px",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                boxShadow: theme.shadows[5],
                                                width: '150px',
                                                height: '150px',
                                                margin: '25px'
                                            }}
                                        >
                                            <Grid style={{
                                                textAlign: 'center',
                                                ...theme.typography.body1,
                                                backgroundColor: theme.palette.highlight.main,
                                                color: 'white',
                                                width: "100%",
                                                padding: "10px 0px",
                                                borderTopLeftRadius: "10px",
                                                borderTopRightRadius: "10px"
                                            }}
                                            >
                                                Waiting period
                                            </Grid>
                                            <Typography style={{
                                                ...theme.typography.body2,
                                            }} sx={{ paddingX: "30px", paddingY: "30px", textAlign: "center" }}>
                                                {doctorDetails.appointments ? doctorDetails.appointments[0].time.duration : '-'} mins
                                            </Typography>
                                        </Grid>}
                                        {doctorDetails.appointments && doctorDetails.appointments.length > 0 && <Grid
                                            item
                                            sx={{
                                                backgroundColor: "white",
                                                borderRadius: "10px",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                boxShadow: theme.shadows[5],
                                                width: '150px',
                                                height: '150px',
                                                margin: '25px'
                                            }}
                                        >
                                            <Grid style={{
                                                textAlign: 'center',
                                                ...theme.typography.body1,
                                                backgroundColor: theme.palette.highlight.main,
                                                color: 'white',
                                                width: "100%",
                                                padding: "10px 0px",
                                                borderTopLeftRadius: "10px",
                                                borderTopRightRadius: "10px"
                                            }}
                                            >
                                                Appointments
                                            </Grid>
                                            <Typography style={{
                                                ...theme.typography.body2,
                                            }} sx={{ paddingX: "30px", paddingY: "30px", textAlign: "center" }}>{doctorDetails.appointments ? doctorDetails.appointments.length : 0}</Typography>
                                        </Grid>}
                                    </Grid>
                                    <Grid
                                        item
                                        marginTop='50px'
                                    >
                                        <CustomFormButton variant='contained' onClick={() => setOpenBookingDrawer(!openBookingDrawer)} fullWidth>
                                            Booking details
                                        </CustomFormButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <BookingDrawer setDoctorDetails={(updatedDoctorData) => setDoctorDetails(updatedDoctorData)} doctorDetails={doctorDetails} appointments={doctorDetails.appointments ? doctorDetails.appointments : []} openDrawer={openBookingDrawer} setOpenDrawer={(toggle) => setOpenBookingDrawer(toggle)} />
                        </>
                    </Grid>
                    :
                    <Grid container minHeight='100vh' justifyContent='center' alignItems='center'>
                        <CircularProgress sx={{
                            color: theme.palette.highlight.main
                        }} />
                    </Grid>
            }
        </>
    )

}

export default DoctorDetails


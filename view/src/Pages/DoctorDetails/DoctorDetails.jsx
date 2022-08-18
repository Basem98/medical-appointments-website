import { Grid, Link, Typography, useMediaQuery, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CustomFormButton from '../../Components/CustomFormButton/CustomFormButton';
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import { useTheme } from '@mui/material';
import React from 'react'
import Map from '../../Components/Map/Map';
import CallIcon from '@mui/icons-material/Call';
import { useLocation } from 'react-router-dom';


function DoctorDetails() {
    const Theme = useTheme();
    const {state} = useLocation();
    const doctorDetails = state.doctorData;
    console.log(doctorDetails);

    const isTablet = useMediaQuery((Theme) => Theme.breakpoints.down("md"))
    return (
        <>
            <Grid
                container
                justifyContent={'center'}
                style={{
                    background: Theme.palette.linearHeroBg.main,
                    width: "100%",
                }}
            >
                {/* Hero section */}
                <Grid container item maxWidth="md" style={{ marginTop: 20 }} justifyContent='space-between'>
                    {/* Photo grid */}
                    <Grid item xs={12} md={6} style={{
                        marginBottom: "20px",
                        display: 'flex',
                        justifyContent: isTablet ? 'center' : 'flex-start',
                        textAlign: 'center'
                    }}
                    >
                        {/* Doctor's pic here */}
                        <img
                            src={doctorDetails.profilePicture}
                            alt="doctorImage"
                            style={{
                                width: "200px",
                                 height: "200px",
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: 'solid white 5px',
                                textAlign: 'center',
                            }}
                        />
                    </Grid>
                    {/* Hero's section grid */}
                    <Grid item xs={12} md={6} >
                        <Typography style={{
                            ...Theme.typography.h2,
                            color: Theme.palette.text.primary,
                            textAlign: 'center'

                        }}>
                            {doctorDetails.firstName} {doctorDetails.lastName}
                        </Typography>
                        <Typography style={{
                            ...Theme.typography.h2,
                            color: Theme.palette.text.primary,
                            textAlign: 'center'
                        }}>
                            {doctorDetails.specialization}
                        </Typography>
                        <Grid
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <StarIcon sx={{ color: Theme.palette.ratingGold.main }} />
                            <StarIcon sx={{ color: Theme.palette.ratingGold.main }} />
                            <StarIcon sx={{ color: Theme.palette.ratingGold.main }} />
                            <StarIcon sx={{ color: Theme.palette.ratingGold.main }} />
                            <StarHalfIcon sx={{ color: Theme.palette.ratingGold.main }} />

                        </Grid>
                        <Grid
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                marginBottom: "25px"
                            }}>
                            <Link href="#bookingSection" underline="none" color="white">
                                <CustomFormButton variant='contained' style={{ ...Theme.typography.body1 }} >

                                    Booking information

                                </CustomFormButton>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/* Certification section */}
            <Grid container justifyContent={'center'} style={{ width: "100%" }}>
                <Grid container item maxWidth="md" style={{ marginTop: 20 }} justifyContent='flex-start'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                    <Typography style={{
                        ...Theme.typography.h2,
                        color: Theme.palette.text.primary,
                    }}
                    >
                        Certification
                    </Typography>
                    <List>
                        {doctorDetails.certifications.map(item => (
                            <>
                                <ListItem style={{
                                    ...Theme.typography.largerButtonText,
                                    color: Theme.palette.text.primary,
                                }}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        paddingBottom: "0px"
                                    }}
                                >
                                    {item.title}
                                </ListItem>
                                <ListItem alignItems={'center'}
                                    style={{
                                        ...Theme.typography.body2,
                                        color: Theme.palette.text.primary,
                                    }}
                                    sx={{
                                        paddingTop: "0px",
                                        paddingBottom: "0px"
                                    }}>
                                    {item.granter}
                                </ListItem>
                                <ListItem alignItems={'center'}
                                    style={{
                                        ...Theme.typography.body2,
                                        color: Theme.palette.highlight.main,
                                    }}
                                    sx={{
                                        paddingTop: "0px"
                                    }}>
                                    {item.issueDate}
                                </ListItem>
                            </>
                        ))}
                    </List>
                </Grid>
            </Grid>
            {/* the Education section */}
            <Grid container justifyContent={'center'} style={{ width: "100%" }}>
                <Grid container item maxWidth="md" style={{ marginTop: 20 }} justifyContent='flex-start'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                    <Typography style={{
                        ...Theme.typography.h2,
                        color: Theme.palette.text.primary,
                    }}
                    >
                        Education
                    </Typography>
                    <List>
                        {doctorDetails.education.map(item => (
                            <>
                                <ListItem style={{
                                    ...Theme.typography.largerButtonText,
                                    color: Theme.palette.text.primary,
                                }}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        paddingBottom: "0px"
                                    }}
                                >
                                    {item.degeree}
                                </ListItem>
                                <ListItem alignItems={'center'}
                                    style={{
                                        ...Theme.typography.body2,
                                        color: Theme.palette.text.primary,
                                    }}
                                    sx={{
                                        paddingTop: "0px",
                                        paddingBottom: "0px"
                                    }}>
                                    {item.granter}
                                </ListItem>
                                <ListItem alignItems={'center'}
                                    style={{
                                        ...Theme.typography.body2,
                                        color: Theme.palette.highlight.main,
                                    }}
                                    sx={{
                                        paddingTop: "0px"
                                    }}>
                                    {item.issueDate}
                                </ListItem>
                            </>
                        ))}
                    </List>
                </Grid>
            </Grid>
            {/* clinic's location section */}
            <Grid container
                justifyContent={'center'}
                style={{
                    width: "100%",
                    backgroundColor: Theme.palette.secondaryBg.main
                }}>
                <Grid container item maxWidth="md" style={{ marginTop: 20, textAlign: 'start' }}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                    <Typography style={{
                        ...Theme.typography.h2,
                        color: Theme.palette.text.primary,
                    }}
                    >
                        Clinic's Location
                    </Typography>
                </Grid>
                <Grid container item maxWidth="md" style={{ border: "5px solid white", }} justifyContent='flex-start'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginY: "25px",
                        height: "450px",
                        width: isTablet ? "90%" : null,
                        borderRadius: "10px"
                    }}>
                    {doctorDetails.clinics.map((item) =>
                        <Map centerCoordinates={{ lat: parseFloat(item.geoLocation.latitude), lng: parseFloat(item.geoLocation.longitude) }} />)}

                </Grid>

            </Grid>
            {/* doctor's contacts */}
            <Grid container justifyContent={'center'} style={{ width: "100%" }}>
                <Grid container item maxWidth="md" style={{ marginTop: 20 }} justifyContent='flex-start'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                    <Typography style={{
                        ...Theme.typography.h2,
                        color: Theme.palette.text.primary,
                    }}
                    >
                        Contact information
                    </Typography>
                    <List>


                        <ListItem style={{
                            ...Theme.typography.body2,
                            color: Theme.palette.text.primary,
                        }}
                        >
                            <ListItemIcon><PhoneAndroidIcon /></ListItemIcon>
                            <ListItemText primary={doctorDetails.phoneNumber} />
                        </ListItem>
                        <ListItem style={{
                            ...Theme.typography.body2,
                            color: Theme.palette.text.primary,
                        }}
                        >
                            <ListItemIcon><CallIcon /></ListItemIcon>
                            <ListItemText primary={doctorDetails.clinics.map((item) => item.phone.landline)} />
                        </ListItem>
                        <ListItem style={{
                            ...Theme.typography.body2,
                            color: Theme.palette.text.primary,
                        }}
                        >
                            <ListItemIcon><EmailIcon /></ListItemIcon>
                            <ListItemText primary={doctorDetails.email} />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
            {/* Booking information */}
            <Grid container
                justifyContent={'center'}
                style={{
                    width: "100%",
                }}>
                <Grid container item maxWidth="md" style={{ marginTop: 30 }} justifyContent='space-between'
                    sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                    <Grid xs={12}>
                        <Typography style={{
                            ...Theme.typography.h2,
                            color: Theme.palette.text.primary,
                        }}
                        >
                            Booking information
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={3}
                        sx={{
                            backgroundColor: "white",
                            marginTop: "20px",
                            borderRadius: "10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            boxShadow: "0px 4px 4px rgba(0, 0, 0, .25)",
                        }}
                    >
                        <Grid style={{
                            textAlign: 'center',
                            ...Theme.typography.body1,
                            backgroundColor: Theme.palette.highlight.main,
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
                            ...Theme.typography.body2,
                        }} sx={{ paddingX: "30px", paddingY: "30px", textAlign: "center" }}>{doctorDetails.clinics[0].fees} E.G.P</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        sx={{
                            backgroundColor: "white",
                            marginTop: "20px",
                            borderRadius: "10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            boxShadow: "0px 4px 4px rgba(0, 0, 0, .25)",
                        }}
                    >
                        <Grid style={{
                            textAlign: 'center',
                            ...Theme.typography.body1,
                            backgroundColor: Theme.palette.highlight.main,
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
                            ...Theme.typography.body2,
                        }} sx={{ paddingX: "30px", paddingY: "30px", textAlign: "center" }}>
                            Cash
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        sx={{
                            backgroundColor: "white",
                            marginTop: "20px",
                            borderRadius: "10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            boxShadow: "0px 4px 4px rgba(0, 0, 0, .25)",
                        }}
                    >
                        <Grid style={{
                            textAlign: 'center',
                            ...Theme.typography.body1,
                            backgroundColor: Theme.palette.highlight.main,
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
                            ...Theme.typography.body2,
                        }} sx={{ paddingX: "30px", paddingY: "30px", textAlign: "center" }}>
                            10 mins.
                        </Typography>
                    </Grid>

                </Grid>

                <Grid
                    item
                    xs={4}

                    style={{
                        textAlign: "center",
                        marginTop: "20px",
                        width: "100%",
                        marginBottom: "20px",
                        display: 'flex',
                        justifyContent: 'center',
                        textAlign: 'center'
                    }}
                    name={"bookingSection"}>
                    <CustomFormButton variant='contained' style={{ ...Theme.typography.largerButtonText }} fullWidth>
                        Booking details
                    </CustomFormButton>
                    <a name="bookingSection"></a>
                </Grid>

            </Grid>
        </>
    )
}

export default DoctorDetails


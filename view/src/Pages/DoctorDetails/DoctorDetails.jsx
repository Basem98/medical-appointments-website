import { Grid, Link, Typography, useMediaQuery, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CustomFormButton from '../../Components/CustomFormButton/CustomFormButton';
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import drImage from "../../Assets/Images/HeroBg1.png";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import { useTheme } from '@mui/material';
import React from 'react'
import Map from '../../Components/Map/Map';
import CallIcon from '@mui/icons-material/Call';

const doctorDetails = {
    firstName:"Hussien",
    lastName:"Hassan",
    email:"HussienHassan@gmail.com",
    phoneNumber:+201001234567,
    appointments :[{
        id:69,
        date: new Date().getDate()
    }],
    specialization:"Surgery",
    experiences:[{
        title:"experience title",
        workplace:"experience work place",
        location:{
            city:"Alexandria",
            country:"Egypt"
        },
        startDate: new Date(2022,7,4),
        endDate: new Date(2022,8,21),
        isCurrentlyWorking:false
    }],
    education:[{
        degeree:"Ligma",
        granter:"balls",
        issueDate: new Date(2019,8,5).toLocaleDateString()
    }],
    certifications:[{
        title:"zuck",
        granter:"deez nuts",
        issueDate: new Date(2009,8,5).toLocaleDateString()
    }],
    clinics:[{
        name:"Abo hamada",
        address:{
            city:"Monufia",
            governrate:"Sheben",
            conutry:"Libya",
            buildingNo:420,
            streetName:"Kofta",
            postalCode:95
        },
        geoLocation:{
            longitude:"31.022031",
            latitude:"30.0788637"
        },
        phone:{
            mobile:"01222334455",
            landline:"0222334455"
        },
        fees:600
    }],
    rating:4.5,
    profilePicture:"https://img.freepik.com/free-photo/cat-white-background_155003-15381.jpg?w=2000",
    professionalLicense:"../../Assets/Images/HeroBg1.png",
    isVerified:"false",
    isAccepted:"false"
}


function DoctorDetails() {
    const Theme = useTheme();
    const docItems = [
        {
            degree: "Fellow of the american university",
            university: "University of colorado",
            date: "May 2019 - June 2021"
        }
    ]
    const docContacts = [
        {
            phone: "01004206969",
            mail: "bruh@gmail.com",
            website: "www.doctor.com"
        }
    ]
    const isTablet = useMediaQuery((Theme)=>Theme.breakpoints.down("md"))
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
                {/* <Grid item xs={12}>
                    <NavBar />
                </Grid> */}
                <Grid container item maxWidth="md" style={{ marginTop: 20 }} justifyContent='space-between'>
                    {/* Photo grid */}
                    <Grid item xs={12} md={6} style={{
                        marginBottom: "20px",
                        display:'flex',
                        justifyContent:isTablet?'center':'flex-start',
                        textAlign: 'center'
                    }}
                    >
                        {/* Doctor's pic here */}
                        <img
                            src={doctorDetails.profilePicture}
                            alt="doctorImage"
                            style={{ maxWidth: "195px", maxHeight: "195px",
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
                <Grid container item maxWidth="md" style={{border:"5px solid white",}}  justifyContent='flex-start'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginY:"25px",
                        height:"450px",
                        width:isTablet?"90%":null,
                        borderRadius:"10px"
                    }}>
                        {doctorDetails.clinics.map((item)=>
                        <Map centerCoordinates={{lat:parseFloat(item.geoLocation.latitude),lng:parseFloat(item.geoLocation.longitude)}} />)}
                    
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
                                    <ListItemText primary={doctorDetails.clinics.map((item)=>item.phone.landline)} />
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
                    
                    style={{ textAlign: "center",
                     marginTop: "20px",
                      width: "100%",
                       marginBottom: "20px",
                       display:'flex',
                       justifyContent:'center',
                       textAlign: 'center' }} 
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


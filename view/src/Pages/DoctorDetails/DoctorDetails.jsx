import { Grid, Link, Typography, useMediaQuery, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CustomFormButton from '../../Components/CustomFormButton/CustomFormButton';
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import drImage from "../../Assets/Images/HeroBg1.png";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import { useTheme } from '@mui/material';
import NavBar from '../Home/NavBar';
import React from 'react'

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
    const isMobile = useMediaQuery((Theme) => Theme.breakpoints.down("sm"));
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
                <Grid item xs={12}>
                    <NavBar />
                </Grid>
                <Grid container item maxWidth="md" style={{ marginTop: 20 }} justifyContent='space-between'>
                    {/* Photo grid */}
                    <Grid item xs={12} md={5} style={{
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: 'solid white 5px',
                        textAlign: 'center',
                        maxWidth: "195px",
                        maxHeight: "195px",
                        marginBottom: "20px"
                    }}
                    >
                        {/* Doctor's pic here */}
                        <img
                            src={drImage}
                            alt="doctorImage"
                            style={{ maxWidth: "195px", maxHeight: "195px" }}
                        />
                    </Grid>
                    {/* Hero's section grid */}
                    <Grid item xs={12} md={5} alignSelf='center'>
                        <Typography style={{
                            ...Theme.typography.h1,
                            color: Theme.palette.text.primary
                        }}>
                            Doctor's name
                        </Typography>
                        <Typography style={{
                            ...Theme.typography.h2,
                            color: Theme.palette.text.primary,
                            textAlign: 'center'
                        }}>
                            Spezialization
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
                            }}>
                            <CustomFormButton variant='contained' style={{...Theme.typography.body1}}>
                                <Link href="#bookingSection" underline="none" color="white">
                                    Booking information
                                </Link>
                            </CustomFormButton>
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
                        {docItems.map(item => (
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
                                    {item.degree}
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
                                    {item.university}
                                </ListItem>
                                <ListItem alignItems={'center'}
                                    style={{
                                        ...Theme.typography.body2,
                                        color: Theme.palette.highlight.main,
                                    }}
                                    sx={{
                                        paddingTop: "0px"
                                    }}>
                                    {item.date}
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
                        {docItems.map(item => (
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
                                    {item.degree}
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
                                    {item.university}
                                </ListItem>
                                <ListItem alignItems={'center'}
                                    style={{
                                        ...Theme.typography.body2,
                                        color: Theme.palette.highlight.main,
                                    }}
                                    sx={{
                                        paddingTop: "0px"
                                    }}>
                                    {item.date}
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
                        Clinic's Location
                    </Typography>
                </Grid>
                <Grid container item maxWidth="md" style={{ marginTop: 20, textAlign: 'center' }}
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
            </Grid>
            {/* doctr's contacts */}
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
                        {docContacts.map(item => (
                            <>
                            
                                <ListItem style={{
                                    ...Theme.typography.body2,
                                    color: Theme.palette.text.primary,
                                }}
                                >
                                    <ListItemIcon><PhoneAndroidIcon/></ListItemIcon>
                            <ListItemText primary={item.phone}/>
                                </ListItem>
                                <ListItem style={{
                                    ...Theme.typography.body2,
                                    color: Theme.palette.text.primary,
                                }}
                                >
                                    <ListItemIcon><EmailIcon/></ListItemIcon>
                            <ListItemText primary={item.mail}/>
                                </ListItem>
                                <ListItem style={{
                                    ...Theme.typography.body2,
                                    color: Theme.palette.text.primary,
                                }}
                                >
                                    <ListItemIcon><PublicIcon/></ListItemIcon>
                            <ListItemText primary={item.website}/>
                                </ListItem>
                            </>
                        ))}
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
                        }} sx={{ paddingX: "30px", paddingY: "30px", textAlign: "center" }}>300 E.G.P</Typography>
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
                            Cash or visa
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
                    <Grid item xs={12} alignSelf='center' style={{ textAlign: "center", marginTop: "20px", width: "100%", marginBottom: "20px" }} name={"bookingSection"}>
                        <CustomFormButton variant='contained' style={{ ...Theme.typography.largerButtonText, width: "35%" }} fullWidth>
                            Book now
                        </CustomFormButton>
                        <a name="bookingSection"></a>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default DoctorDetails


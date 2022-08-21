import { Grid, Typography, useMediaQuery } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import bruh from '../../Assets/Images/PXL_20220809_071909192.PORTRAIT.jpg'
import bruh_2 from '../../Assets/Images/Area51.jpg'
import Basem from '../../Assets/Images/Basemtany.jpg'
import Okasha from '../../Assets/Images/okasha.jpg'
import Tohamy from '../../Assets/Images/Tohamy1.jpg'
import Belal from '../../Assets/Images/belal1.JPG'
import React from 'react'
import { useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

var directions = [
    CardLeftComp, CardRightComp
]


function CardLeftComp() {
    const theme = useTheme()
    const isTablet = useMediaQuery(theme.breakpoints.up('md'))
    
    return (
        <>
            <Grid container>
                <Grid container item xs={12}  >
                {isTablet && <Grid container item justifyContent={'center'} alignItems={'center'} xs={4} alignSelf={'center'}
                    >
                        <Typography sx={{ ...theme.typography.h2 }} color="text.secondary" gutterBottom textAlign={'center'}>
                            Meet the creators

                        </Typography>
                        <LaptopMacIcon sx={{ fontSize: 38, color: "#666666", marginLeft: 2 }} />

                    </Grid>}
                    <Grid container item xs={12} md={8}>
                        <img src={bruh} width="100%" height={isTablet?"583px":"400px"} />
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

function CardRightComp() {
    const theme = useTheme()
    const isTablet = useMediaQuery(theme.breakpoints.up('md'))
    return (
        <>
            <Grid container>
                <Grid container item xs={12}>
                    <Grid container item xs={12} md={8}>
                        <img src={bruh_2} width="100%" height={isTablet?"583px":"400px"} />
                    </Grid>
                    {isTablet &&
                    <Grid container item justifyContent={'center'} alignItems={'center'} xs={4} alignSelf={'center'}
                    >
                        <Typography sx={{ ...theme.typography.h2 }} color="text.secondary" gutterBottom textAlign={'center'} >
                            Straight out of ITI

                        </Typography>
                        <AccountBalanceIcon sx={{ fontSize: 38, color: "#666666", marginLeft: 2, marginBottom: "9px" }} />

                    </Grid> }
                    

                </Grid>
            </Grid>

        </>
    )
}



function AboutUs() {
    const theme = useTheme()
    const isTablet = useMediaQuery(theme.breakpoints.down('md'))
    return (
        <>
            <Grid container justifyContent={'center'} >
                <Carousel sx={{ width: "100%" }}
                    indicatorContainerProps={{
                        style: {
                            display:"none"
                        }
                    }}
                    interval={3000}
                    animation={"slide"}
                    duration={1000}>
                    {
                        directions.map((dir) => dir())
                    }

                </Carousel>
            </Grid>

            <Grid container justifyContent={'center'} sx={{ backgroundColor: theme.palette.highlight.main }}
                alignItems={'center'}>
                <Grid item xs={12} md={4}
                 sx={{ display: 'flex',justifyContent:isTablet?'center':null,marginTop:isTablet?"15px":null }}>
                    <Typography sx={{ ...theme.typography.h2, color: "white" }} >
                        Who are we?
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid marginY={4} sx={{ border: "2px solid white", borderRadius: "5px",width:isTablet?"50%":null }}>
                        <Typography sx={{ ...theme.typography.modalSmallText, color: "white", padding: "5px" }} >
                            A team of four programers graduated from ITI, track ITI/AAIB academy with different background that have been put in one atmosphere ,
                            integrating their knowlege to come out with this product.
                            <br />
                            Made possible with MERN stack accompined with MUi
                        </Typography>
                    </Grid>

                </Grid>

            </Grid>

            {/* Basem */}
            <Grid container justifyContent={'center'} alignItems={'center'} marginTop={12}>
                <Grid container item justifyContent={'center'} sx={{ width: '75%' }}>
                    <Grid item sx={{
                        display: 'flex',
                        border: `3px solid ${theme.palette.highlight.main}`,
                        borderRadius: 5
                    }}
                        xs={12} >
                        <Grid container item  xs={12} md={4} sx={{
                            marginY: "5px",
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            textAlign: 'center'
                        }}
                            alignItems={'center'}
                        >

                            <img
                                src={Basem}
                                alt="doctorImage"
                                style={{
                                    maxHeight: "150px",
                                    borderRadius: '50%',
                                    overflow: 'hidden',

                                    textAlign: 'center',
                                }}
                            />
                            <Grid item >
                                <Typography  >
                                    Basem Mostafa
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={8} sx={{ display: 'flex' }} alignItems={'center'}>
                            <Typography sx={{ fontFamily: "'Lobster', cursive", fontWeight: "normal" }}>
                                "You get to decide where your time goes. You can either spend it moving forward, or you can spend it putting out fires. You decide. And if you don’t decide, others will decide for you."
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
             {/* Belal */}
             <Grid container justifyContent={'center'} alignItems={'center'} marginTop={12}>
                <Grid container item justifyContent={'center'} sx={{ width: '75%' }}>
                    <Grid item sx={{
                        display: 'flex',
                        border: `3px solid ${theme.palette.highlight.main}`,
                        borderRadius: 5
                    }}
                        xs={12} >
                        <Grid container item  xs={12} md={4} sx={{
                            marginY: "5px",
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            textAlign: 'center'
                        }}
                            alignItems={'center'}
                        >

                            <img
                                src={Belal}
                                alt="doctorImage"
                                style={{
                                    maxHeight: "150px",
                                    borderRadius: '50%',
                                    overflow: 'hidden',

                                    textAlign: 'center',
                                }}
                            />
                            <Grid item >
                                <Typography  >
                                    Belal Mosaad
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={8} sx={{ display: 'flex' }} alignItems={'center'}>
                            <Typography sx={{ fontFamily: "'Lobster', cursive", fontWeight: "normal" }}>
                                "All who have accomplished great things have had a great aim, have fixed their gaze on a goal which was high, one which sometimes seemed impossible."
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/* Tohamy */}
            <Grid container justifyContent={'center'} alignItems={'center'} marginTop={12}>
                <Grid container item justifyContent={'center'} sx={{ width: '75%' }}>
                    <Grid  item sx={{
                        display: 'flex',
                        border: `3px solid ${theme.palette.highlight.main}`,
                        borderRadius: 5
                    }}
                    xs={12}
                    >
                        <Grid container item xs={12} md={4} sx={{
                            marginY: "5px",
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            textAlign: 'center'
                        }}
                            alignItems={'center'}
                        >

                            <img
                                src={Tohamy}
                                alt="doctorImage"
                                style={{
                                    maxHeight: "150px",
                                    borderRadius: '50%',
                                    overflow: 'hidden',

                                    textAlign: 'center',
                                }}
                            />
                            <Grid item >
                                <Typography  >
                                   Ahmed Mostafa
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={8} sx={{ display: 'flex' }} alignItems={'center'}>
                            <Typography sx={{ fontFamily: "'Lobster', cursive", fontWeight: "normal" }}>
                                "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking"
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/* okasha */}
            <Grid container justifyContent={'center'} alignItems={'center'} marginY={12}>
                <Grid container item justifyContent={'center'} sx={{ width: '75%' }}>
                    <Grid item sx={{
                        display: 'flex',
                        border: `3px solid ${theme.palette.highlight.main}`,
                        borderRadius: 5
                    }}
                        xs={12} >
                        <Grid container item  xs={12} md={4} sx={{
                            marginY: "5px",
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            textAlign: 'center'
                        }}
                            alignItems={'center'}
                        >

                            <img
                                src={Okasha}
                                alt="doctorImage"
                                style={{
                                    maxHeight: "150px",
                                    borderRadius: '50%',
                                    overflow: 'hidden',

                                    textAlign: 'center',
                                }}
                            />
                            <Grid item >
                                <Typography  >
                                    Mohamed Okasha
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={8} sx={{ display: 'flex' }} alignItems={'center'}>
                            <Typography sx={{ fontFamily: "'Lobster', cursive", fontWeight: "normal" }}>
                                " if one advances confidently in the direction of his dreams, and endeavors to live the life which he has imagined, he will meet with a success unexpected in common hours."
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>


        </>
    )
}

export default AboutUs
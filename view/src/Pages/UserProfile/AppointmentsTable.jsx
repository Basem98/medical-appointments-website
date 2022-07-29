import React from "react";
import { Card, CardActions, CardContent, Grid, Typography, Link, Button } from "@mui/material";
import { useTheme } from "@mui/material";
import moment from "moment";

const AppointmentsTable = ({ appointments }) => {
    const theme = useTheme();
    return (
        <Grid
            container
            spacing={6}
            marginTop={2}
            justifyContent="center"
        >
            {
                appointments?.map((appointment, index) => {
                    return (
                        <Grid item key={index} xs={12} md={10}>
                            <Card sx={{ boxShadow: `1px 1px 1px 1px ${theme.palette.highlight.main}` }}>
                                <Grid container>
                                    <Grid item width="70%">
                                        <CardContent>
                                            <Grid>
                                                <Typography display="inline" variant="h4">
                                                    {moment(appointment.date.split('T')[0]).format('dddd, MMMM Do YYYY')}
                                                </Typography>
                                                <Typography
                                                    display="inline"
                                                    color={theme.palette.grey[500]}
                                                > at {appointment.time.hour}
                                                    : {appointment.time.minute}
                                                </Typography>
                                            </Grid>
                                            <Typography
                                                variant="body2"
                                                color={theme.palette.grey[500]}
                                            >
                                                Lasts for {appointment.time.duration} minutes
                                            </Typography>
                                            <Typography
                                                color={theme.palette.grey[500]}
                                                marginTop={3}
                                            >
                                                {
                                                    moment(appointment.date).fromNow()
                                                }
                                            </Typography>
                                            <Typography
                                                marginTop={10}
                                            >
                                                <>With </>
                                                <Link
                                                    sx={{
                                                        color: theme.palette.highlight.main,
                                                        '&:hover': {
                                                            cursor: 'pointer'
                                                        }
                                                    }}
                                                    href='#'
                                                >Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}
                                                </Link>
                                            </Typography>
                                        </CardContent>
                                    </Grid>
                                    <Grid item alignSelf="center" width="25%">
                                        <CardActions>
                                            <Button
                                                sx={{
                                                    backgroundColor: theme.palette.highlight.main,
                                                    fontWeight: 'bold',
                                                    padding: "15px",
                                                    borderRadius: "20px",
                                                    width: "100%",
                                                    ':hover': {
                                                        backgroundColor: theme.palette.highlight.main,
                                                        opacity: 0.8,
                                                        transform: 'scale(1.05)'
                                                    }
                                                }}
                                                variant="contained"
                                            >
                                                See Details
                                            </Button>
                                        </CardActions>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    );
                })
            }
        </Grid>
    );
}

export default AppointmentsTable;
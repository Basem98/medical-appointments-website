import React from "react";
import { Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import {useTheme }from "@mui/material";
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
                    console.log(appointment.doctor.firstName)
                    return (
                        <Grid item key={index} xs={12} sm={10}>
                            <Card sx={{boxShadow: `1px 1px 1px 1px ${theme.palette.highlight.main}`}}>
                                <CardContent>
                                    <Typography variant="body1">{appointment.date}</Typography>
                                </CardContent>

                                <CardActions>
                                    
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })
            }
        </Grid>
    );


}

export default AppointmentsTable;
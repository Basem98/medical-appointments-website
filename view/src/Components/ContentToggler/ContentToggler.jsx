import { Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { useState } from "react";
import AppointmentsTable from "../AppointmentsTable/AppointmentsTable";

const ContentToggler = ({ titles, data, role }) => {
    const theme = useTheme();
    const selectedColor = theme.palette.highlight.main;
    const unselectedColor = theme.palette.grey[500];
    const selectedStyle = {
        borderBottom: `2px solid ${selectedColor}`,
        padding: "20px",
        "&:hover": {
            cursor: "pointer"
        },
        textAlign: 'center'
    }
    const unselectedStyle = {
        borderBottom: `2px solid ${unselectedColor}`,
        padding: "20px",
        "&:hover": {
            cursor: "pointer"
        },
        textAlign: 'center'
    }
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleSelected = (index) => {
        setSelectedIndex(index);
    }

    return (
        <>
            <Grid container spacing={2} justifyContent="center">
                {
                    titles.map((item, index) => {
                        return index === selectedIndex ?

                            <Grid
                                item
                                key={item}
                                sx={{ color: selectedColor }}
                                onClick={() => { handleSelected(index) }}
                                xs={5}
                            >
                                <Typography sx={selectedStyle}>
                                    {item}
                                </Typography>
                            </Grid>

                            :
                            <Grid
                                item
                                key={item}
                                sx={{ color: unselectedColor }}
                                onClick={() => { handleSelected(index) }}
                                xs={5}
                            >
                                <Typography sx={unselectedStyle}>
                                    {item}
                                </Typography>
                            </Grid>
                    })
                }
            </Grid>
            <Grid 
                container
                justifyContent="center"
            >
                <AppointmentsTable appointments={data[selectedIndex]} role={role} />
            </Grid>
        </>
    );
}

export default ContentToggler;
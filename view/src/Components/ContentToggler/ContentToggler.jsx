import { Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { useState } from "react";

const ContentToggler = ({ content }) => {
    const theme = useTheme();
    const selectedColor = theme.palette.highlight.main;
    const unselectedColor = theme.palette.grey[500];
    const selectedStyle = {
        borderBottom: `2px solid ${selectedColor}`,
        padding: "20px",
        "&:hover": {
            cursor: "pointer"
        },
    }
    const unselectedStyle = {
        borderBottom: `2px solid ${unselectedColor}`,
        padding: "20px",
        "&:hover": {
            cursor: "pointer"
        },
    }
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleSelected = (index) => {
        setSelectedIndex(index);
    }

    return (
        <>
            <Grid container spacing={2} justifyContent="center">
                {
                    content.map((item, index) => {
                        return index === selectedIndex ?

                            <Grid
                                item
                                key={item}
                                sx={{ color: selectedColor }}
                                onClick={() => { handleSelected(index) }}
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
                            >
                                <Typography sx={unselectedStyle}>
                                    {item}
                                </Typography>
                            </Grid>
                    })
                }
            </Grid>
        </>
    );
}

export default ContentToggler;
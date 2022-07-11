import React from "react";
import { Box } from "@mui/system";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../Helper/CustomTheme";

export default function PopupForm() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Box
                    component='form'
                    sx={{
                        width: '70%',
                        margin: '0 auto',
                        height: '780px',
                        borderRadius: '20px',
                        background: 'linear-gradient(180deg, #21D0C3 0%, rgba(166, 224, 214, 0.25) 22.4%)',
                        boxShadow: 'box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)'
                    }}
                >
                </Box>
            </ThemeProvider>
        </>
    );
}

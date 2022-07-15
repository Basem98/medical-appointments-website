import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primaryBg: {
            main: '#F9F9F9',
        },
        secondaryBg: {
            main: '#A6E0D6'
        },
        grey: {
            main: '#D9D9D9'
        },
        text: {
            primary: '#2E4046',
            secondary: '#FFFFFF'
        },
        highlight: {
            main: '#3AC99E'
        },
        ratingGold: {
            main: '#FFE234'
        },
        linearHeroBg: {
            main: 'linear-gradient(180deg, rgba(248, 251, 252, 0) 0%, rgba(152, 226, 205, 0.505208) 77.6%, #A6E0D6 100%)'
        },
        linearFormBg: {
            main: 'linear-gradient(180deg, #21D0C3 0%, rgba(166, 224, 214, 0.25) 22.4%)'
        }
    },
    typography: {

    }
});

export default theme;
import { createTheme, responsiveFontSizes } from "@mui/material";


let theme = createTheme();
theme = responsiveFontSizes(theme);

theme = createTheme({
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
            primary: '#2E4046'
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
        heroNavbarBg: {
            main: 'rgba(248, 251, 252, 1)'
        },
        linearFormBg: {
            main: 'linear-gradient(180deg, #21D0C3 0%, rgba(166, 224, 214, 0.25) 22.4%)'
        },
        detailsNavbarBg: {
            main: '#A6E0D6'
        },
        linearDetailsBg: {
            main: 'linear-gradient(0deg, rgba(255,255,255,1) 10%, #A6E0D6 100%, rgba(0,212,255,1) 100%)'
        }
    },
    typography: {
        fontFamily: `'Outfit', sans-serif`,
        h1: {
            fontWeight: 'bolder',
            [theme.breakpoints.up('xs')]: {
                fontSize: 36,
            },
            [theme.breakpoints.up('md')]: {
                fontSize: 46,
            },
            [theme.breakpoints.up('lg')]: {
                fontSize: 50,
            },
        },
        h2: {
            fontWeight: 'bolder',
            [theme.breakpoints.up('xs')]: {
                fontSize: 32
            },
            [theme.breakpoints.up('md')]: {
                fontSize: 34
            },
            [theme.breakpoints.up('lg')]: {
                fontSize: 38
            }
        },
        body1: {
            fontWeight: 'bold',
            [theme.breakpoints.up('xs')]: {
                fontSize: 16
            },
            [theme.breakpoints.up('md')]: {
                fontSize: 20,
            }
        },
        body2: {
            fontSize: 16,
            fontWeight: 'normal'
        },
        largerButtonText: {
            fontSize: 20,
            fontWeight: 'bold',
            textTransform: 'uppercase'
        },
        modalSmallText: {
            fontSize: 24
        },
        modalLargeText: {
            fontSize: 44
        }
    }
});

export default theme;
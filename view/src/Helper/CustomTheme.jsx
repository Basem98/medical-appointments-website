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
        linearFormBg: {
            main: 'linear-gradient(180deg, #21D0C3 0%, rgba(166, 224, 214, 0.25) 22.4%)'
        }
    },
    typography: {
        fontFamily: `'Outfit', sans-serif`,
        h1: {
            fontSize: 56,
            fontWeight: 'bolder'
        },
        h2: {
            fontSize: 38,
            fontWeight: '800',
            textTransform: 'capitalize'
        },
        body1: {
            fontSize: 20,
            fontWeight: 'bold'
        },
        bode1reg: {
            fontSize: 20
        },
        body2: {
            fontSize: 16,
            fontWeight: 'normal'
        },
        largerButtonText: {
            fontSize: 20,
            fontWeight: 'bold',
            textTransform: 'uppercase'
        }
    }
});

export default theme;
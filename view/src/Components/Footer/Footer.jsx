import { Grid, Typography, useTheme } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";
import LogoSvg from '../../Assets/Images/logo.svg';


function Footer({ displayNavFooter }) {
  const theme = useTheme();
  return (
    <Grid
      container
      justifyContent="space-around"
      style={{
        backgroundColor: theme.palette.secondaryBg.main, py: 5,
        display: !displayNavFooter && 'none',
        marginTop: 'auto'
      }}
      rowSpacing={5}
    >
      <Grid
        item
        xs={6}
        md={2}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent:'flex-start'
        }}
      >
        <Link
          to="/home"
          style={{
            color: theme.palette.text.primary,
            textDecoration: "none",
            display: 'flex',
            alignItems: 'center',
            width: 'fit-content',
            marginBottom: '15px'
          }}
        >
          <img src={LogoSvg} alt='Maw Logo' width='35px' height='35px' />
          <Typography variant="body2" fontWeight='bold' marginLeft='10px'>MAW</Typography>
        </Link>
        <Link
          to="/about"
          underline="none"
          style={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body2.fontSize,
            marginTop: '10px',
            textDecoration: "none"
          }}
        >
          About us
        </Link>
        <Link
          to="#"
          underline="none"
          style={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body2.fontSize,
            marginTop: '10px',
            textDecoration: "none"
          }}
        >
          Our Team
        </Link>
      </Grid>
      <Grid
        item
        xs={6}
        md={2}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          style={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body1.fontSize,
            fontWeight: theme.typography.body1.fontWeight,
            marginBottom: '15px'
          }}
        >
          Search By
        </Typography>
        <Link
          to="#"
          underline="none"
          style={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body2.fontSize,
            my: 3,
            marginTop: '10px',
            textDecoration: "none"
          }}
        >
          Specialisation
        </Link>
        <Link
          to="#"
          underline="none"
          style={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body2.fontSize,
            marginTop: '10px',
            textDecoration: "none"
          }}
        >
          Location
        </Link>
        <Link
          to="#"
          underline="none"
          style={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body2.fontSize,
            marginTop: '10px',
            textDecoration: "none"
          }}
        >
          Date
        </Link>
      </Grid>
      <Grid
        item
        xs={6}
        md={2}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          style={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body1.fontSize,
            fontWeight: theme.typography.body1.fontWeight,
            marginBottom: '15px'
          }}
        >
          Do you need help?
        </Typography>
        <Link
          to="/contactus"
          underline="none"
          style={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body2.fontSize,
            marginTop: '10px',
            textDecoration: "none"
          }}
        >
          Contact us
        </Link>
      </Grid>
      <Grid
        item
        xs={6}
        md={2}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          style={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body1.fontSize,
            fontWeight: theme.typography.body1.fontWeight,
            marginBottom: '15px'
          }}
        >
          Are you a Doctor?
        </Typography>
        <Link
          to="#"
          state={{ showModal: true, form: 'DoctorSignupForm' }}
          style={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body2.fontSize,
            marginTop: '10px',
            textDecoration: "none"
          }}
        >
          Join our team of heroes
        </Link>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          // mt: 7,
          display: "flex",
          justifyContent: "center",
          paddingBottom: "20px",
          alignItems: 'center'
        }}
      >
        <Typography
          variant="h6"
          style={{
            fontSize: theme.typography.body2.fontSize,
            pt: 1,
            order: 2
          }}
        >
          Copyrights &copy; MAW Team
        </Typography>
        <Link
          to="#"
          underline="none"
          style={{
            color: theme.palette.text.primary,
            marginRight: '10px',
            order: 1
          }}
        >
          <GitHubIcon fontSize="large" />
        </Link>
      </Grid>
    </Grid >
  );
}

export default Footer;

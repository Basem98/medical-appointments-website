import { Grid, Typography, useTheme } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";


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
        }}
      >
        <Link
          to="#"
          underline="none"
          style={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body1.fontSize,
            fontWeight: theme.typography.body1.fontWeight,
            mb: 3,
            textDecoration:"none"
          }}
        >
          BRAND
        </Link>
        <Link
          to="/about"
          underline="none"
          style={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body2.fontSize,
            mb: 3,
            textDecoration:"none"
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
            textDecoration:"none"
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
            textDecoration:"none"
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
            textDecoration:"none"
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
            mt: 3,
            textDecoration:"none"
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
            mt: 3,
            textDecoration:"none"
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
          }}
        >
          Are you a Doctor?
        </Typography>
        <Link
          to="#"
          underline="none"
          style={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body2.fontSize,
            mt: 3,
            textDecoration:"none"
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
          paddingBottom:"20px"
        }}
      >
        <Typography
          variant="h6"
          style={{
            fontSize: theme.typography.body2.fontSize,
            pt: 1,
          }}
        >
          Copyrights &copy; MAW Team
        </Typography>
        <Link
          to="#"
          underline="none"
          style={{
            color: theme.palette.text.primary,
            ml: 3,
          }}
        >
          <GitHubIcon fontSize="large" />
        </Link>
      </Grid>
    </Grid>
  );
}

export default Footer;

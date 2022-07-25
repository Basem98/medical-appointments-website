import { Grid, Link, Typography, useTheme } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

function Footer() {
  const theme = useTheme();
  return (
    <Grid
      container
      justifyContent="space-around"
      sx={{ backgroundColor: theme.palette.secondaryBg.main, py: 5 }}
      rowSpacing={5}
    >
      <Grid
        item
        xs={6}
        md={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link
          href="#"
          underline="none"
          sx={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body1.fontSize,
            fontWeight: theme.typography.body1.fontWeight,
            mb: 3,
          }}
        >
          BRAND
        </Link>
        <Link
          href="#"
          underline="none"
          sx={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body2.fontSize,
            mb: 3,
          }}
        >
          About us
        </Link>
        <Link
          href="#"
          underline="none"
          sx={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body2.fontSize,
          }}
        >
          Our Team
        </Link>
      </Grid>
      <Grid
        item
        xs={6}
        md={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body1.fontSize,
            fontWeight: theme.typography.body1.fontWeight,
          }}
        >
          Search By
        </Typography>
        <Link
          href="#"
          underline="none"
          sx={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body2.fontSize,
            my: 3,
          }}
        >
          Specialisation
        </Link>
        <Link
          href="#"
          underline="none"
          sx={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body2.fontSize,
          }}
        >
          Location
        </Link>
        <Link
          href="#"
          underline="none"
          sx={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body2.fontSize,
            mt: 3,
          }}
        >
          Date
        </Link>
      </Grid>
      <Grid
        item
        xs={6}
        md={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body1.fontSize,
            fontWeight: theme.typography.body1.fontWeight,
          }}
        >
          Dyou need help?
        </Typography>
        <Link
          href="#"
          underline="none"
          sx={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body2.fontSize,
            mt: 3,
          }}
        >
          Contact us
        </Link>
      </Grid>
      <Grid
        item
        xs={6}
        md={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body1.fontSize,
            fontWeight: theme.typography.body1.fontWeight,
          }}
        >
          Are you a Doctor?
        </Typography>
        <Link
          href="#"
          underline="none"
          sx={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body2.fontSize,
            mt: 3,
          }}
        >
          Join our team of heroes
        </Link>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          mt: 7,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: theme.typography.body2.fontSize,
            pt: 1,
          }}
        >
          Copyrights &copy; MAW Team
        </Typography>
        <Link
          href="#"
          underline="none"
          sx={{
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

import React from "react";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import NavBar from "./NavBar";
import CustomFormButton from "./../../Components/CustomFormButton/CustomFormButton";
import SearchBar from "./SearchBar";
import DoctorCard from "./DoctorCard";
import Footer from "./Footer";

function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <div
      style={{
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primaryBg.main,
      }}
    >
      {/* Hero Section */}
      <Grid
        container
        style={{
          background: "linear-gradient(#F8FBFC, #A6E0D6)",
          // height: "300px",
          // padding: "10px 130px",
          width: "100%",
        }}
        // justifyContent="center"
      >
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item xs={12} md={6} style={{}}>
          <Typography
            variant={isMobile ? "h4" : "h1"}
            sx={{
              // color: theme.palette.text.primary,
              maxWidth: "560px",
              m: 2,
              my: 7,
            }}
          >
            Medical Appointments now with the click of A Button
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomFormButton
            variant="contained"
            sx={{
              m: 2,
              padding: "10px 30px",
              fontSize: theme.typography.body1.fontSize,
            }}
          >
            Book Now
          </CustomFormButton>
          <CustomFormButton
            variant="outlined"
            sx={{
              m: 2,
              padding: "10px 40px",
              fontSize: theme.typography.body1.fontSize,
            }}
          >
            Sign Up
          </CustomFormButton>
        </Grid>
        <Grid item xs={12}>
          <SearchBar />
        </Grid>
      </Grid>

      {/* Top Rated Section */}
      <Grid container sx={{ mt: 15 }}>
        <Grid
          item
          md={12}
          justifyContent="center"
          // alignItems="center"
          container
        >
          <Grid item md={5}>
            <Typography variant="h2" align="center">
              Don’t know where to start? check our top rated specialists
            </Typography>
          </Grid>
        </Grid>
        <Grid item md={12} justifyContent="center" container sx={{ mt: 3 }}>
          <Grid item md={5}>
            <Typography variant="h6" align="center">
              Our platform helps you find the best professionals out there in
              the field in a short time, and these are our top rated stars so
              far!
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          container
          justifyContent="space-around"
          sx={{ mt: 9 }}
          // spacing={3}
          rowSpacing={3}
          // columnSpacing={{ xs: 3 }}
        >
          <DoctorCard />
          <DoctorCard />
          <DoctorCard />
        </Grid>
        <Grid item md={12} container justifyContent="center" sx={{ mt: 11 }}>
          <Grid item md={5}>
            <Typography
              variant="h5"
              align="center"
              sx={{ fontSize: theme.typography.body1.fontSize }}
            >
              Your desired specializtion isn’t in those 3 top options? Don’t
              worry! Click here to get a long list of a wide variety of the best
              doctors and specialists in the field!
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          md={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <CustomFormButton
            variant="contained"
            sx={{
              mt: 7,
              padding: "10px 30px",
              fontSize: theme.typography.body1.fontSize,
            }}
          >
            More Options
          </CustomFormButton>
        </Grid>
      </Grid>
      {/* Doctor Join Section */}
      <Grid
        container
        justifyContent="space-around"
        sx={{
          mt: 9,
          py: 11,
          backgroundColor: theme.palette.secondaryBg.main,
        }}
      >
        <Grid item xs={12} md={4}>
          {/* dr image */}
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography align="center" variant="h2">
            Are you a professional?
          </Typography>
          <Typography
            align="center"
            sx={{
              mt: 7,
              // px: 2,
              fontSize: theme.typography.body2.fontSize,
              fontWeight: theme.typography.body2.fontWeight,
            }}
          >
            If yes, then this is the right place for you! With our services,
            your medical services would be more accessible and digitized,
            helping your business grow, and most importantly, making it easier
            to help people.
            <span style={{ display: "block", marginTop: "20px" }}>
              Join us now!
            </span>
          </Typography>
          <CustomFormButton
            variant="contained"
            sx={{
              padding: "10px 40px",
              mt: 7,
              fontSize: theme.typography.body1.fontSize,
              width: "fit-content",
              alignSelf: "center",
            }}
          >
            Join As a Doctor
          </CustomFormButton>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-around"
        sx={{
          // mt: 9,
          py: 15,
          backgroundColor: "white",
        }}
      >
        <Grid item xs={10} md={4}>
          <Typography variant="h2">
            Do you have any inquiry?
            <span style={{ display: "block", marginTop: "20px" }}>
              Contact us!
            </span>
          </Typography>
        </Grid>
        <Grid
          item
          xs={10}
          md={5}
          display="flex"
          direction="column"
          justifyContent="center"
        >
          <Typography
            align="center"
            sx={{
              // mt: 7,
              // px: 2,
              fontSize: theme.typography.body2.fontSize,
              fontWeight: theme.typography.body2.fontWeight,
            }}
          >
            If yes, then this is the right place for you! With our services,
            your medical services would be more accessible and digitized,
            helping your business grow, and most importantly, making it easier
            to help people.
          </Typography>
          <CustomFormButton
            variant="contained"
            sx={{
              padding: "10px 40px",
              mt: 7,
              fontSize: theme.typography.body1.fontSize,
              width: "fit-content",
              alignSelf: "center",
            }}
          >
            Send a Message
          </CustomFormButton>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Home;

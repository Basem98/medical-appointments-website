import React from "react";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import NavBar from "../../Components/Navbar/NavBar";
import CustomFormButton from "./../../Components/CustomFormButton/CustomFormButton";
import SearchBar from "./SearchBar";
import DoctorCard from "../../Components/DoctorCard/DoctorCard";
import heroBg from "../../Assets/Images/HeroBg.png";
import sectionBg from "../../Assets/Images/SectionBg.png";

function Home() {
  const theme = useTheme();
  const isTabletMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
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
          padding: `0px ${!isTabletMobile ? "70px" : "0px"}`,
          width: "100%",
        }}
        // justifyContent="center"
      >
        <Grid item xs={12} sx={{ mb: 3 }}>
          <NavBar />
        </Grid>
        <Grid item xs={12} md={6} style={{}}>
          <Typography
            variant={isTabletMobile ? "h4" : "h1"}
            sx={{
              // color: theme.palette.text.primary,
              maxWidth: "560px",
              m: 2,
              my: 7,
            }}
          >
            Medical Appointments now with the click of A Button
          </Typography>
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
        {!isTabletMobile && (
          <Grid item md={6} justifyContent="center">
            <img
              src={heroBg}
              alt="heroBg"
              style={{
                width: "270px",
                position: "relative",
                top: "120px",
                left: "350px",
                bottom: "0px",
              }}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <SearchBar />
        </Grid>
      </Grid>

      {/* Top Rated Section */}
      <Grid container sx={{ mt: 5, py: 7 }}>
        <Grid
          item
          md={12}
          justifyContent="center"
          // alignItems="center"
          container
        >
          <Grid item xs={8} md={5}>
            <Typography variant="h2" align="center">
              Don’t know where to start? check our top rated specialists
            </Typography>
          </Grid>
        </Grid>
        <Grid item md={12} justifyContent="center" container sx={{ mt: 3 }}>
          <Grid item xs={10} md={5}>
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
          rowSpacing={9}
        >
          <Grid item xs={8} md={3}>
            <DoctorCard />
          </Grid>
          <Grid item xs={8} md={3}>
            <DoctorCard />
          </Grid>
          <Grid item xs={8} md={3}>
            <DoctorCard />
          </Grid>
        </Grid>
        <Grid item xs={12} container justifyContent="center" sx={{ mt: 11 }}>
          <Grid item md={5} xs={10}>
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
          xs={12}
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
          // mt: 9,
          py: 5,
          backgroundColor: theme.palette.secondaryBg.main,
        }}
      >
        {!isTabletMobile && (
          <Grid item md={4}>
            {/* dr image */}
            <img
              src={sectionBg}
              alt="dr sectionBg"
              style={{
                width: "400px",
                position: "relative",
                top: "44px",
              }}
            />
          </Grid>
        )}
        <Grid
          item
          xs={10}
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
          mt: 0,
          py: 9,
          backgroundColor: "white",
        }}
      >
        <Grid item xs={10} md={4} sx={{ mb: 3 }}>
          <Typography variant="h2" align="center">
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
          flexDirection="column"
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
              my: 5,
              fontSize: theme.typography.body1.fontSize,
              width: "fit-content",
              alignSelf: "center",
            }}
          >
            Send a Message
          </CustomFormButton>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
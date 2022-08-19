import React from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Grid,
  useMediaQuery,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoSvg from '../../Assets/Images/logo.svg';
import NavBarDropDownComponent from "../NavBarDropDownComponent/NavBarDropDownComponent";

const NavBar = ({ backgroundColor, color, position, displayNavFooter, openLoginForm }) => {
  const theme = useTheme();
  const isTabletMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [showMenue, setShowMenu] = useState(false);

  const handleOpen = () => {
    openLoginForm();
  };

  const userDetails = useSelector((state) => state.userDetails);
  return (
    <>
      <AppBar
        sx={{
          backgroundColor: backgroundColor ? backgroundColor : "inherit",
          color: theme.palette.text.primary,
          position: position ? position : "static",
          padding: { xs: `5px 20px`, md: `5px 70px` },
          marginBottom: position === "fixed" ? "50px" : "0",
          display: !displayNavFooter && 'none'
        }}
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs={4} md={4}>
              <Link
                to="/home"
                style={{
                  color: color ? color : theme.palette.text.primary,
                  textDecoration: "none",
                  display: 'flex',
                  alignItems: 'center',
                  width: 'fit-content'
                }}
              >
                <img src={LogoSvg} alt='Maw Logo' width='55px' height='55px' />
                <Typography variant="body1" marginLeft='10px'>MAW</Typography>
              </Link>
            </Grid>

            {isTabletMobile ? (
              <Grid item xs={8} sm={8} container justifyContent="right">
                {showMenue && (
                  <>
                    <Grid
                      item
                      xs={8}
                      container
                      direction="column"
                      alignItems="center"
                      // justifyContent="space-between"
                      spacing="5"
                      sx={{
                        position: "absolute",
                        top: "70px",
                        background: "white",
                        // width: "fit-content",
                        height: "200px",
                        borderRadius: "16px",
                        py: 5,
                        // pt: 5,
                      }}
                    >
                      <Grid item>
                        <Link
                          to="/specialists"
                          style={{
                            color: color ? color : theme.palette.text.primary,
                            fontSize: theme.typography.body1.fontSize,
                            textDecoration: "none",
                          }}
                        >
                          Our Specialists
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link
                          to="/about"
                          style={{
                            color: color ? color : theme.palette.text.primary,
                            fontSize: "21px",
                            textDecoration: "none",
                          }}
                        >
                          About US
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link
                          to="#"
                          style={{
                            color: color ? color : theme.palette.text.primary,
                            fontSize: "21px",
                            textDecoration: "none",
                          }}
                        >
                          Sign In
                        </Link>
                      </Grid>
                    </Grid>
                  </>
                )}
                <IconButton
                  size="large"
                  // edge="start"
                  color="inherit"
                  // aria-label="menu"
                  // sx={{ mr: 2 }}
                  onClick={(e) => {
                    console.log(showMenue, e.currentTarget);
                    setShowMenu(!showMenue);
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            ) : (
              <>
                <Grid
                  item
                  md={2}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Link
                    to="/specialists"
                    style={{
                      color: color ? color : theme.palette.text.primary,
                      textDecoration: "none",
                    }}
                  >
                    Our Specialists
                  </Link>
                </Grid>
                <Grid
                  item
                  md={2}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Link
                    to="/contactus"
                    style={{
                      color: color ? color : theme.palette.text.primary,
                      textDecoration: "none",
                    }}
                  >
                    Contact Us
                  </Link>
                </Grid>
                <Grid
                  item
                  md={2}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Link
                    to="/about"
                    style={{
                      color: color ? color : theme.palette.text.primary,
                      textDecoration: "none",
                    }}
                  >
                    About
                  </Link>
                </Grid>
                <Grid
                  item
                  md={2}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  {userDetails?.loggedIn ?
                    (<NavBarDropDownComponent />)
                    : (<Link
                      to="#"
                      style={{
                        color: color ? color : theme.palette.text.primary,
                        textDecoration: "none",
                      }}
                      onClick={() => handleOpen()}
                    >
                      Sign In
                    </Link>)
                  }
                </Grid>
              </>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;

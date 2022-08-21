import React, { useEffect } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Grid,
  useMediaQuery,
  Typography,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogoSvg from '../../Assets/Images/logo.svg';
import NavBarDropDownComponent from "../NavBarDropDownComponent/NavBarDropDownComponent";
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import checkAuthentication from "../../Network/Base/checkAuthentication";
import { setUserDetails } from "../../Store/Features/UserDetails/userDetailsSlice";

const NavBar = ({ backgroundColor, color, position, displayNavFooter, openLoginForm }) => {
  const theme = useTheme();
  const isTabletMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const [showMenue, setShowMenu] = useState(false);

  const handleOpen = () => {
    openLoginForm();
  };

  const userDetails = useSelector((state) => state.userDetails);
  useEffect(() => {
    checkAuthentication()
      .then((response) => {
        dispatch(setUserDetails({
          role: response.data.role,
          data: response.data.data,
          email: response.data.data.email
        }))
      })
      .catch(err => { console.log(err) });
  }, []);

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
                  color="inherit"
                  onClick={(e) => {
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
                  {userDetails?.loggedIn ?
                    (<Link
                      to={`/${userDetails.role === "User" ? "users" : "doctors"}/${userDetails.data?._id}/appointments`}
                      style={{
                        color: color ? color : theme.palette.text.primary,
                        textDecoration: "none",
                        display: "flex"
                      }}
                    >
                      <Badge color="success" badgeContent={userDetails.data?.appointments?.length}>
                        <AccessAlarmsIcon fontSize="large" sx={{ margingTop: "0" }} />
                      </Badge>
                    </Link>)
                    :
                    (<Link
                      to="/about"
                      style={{
                        color: color ? color : theme.palette.text.primary,
                        textDecoration: "none",
                        display: "flex"
                      }}
                    >
                      About
                    </Link>)
                  }
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

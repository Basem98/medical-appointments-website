import React from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Grid,
  Link,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@emotion/react";
import { useState } from "react";
const NavBar = ({ backgroundColor }) => {
  const theme = useTheme();
  const isTabletMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [showMenue, setShowMenu] = useState(false);
  return (
    <>
      <AppBar
        sx={{
          backgroundColor: backgroundColor ? backgroundColor : "inherit",
          color: theme.palette.text.primary,
          position: "static",
        }}
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs={4} md={4}>
              <Link
                href="/home"
                underline="none"
                style={{ color: theme.palette.text.primary }}
              >
                LOGO
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
                          href="#"
                          underline="none"
                          style={{
                            // color: color ? color : theme.palette.text.primary,
                            fontSize: theme.typography.body1.fontSize,
                          }}
                        >
                          Our Specialists
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link
                          href="#"
                          underline="none"
                          style={{
                            // color: color ? color : theme.palette.text.primary,
                            fontSize: "21px",
                          }}
                        >
                          About US
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link
                          href="#"
                          underline="none"
                          style={{
                            // color: color ? color : theme.palette.text.primary,
                            fontSize: "21px",
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
                    href="#"
                    underline="none"
                    style={{ color: theme.palette.text.primary }}
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
                    href="#"
                    underline="none"
                    style={{ color: theme.palette.text.primary }}
                  >
                    About Us
                  </Link>
                </Grid>
                <Grid
                  item
                  md={2}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Link
                    href="#"
                    underline="none"
                    style={{ color: theme.palette.text.primary }}
                  >
                    Sign In
                  </Link>
                </Grid>
                <Grid
                  item
                  md={2}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Link
                    href="#"
                    underline="none"
                    style={{ color: theme.palette.text.primary }}
                  >
                    العربية
                  </Link>
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

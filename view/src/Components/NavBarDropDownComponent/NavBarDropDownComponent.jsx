import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Grid } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Fade from '@mui/material/Fade';
import { useTheme } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import FaceIcon from '@mui/icons-material/Face';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyIcon from '@mui/icons-material/Key';
import PeopleIcon from '@mui/icons-material/People';

import { Link, useLocation } from 'react-router-dom';
import { removeUserDetails } from "../../Store/Features/UserDetails/userDetailsSlice";
import { useDispatch, useSelector } from 'react-redux';
import logout from '../../Network/Base/logout';


export default function NavBarDropDownComponent() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
        console.log(event.currentTarget);;
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(removeUserDetails());
        logout()
            .then(res => { })
            .catch(err => { })
    }

    const theme = useTheme()
    const location = useLocation();
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails);

    return (
        <Grid container justifyContent={'flex-start'}>
            <AccountCircle
                fontSize="large"
                sx={{ color: location.pathname === '/' ? theme.palette.highlight.main : theme.palette.text.primary }}
                onClick={handleMenu}
                cursor='pointer'
            />
            <Grid item alignItems={'center'}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    sx={{ padding: 0, paddingTop: "6px", color: location.pathname === "/" ? theme.palette.highlight.main : theme.palette.text.primary }}
                >
                    <ArrowDropDownIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    TransitionComponent={Fade}

                >
                    <Link style={{ textDecoration: "none", color: "#000" }} to={`/${userDetails.role === "User" ? "users" : "doctors"}/${userDetails.data?._id}/profile`}>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <FaceIcon />
                            </ListItemIcon>
                            Profile
                        </MenuItem>
                    </Link>
                    <Link style={{ textDecoration: "none", color: "#000" }} to={`/${userDetails.role === "User" ? "users" : "doctors"}/${userDetails.data?._id}/appointments`}>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <CalendarMonthIcon />
                            </ListItemIcon>
                            My schedule
                        </MenuItem>
                    </Link>
                    {userDetails.role === "User" ?
                        <Link style={{ textDecoration: "none", color: "#000" }} to={`/users/${userDetails.data?._id}/settings`}>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                        </Link>
                        :
                        <Link style={{ textDecoration: "none", color: "#000" }} to={`/doctors/${userDetails.data?._id}/patients`}>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <PeopleIcon />
                                </ListItemIcon>
                                Patients
                            </MenuItem>
                        </Link>
                    }
                    <Link style={{ textDecoration: "none", color: "#000" }} to={`/${userDetails.role === "User" ? "users" : "doctors"}/${userDetails.data?._id}/change-password`}>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <KeyIcon />
                            </ListItemIcon>
                            Password
                        </MenuItem>
                    </Link>

                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        Log out
                    </MenuItem>
                </Menu>
            </Grid >
        </Grid >
    );
}

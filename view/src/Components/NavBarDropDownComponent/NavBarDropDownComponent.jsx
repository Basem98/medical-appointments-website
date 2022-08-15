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



export default function NavBarDropDownComponent() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
        console.log(event.currentTarget);;
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const theme = useTheme()

    return (
        <Grid container justifyContent={'flex-end'}>
            <AccountCircle
                fontSize="large"
                sx={{ color: theme.palette.highlight.main }}
            />
            <Grid item alignItems={'center'} sx={{marginRight:"250px"}}>


                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    sx={{ padding: 0, paddingTop: "6px", color: theme.palette.highlight.main }}
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
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <FaceIcon />
                        </ListItemIcon>
                        Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                            <CalendarMonthIcon />
                        </ListItemIcon>
                        My schedule
                        </MenuItem>
                    <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        Settings
                        </MenuItem>
                    <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        Log out
                        </MenuItem>
                </Menu>
            </Grid>


        </Grid>
    );
}

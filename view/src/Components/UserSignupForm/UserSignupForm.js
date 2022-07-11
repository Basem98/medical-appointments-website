import { Typography, TextField, Grid, InputAdornment, Button} from "@mui/material";
import { ThemeProvider } from "@mui/system";
import React from "react";
import PopupForm from "../PopupForm/PopupForm";
import theme from "../../Helper/CustomTheme";
import Person from '@mui/icons-material/Person';
import Phone from '@mui/icons-material/Phone';
import Email from '@mui/icons-material/Email';
import Key from '@mui/icons-material/Key';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



import "./UserSignupForm.css"
import CountrySelect from "../CountrySelect/CountrySelect";

export default function UserSignupForm() {
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const FormContent =
        <>
            <ThemeProvider theme={theme}>
                <Typography
                    variant='h3'
                    align='center'
                    padding='30px'
                    fontWeight='bold'
                    color="textPrimary"
                >
                    Sign up
                </Typography>

                <Grid
                    container
                    spacing={2}
                    rowSpacing={3}
                    paddingTop='100px'
                    margin="0 auto"
                    direction="row"
                    width="90%"
                >
                    <Grid item xs={6} width="75%">
                        <TextField
                            placeholder="First Name"
                            variant="outlined"
                            fullWidth
                            sx={{
                                backgroundColor: "white",
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person fontSize="large" color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            placeholder="Last Name"
                            variant="outlined"
                            fullWidth
                            sx={{
                                backgroundColor: "white",
                            }}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <CountrySelect></CountrySelect>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            placeholder="Phone Number"
                            variant="outlined"
                            fullWidth
                            sx={{
                                backgroundColor: "white",
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Phone fontSize="large" color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            placeholder="Email Address"
                            variant="outlined"
                            fullWidth
                            sx={{
                                backgroundColor: "white",
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email fontSize="large" color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <OutlinedInput
                            placeholder="Password"
                            sx={{
                                backgroundColor: "white"
                            }}
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            fullWidth
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            startAdornment={
                                <InputAdornment position="start">
                                    <Key fontSize="large" color="primary" />
                                </InputAdornment>
                            }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <OutlinedInput
                            placeholder="Confirm Password"
                            sx={{
                                backgroundColor: "white"
                            }}
                            type={values.showPassword ? 'text' : 'password'}
                            fullWidth
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </Grid>

                    <Grid item xs={6} margin="0 auto">
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            sx={{
                                padding: "15px",
                                backgroundColor: "primary",
                                fontSize: "larger",
                                fontWeight: "bold",
                                color: "white",
                                borderRadius: "15px"
                            }}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>


    return (
        <>
            <PopupForm
                FormContent={FormContent}
            >
            </PopupForm>
        </>
    );
}
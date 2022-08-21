/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from "react";
import { Grid } from "@mui/material";
import InputField from '../../Components/InputField/InputField'
import { Formik, Form } from "formik";
import CustomFormButton from "../../Components/CustomFormButton/CustomFormButton";
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import updateData from "../../Network/Users/updateData";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../Helper/Authentication";
import { useEffect } from "react";
import * as Yup from "yup";

const Settings = () => {
    const userId = useSelector((state) => state.userDetails.data?._id);
    const userData = useSelector((state) => state.userDetails.data);
    const role = useSelector((state) => state.userDetails.role);
    const formRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isDuplicated, setIsDuplicated] = useState(false);
    const [dataUpdated, setDataUpdated] = useState(false);

    useEffect(() => {
        authenticate('User', navigate, dispatch);
    }, [])

    const handleSubmit = (e) => {
        const formValues = formRef.current.values;
        const userData = {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            phoneNumber: formValues.phoneNumber,
        };
        updateData(userId, userData)
            .then((response) => {
                setDataUpdated(true);
                setTimeout(() => {
                    setDataUpdated(false);
                }, 3000);
            })
            .catch((error) => {
                setIsDuplicated(true);
                setTimeout(() => {
                    setIsDuplicated(false);
                }, 3000);
            })
    }
    return (

        <>
            {
                role === 'User' ?
                    <Grid
                        container
                        justifyContent="center"
                    >
                        <Grid item xs={8} sx={{ margin: '0 auto' }}>
                            {
                                isDuplicated &&
                                <Grid item>
                                    <CustomAlert severity="error">
                                        Phone number is already registered for another user!
                                    </CustomAlert>
                                </Grid>
                            }
                            {
                                dataUpdated &&
                                <Grid item>
                                    <CustomAlert severity="success">
                                        Your data is updated successfully!
                                    </CustomAlert>
                                </Grid>
                            }
                        </Grid>
                        <Grid
                            item
                        >
                            <Formik
                                initialValues={{
                                    firstName: userData.firstName,
                                    lastName: userData.lastName,
                                    phoneNumber: userData.phoneNumber,
                                }}
                                validationSchema={
                                    Yup.object({
                                        firstName: Yup.string().required('This field is required').matches(/[a-z]{2,50}/g, { message: 'Your first name must be between 2 and 50 alphabet letters' }),
                                        lastName: Yup.string().required('This field is required').matches(/[a-z]{2,50}/g, { message: 'Your last name must be between 2 and 50 alphabet letters' }),
                                        phoneNumber: Yup.string().required("This field is required").matches(/^01[0125][0-9]{8}$/g, { message: 'You must type a valid Egyptian number' }),
                                    })
                                }
                                innerRef={formRef}
                                onSubmit={handleSubmit}
                            >
                                {
                                    (props) => (
                                        <Form>
                                            <Grid container justifyContent='center' alignItems='center'>
                                                <Grid item xs={10} md={5} sx={{ marginTop: '25px' }}>
                                                    <InputField
                                                        label='First Name'
                                                        name='firstName'
                                                        placeholder='First Name'
                                                    >
                                                        <PersonIcon></PersonIcon>
                                                    </InputField>
                                                </Grid>
                                                <Grid item xs={10} md={5} sx={{ marginTop: '25px', ml: '1px' }}>
                                                    <InputField label='Last Name' name='lastName' placeholder='Last Name' >
                                                        <PersonIcon></PersonIcon>
                                                    </InputField>
                                                </Grid>
                                                <Grid item xs={10} sx={{ marginTop: '25px' }}>
                                                    <InputField label='Phone Number' name='phoneNumber' placeholder='Phone Number'>
                                                        <PhoneIcon></PhoneIcon>
                                                    </InputField>
                                                </Grid>
                                                <Grid item xs={8} sx={{ marginTop: '25px' }}>
                                                    <CustomFormButton variant="contained" type="submit" xs={8} sx={{ width: '100%', mb: '50px' }}>Submit</CustomFormButton>
                                                </Grid>
                                            </Grid>
                                        </Form>
                                    )
                                }

                            </Formik>
                        </Grid>
                    </Grid>
                    :
                    <></>
            }
        </>
    );
}

export default Settings;
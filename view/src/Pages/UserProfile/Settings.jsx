/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Grid } from "@mui/material";
import InputField from '../../Components/InputField/InputField'
import { Formik, Form } from "formik";
import CustomFormButton from "../../Components/CustomFormButton/CustomFormButton";
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import { personalFormStepValidation } from "../../Helper/ValidationSchema";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import updateData from "../../Network/Users/updateData";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../Helper/Authentication";

const Settings = () => {
    const userId = useSelector((state) => state.userDetails.data?._id);
    const userData = useSelector((state) => state.userDetails.data);
    const role = useSelector((state) => state.userDetails.role);
    const formRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isDuplicated, setIsDuplicated] = useState(false);
    const [duplicationErrorsArray, setDuplicationErrorsArray] = useState([]);

    const handleDuplicationError = () => {
        return duplicationErrorsArray.map((errorMessage, index) => {
            return (
                <CustomAlert
                    severity="error"
                    key={index}
                >
                    {errorMessage}
                </CustomAlert>
            );
        });
    }

    useEffect(() => { authenticate('User', navigate, dispatch) }, []);

    const handleSubmit = (e) => {
        const formValues = formRef.current.values;
        const userData = {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            phoneNumber: formValues.phoneNumber,
        };
        updateData(userId, userData)
            .then((response) => {
                handleRedirect();
            })
            .catch((error) => {
                setIsDuplicated(true);
                let errorMessagesArray = JSON.parse(error.response.data.error);
                setDuplicationErrorsArray(errorMessagesArray);
            })
    }

    const handleRedirect = () => {
        navigate("/users/:id/profile", { replace: true })
    }
    return (

        <>
            {
                role === 'User' ?
                    <Grid
                        container
                        justifyContent="center"
                    >
                        <Grid item xs={10} sx={{ margin: '0 auto' }}>
                            {
                                isDuplicated &&
                                handleDuplicationError()
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
                                validationSchema={personalFormStepValidation}
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
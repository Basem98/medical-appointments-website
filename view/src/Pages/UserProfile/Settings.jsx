import React, { useRef, useState } from "react";
import { Grid } from "@mui/material";
import InputField from '../../Components/InputField/InputField'
import { Formik, Form } from "formik";
import CustomFormButton from "../../Components/CustomFormButton/CustomFormButton";
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { personalFormStepValidation } from "../../Helper/ValidationSchema";
import submitUserData from "../../Network/Users/register";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";


const Settings = ({ userData }) => {
    const formRef = useRef(null);

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

    const handleSubmit = () => {
        const formValues = formRef.current.values;
        const userData = {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            phoneNumber: formValues.phoneNumber,
            email: formValues.email,
        };
        submitUserData(userData)
            .then((response) => console.log(response))
            .catch((error) => {
                setIsDuplicated(true);
                let errorMessagesArray = JSON.parse(error.response.data.error);
                setDuplicationErrorsArray(errorMessagesArray);
            })
    }
    return (
        <Formik
            initialValues={{
                firstName: userData.firstName,
                lastName: userData.lastName,
                phoneNumber: userData.phoneNumber,
                email: userData.email
            }}
            validationSchema={personalFormStepValidation}
            onSubmit={handleSubmit}
            innerRef={formRef}
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
                            <Grid item xs={10} sx={{ marginTop: '25px' }}>
                                <InputField label='Email' name='email' placeholder='Enter Your Email'>
                                    <EmailIcon></EmailIcon>
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
    );
}

export default Settings;
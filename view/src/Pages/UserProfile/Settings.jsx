import React, { useRef, useState } from "react";
import { Grid } from "@mui/material";
import InputField from '../../Components/InputField/InputField'
import { Formik, Form } from "formik";
import CustomFormButton from "../../Components/CustomFormButton/CustomFormButton";
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import { personalFormStepValidation } from "../../Helper/ValidationSchema";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import updateData from "../../Network/Users/updateData";


const Settings = ({ userData }) => {
    const id = "62e88ec51b557976cbe9e1f9";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTg4ZWM1MWI1NTc5NzZjYmU5ZTFmOSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjYwMDMwOTk4LCJleHAiOjE2NjI2MjI5OTh9.S3t7uv5S6h9AJyrBSGUtwCn1xiT_D5_3GQciKy0TCK0";

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
        };
        updateData(id, token, userData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (

        <>
            <Grid
                container
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
        </>
    );
}

export default Settings;
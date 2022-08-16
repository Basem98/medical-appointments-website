import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getPatients from "../../Network/Doctors/getPatients";
import { setDoctorPatients } from "../../Store/Features/DoctorPatients/doctorPatientsSlice";
import checkAuthentication from "../../Network/Base/checkAuthentication";
import { setUserDetails } from "../../Store/Features/UserDetails/userDetailsSlice";
import { Typography } from "@mui/material";

const Patients = () => {
    const dispatch = useDispatch();
    const doctorId = useSelector((state) => state.userDetails.data?._id);
    const patients = useSelector((state) => state.doctorPatients.patients)

    useEffect(() => {
        checkAuthentication()
            .then((response) => {
                dispatch(setUserDetails({
                    role: response.data.role,
                    data: response.data.data,
                    email: response.data.data.email
                }))
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        doctorId &&
        getPatients(doctorId)
            .then((response) => {
                dispatch(setDoctorPatients({
                    patients: response.data.message[0]
                }))
            })
            .catch((error) => {
                console.log(error);
            })
    }, [doctorId]);
        
    return (
        <>
            
        </>
    );
}

export default Patients;
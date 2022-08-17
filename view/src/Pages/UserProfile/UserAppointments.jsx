/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ContentToggler from "../../Components/ContentToggler/ContentToggler";
import { useState } from "react";
import { useEffect } from "react";
import getUpcomings from "../../Network/Users/getUpcomings";
import getPrevious from "../../Network/Users/getPrevious";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import checkAuthentication from "../../Network/Base/checkAuthentication";
import { setUserDetails } from "../../Store/Features/UserDetails/userDetailsSlice";

const Appointments = () => {
    const userId = useSelector((state) => state.userDetails.data?._id);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [upcomingAppointments, setUpcomingAppointments] = useState();
    const [previousAppointments, setPreviousAppointments] = useState();

    const titles = [
        "Upcoming Appointments",
        "Previous Appointments"
    ]
    const data = [
        upcomingAppointments,
        previousAppointments
    ];

    useEffect(() => {
        checkAuthentication()
            .then((response) => {
                dispatch(setUserDetails({
                    role: response.data.role,
                    data: response.data.data,
                    email: response.data.data.email
                }))
                if(response.data.role !== 'User') {
                    navigate('/');
                }
            })
            .catch((error) => {
                navigate('/');
            })
    }, []);

    useEffect(() => {
        userId &&
        getUpcomings(userId)
            .then((response) => {
                setUpcomingAppointments(response.data.message);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        userId &&
        getPrevious(userId)
            .then((response) => {
                setPreviousAppointments(response.data.message);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <>
            <ContentToggler data={data} titles={titles} role="user"/>
        </>
    );
}

export default Appointments;
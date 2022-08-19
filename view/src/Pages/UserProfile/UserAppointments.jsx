/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ContentToggler from "../../Components/ContentToggler/ContentToggler";
import { useEffect } from "react";
import getUpcomings from "../../Network/Users/getUpcomings";
import getPrevious from "../../Network/Users/getPrevious";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../../Helper/Authentication";
import { setUpcomingAppointments } from "../../Store/Features/Appointments/upcomingAppointmentsSlice";
import { setPreviousAppointments } from "../../Store/Features/Appointments/previousAppointmentsSlice";

const Appointments = () => {
    const userId = useSelector((state) => state.userDetails.data?._id);
    const role = useSelector((state) => state.userDetails.role);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const upcomingAppointments = useSelector((state) => state.upcomingAppointments.data)
    const previousAppointments = useSelector((state) => state.previousAppointments.data);

    const titles = [
        "Upcoming Appointments",
        "Previous Appointments"
    ]
    const data = [
        upcomingAppointments,
        previousAppointments
    ];

    authenticate('User', navigate, dispatch);

    useEffect(() => {
        userId &&
            getUpcomings(userId)
                .then((response) => {
                    dispatch(setUpcomingAppointments({
                        upcomingAppointments: response.data.message
                    }))
                })
                .catch((error) => {
                    console.log(error);
                })
    }, [userId]);

    useEffect(() => {
        userId &&
            getPrevious(userId)
                .then((response) => {
                    dispatch(setPreviousAppointments({
                        previousAppointements: response.data.message
                    }))
                })
                .catch((error) => {
                    console.log(error);
                })
    }, [userId]);


    return (
        <>
            {
                role === 'User' ?
                    <ContentToggler data={data} titles={titles} role="user" />
                    :
                    <></>
            }
        </>
    );
}

export default Appointments;
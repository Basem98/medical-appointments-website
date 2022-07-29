import React from "react";
import ContentToggler from "../../Components/ContentToggler/ContentToggler";
import { useState } from "react";
import { useEffect } from "react";
import getUpcomings from "../../Network/Users/getUpcomings";
import UpcomingAppointments from "./UpcomingAppointments";

const Appointments = () => {
    const content = [
        "Upcoming Appointments",
        "Past Appointments",
        "Cancelled Appointments"
    ]

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGY3MDE0ODc4MTIyNjU5NzcxMDA3ZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjU5MDY5MDU0LCJleHAiOjE2NTkwNzI2NTR9.gaWgNDE7BuCGDAEDdvLM4ssXeF9iNQa_NJHcRTgHFLA";
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    useEffect(() => {
        getUpcomings("62df7014878122659771007e", token)
        .then((response) => {
            setUpcomingAppointments(response.data.message);
        })
        .catch((error) => {
            console.log(error);
        })
    },[]); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
            <ContentToggler content={content}/>
            <UpcomingAppointments upcomings={upcomingAppointments}/>
        </>
    );
}

export default Appointments;
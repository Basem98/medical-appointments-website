import React from "react";
import ContentToggler from "../../Components/ContentToggler/ContentToggler";
import { useState } from "react";
import { useEffect } from "react";
import getUpcomings from "../../Network/Users/getUpcomings";
import getPrevious from "../../Network/Users/getPrevious";

const Appointments = () => {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTYzODg3MWEzNjRjZTYwZDVhOWI4NyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjU5MjU0OTQ3LCJleHAiOjE2NTkzNDEzNDd9.8w83p9LMzNyRakF5YnuekjriLRk31WUrrR7xBg0RME8";

    const [upcomingAppointments, setUpcomingAppointments] = useState();
    const [previousAppointments, setPreviousAppointments] = useState();

    const titles = [
        "Upcoming Appointments",
        "Past Appointments"
    ]
    const data = [
        upcomingAppointments,
        previousAppointments
    ];


    useEffect(() => {
        getUpcomings("62e638871a364ce60d5a9b87", token)
            .then((response) => {
                setUpcomingAppointments(response.data.message);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        getPrevious("62e638871a364ce60d5a9b87", token)
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
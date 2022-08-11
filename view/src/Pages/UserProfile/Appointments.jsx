import React from "react";
import ContentToggler from "../../Components/ContentToggler/ContentToggler";
import { useState } from "react";
import { useEffect } from "react";
import getUpcomings from "../../Network/Users/getUpcomings";
import getPrevious from "../../Network/Users/getPrevious";

const Appointments = () => {

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
        getUpcomings("62e88ec51b557976cbe9e1f9")
            .then((response) => {
                setUpcomingAppointments(response.data.message);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        getPrevious("62e88ec51b557976cbe9e1f9")
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
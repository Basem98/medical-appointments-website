import React from "react";
import ContentToggler from "../../Components/ContentToggler/ContentToggler";
import { useState } from "react";
import { useEffect } from "react";
import getUpcomings from "../../Network/Users/getUpcomings";
import getPrevious from "../../Network/Users/getPrevious";

const Appointments = () => {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTg4ZWM1MWI1NTc5NzZjYmU5ZTFmOSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjU5NTMyOTk0LCJleHAiOjE2NTk2MTkzOTR9.XSAk_6hQEBDtiHYZ0CDQ4L_CCsjN9Gip_a3jICIYMa8";

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
        getUpcomings("62e88ec51b557976cbe9e1f9", token)
            .then((response) => {
                setUpcomingAppointments(response.data.message);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        getPrevious("62e88ec51b557976cbe9e1f9", token)
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
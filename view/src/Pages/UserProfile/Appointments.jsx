import React from "react";
import ContentToggler from "../../Components/ContentToggler/ContentToggler";
import { useState } from "react";
import { useEffect } from "react";
import getUpcomings from "../../Network/Users/getUpcomings";

const Appointments = () => {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGY3MDE0ODc4MTIyNjU5NzcxMDA3ZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjU5MTA4NjExLCJleHAiOjE2NTkxOTUwMTF9.0W0n9b4h5ZOnMwQ8tNbb7If75t8Obq6ue8-jKwweg4I";
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const content = [
        "Upcoming Appointments",
        "Past Appointments",
        "Cancelled Appointments"
    ]
    const data = [
        upcomingAppointments
    ];
    useEffect(() => {
        getUpcomings("62df7014878122659771007e", token)
            .then((response) => {
                setUpcomingAppointments(response.data.message);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
            <ContentToggler data={data} content={content} />
        </>
    );
}

export default Appointments;
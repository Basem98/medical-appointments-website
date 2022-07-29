import React from "react"
const UpcomingAppointments = ({ upcomings }) => {

    return upcomings.map((upcoming, index) => {
        return (
            <>
                <div key={index}>{upcoming.date}</div>
            </>
        );
    })

}

export default UpcomingAppointments;
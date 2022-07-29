import React from "react"
const AppointmentsTable = ({ upcomings }) => {

    return upcomings?.map((upcoming, index) => {
        return (
            <div key={index}>{upcoming.date}</div>
        );
    })

}

export default AppointmentsTable;
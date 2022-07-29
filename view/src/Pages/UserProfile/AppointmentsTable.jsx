import React from "react"
const AppointmentsTable = ({ appointments }) => {

    return appointments?.map((appointment, index) => {
        return (
            <div key={index}>{appointment.date}</div>
        );
    })

}

export default AppointmentsTable;
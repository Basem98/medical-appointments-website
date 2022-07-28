import React from "react";
import ContentToggler from "../../Components/ContentToggler/ContentToggler";

const Appointments = () => {
    const content = [
        "Past Appointments",
        "Upcoming Appointments",
        "Another Item"
    ]
    return (
        <>
            <ContentToggler content={content}/>
        </>
    );
}

export default Appointments;
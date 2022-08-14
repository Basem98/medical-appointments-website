import { useEffect } from "react";
import { useState } from "react";
import ContentToggler from "../../Components/ContentToggler/ContentToggler";
import getUpcomings from "../../Network/Users/getUpcomings";

const Appointments = () => {
    const [upcomingAppointments, setUpcomingAppointments] = useState(null);
    const [previousAppointments, setPreviousAppointments] = useState(null);

    useEffect(() => {
        getUpcomings("62e7c235150862d88def8161")
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <ContentToggler
            
        />
    );
}

export default Appointments;
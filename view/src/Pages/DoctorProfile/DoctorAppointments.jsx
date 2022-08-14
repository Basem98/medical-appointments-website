import { useEffect } from "react";
import { useState } from "react";
import ContentToggler from "../../Components/ContentToggler/ContentToggler";
import getUpcomings from "../../Network/Doctors/getUpcomings";
import getPrevious from "../../Network/Doctors/getPrevious";

const Appointments = () => {
    const titles = ["Upcoming Appointments", "Previous Appointments"];

    const [upcomingAppointments, setUpcomingAppointments] = useState(null);
    const [previousAppointments, setPreviousAppointments] = useState(null);

    const data = [
        upcomingAppointments,
        previousAppointments
    ];

    useEffect(() => {
        getUpcomings("62e7c235150862d88def8161")
            .then((response) => {
                console.log(response);
                setUpcomingAppointments(response.data.message);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        getPrevious("62e7c235150862d88def8161")
            .then((response) => {
                console.log(response);
                setPreviousAppointments(response.data.message);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <>
            <ContentToggler
                titles={titles}
                data={data}
                role="doctor"
            />
        </>
    );
}

export default Appointments;
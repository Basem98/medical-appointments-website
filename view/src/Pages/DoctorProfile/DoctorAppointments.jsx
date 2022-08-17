/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useState } from "react";
import ContentToggler from "../../Components/ContentToggler/ContentToggler";
import getUpcomings from "../../Network/Doctors/getUpcomings";
import getPrevious from "../../Network/Doctors/getPrevious";
import checkAuthentication from "../../Network/Base/checkAuthentication";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../Store/Features/UserDetails/userDetailsSlice";
import { useNavigate } from "react-router-dom";

const Appointments = () => {
    const titles = ["Upcoming Appointments", "Previous Appointments"];
    const doctorId = useSelector((state) => state.userDetails.data?._id);
    const [upcomingAppointments, setUpcomingAppointments] = useState(null);
    const [previousAppointments, setPreviousAppointments] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const data = [
        upcomingAppointments,
        previousAppointments
    ];

    useEffect(() => {
        checkAuthentication()
            .then((response) => {
                dispatch(setUserDetails({
                    role: response.data.role,
                    data: response.data.data,
                    email: response.data.data.email
                }))
                if (response.data.role !== 'Doctor') {
                    navigate('/');
                }
            })
            .catch((error) => {
                navigate('/');
            })
    }, []);

    useEffect(() => {
        getUpcomings(doctorId)
            .then((response) => {
                console.log(response);
                setUpcomingAppointments(response.data.message);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [doctorId]);

    useEffect(() => {
        getPrevious(doctorId)
            .then((response) => {
                console.log(response);
                setPreviousAppointments(response.data.message);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [doctorId]);

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
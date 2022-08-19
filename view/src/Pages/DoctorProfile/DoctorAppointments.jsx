/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useState } from "react";
import ContentToggler from "../../Components/ContentToggler/ContentToggler";
import getUpcomings from "../../Network/Doctors/getUpcomings";
import getPrevious from "../../Network/Doctors/getPrevious";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../../Helper/Authentication";
import { setUpcomingAppointments } from "../../Store/Features/Appointments/upcomingAppointmentsSlice";

const Appointments = () => {
    const titles = ["Upcoming Appointments", "Previous Appointments"];
    const doctorId = useSelector((state) => state.userDetails.data?._id);
    const role = useSelector((state) => state.userDetails.role);
    const upcomingAppointments = useSelector((state) => state.upcomingAppointments.data);
    const [previousAppointments, setPreviousAppointments] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const data = [
        upcomingAppointments,
        previousAppointments
    ];

    authenticate('Doctor', navigate, dispatch);

    useEffect(() => {
        doctorId &&
            getUpcomings(doctorId)
                .then((response) => {
                    dispatch(setUpcomingAppointments({
                        upcomingAppointments: response.data.message
                    }))
                })
                .catch((error) => {
                    console.log(error);
                })
    }, [doctorId]);

    useEffect(() => {
        doctorId &&
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
            {
                role === 'Doctor' ?
                    <ContentToggler
                        titles={titles}
                        data={data}
                        role="doctor"
                    />
                    :
                    <></>
            }
        </>
    );
}

export default Appointments;
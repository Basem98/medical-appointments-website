import axiosClient from "../axiosClient";

const getAvailableAppointments = () => {
    return axiosClient.get('/appointments/available');
}

export default getAvailableAppointments;
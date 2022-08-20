import axiosClient from "../axiosClient";

const cancelAppointment = (id, data) => {
    return axiosClient.put(`/appointments/${id}/cancel`);
}

export default cancelAppointment;
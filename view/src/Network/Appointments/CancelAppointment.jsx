import axiosClient from "../axiosClient";

const cancelAppointment = (id, data) => {
    return axiosClient.put(`/appointments/${id}/cancel`, data);
}

export default cancelAppointment;
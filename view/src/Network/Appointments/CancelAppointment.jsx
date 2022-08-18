import axiosClient from "../axiosClient";

const cancelAppointment = (id, data) => {
    return axiosClient.put(`/appointments/${id}`, data);
}

export default cancelAppointment;
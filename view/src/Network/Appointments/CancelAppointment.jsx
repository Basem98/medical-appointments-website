import axiosClient from "../axiosClient";

const CancelAppointment = (id, data) => {
    return axiosClient.put(`/appointments/${id}`, data);
}

export default CancelAppointment;
import axiosClient from "../axiosClient";

const writePrescription = (id, data) => {
    return axiosClient.put(`/appointments/${id}`, data);
}

export default writePrescription;
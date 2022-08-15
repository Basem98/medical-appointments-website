import axiosClient from "../axiosClient";

const changePassword = (id, data) => {

    return axiosClient.patch(`/doctors/${id}/change-password`, data);
}

export default changePassword;
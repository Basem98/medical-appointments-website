import axiosClient from "../axiosClient";

const changePassword = (id, data) => {

    return axiosClient.patch(`/users/${id}/change-password`, data);
}

export default changePassword;
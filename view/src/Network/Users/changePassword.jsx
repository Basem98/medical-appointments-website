import axiosClient from "../axiosClient";

const changePassword = (id, token, data) => {

    return axiosClient.patch(`/users/${id}/change-password`, data);
}

export default changePassword;
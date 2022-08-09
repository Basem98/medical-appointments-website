import axiosClient from "../axiosClient";

const changePassword = (id, token, data) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return axiosClient.patch(`/users/${id}/change-password`, data, config);
}

export default changePassword;
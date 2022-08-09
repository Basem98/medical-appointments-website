import axiosClient from "../axiosClient";

const updateData = (id, token, data) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    axiosClient.patch(`/users/${id}`, data, config);
}

export default updateData;
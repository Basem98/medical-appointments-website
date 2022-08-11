import axiosClient from "../axiosClient";

const updateData = (id, data) => {

    return axiosClient.patch(`/users/${id}`, data);
}

export default updateData;
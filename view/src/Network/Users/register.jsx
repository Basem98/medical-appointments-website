import axiosClient from "../axiosClient";

const submitUserData = (userData) => {
    return axiosClient.post('/api/users', userData)
}

export default submitUserData;
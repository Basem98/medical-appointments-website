import axiosClient from "../axiosClient";

const submitUserData = (userData) => {
    return axiosClient.post('/users', userData)
}

export default submitUserData;
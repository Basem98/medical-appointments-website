import axiosClient from "../axiosClient";

const submitUserData = (userData) => {
    return axiosClient.post('/api/users', userData)
        .then((response) => console.log(response))
        .catch(err => console.log(err.response.data))
}

export default submitUserData;
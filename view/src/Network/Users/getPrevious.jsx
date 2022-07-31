import axiosClient from "../axiosClient"

const getPrevious = (id, token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return axiosClient.get(`/api/appointments/previous/${id}`, config);
}

export default getPrevious;
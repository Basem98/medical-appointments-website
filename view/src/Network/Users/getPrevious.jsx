import axiosClient from "../axiosClient"

const getPrevious = (id) => {

    return axiosClient.get(`/appointments/previous/${id}`);
}

export default getPrevious;
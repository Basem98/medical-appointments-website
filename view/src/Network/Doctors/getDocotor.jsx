import axiosClient from "../axiosClient"

const getDoctor = (id) => {
    return axiosClient.get(`/doctors/${id}`);
}

export default getDoctor;
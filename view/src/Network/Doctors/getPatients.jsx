const { default: axiosClient } = require("../axiosClient")

const getPatients = (id) => {
    return axiosClient.get(`/doctors/${id}/patients`);
}

export default getPatients;
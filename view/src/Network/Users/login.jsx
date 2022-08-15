const { default: axiosClient } = require("../axiosClient")

const loginUser = (id) => {

    return axiosClient.get(`/users/${id}`);
}

export default loginUser;
const { default: axiosClient } = require("../axiosClient")

const loginUser = (id, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return axiosClient.get(`/api/users/${id}`, config);
}

export default loginUser;
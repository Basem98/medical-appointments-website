import axiosClient from "../axiosClient"

const checkAuthentication = () => {
    return axiosClient.get('/authenticate');
}

export default checkAuthentication;
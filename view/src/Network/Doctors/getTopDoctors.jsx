import axiosClient from "../axiosClient";

const getTopDoctors = () => {
    let path = '/doctors/top';

    return axiosClient.get(path)
}

export default getTopDoctors;
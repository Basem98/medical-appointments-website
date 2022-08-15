import axiosClient from "../axiosClient";

const getUsersData = (pageNumber) => {
    let path = '/admins/users/all';

    return axiosClient.get(path, {
        params: {
            page: pageNumber
        }
    })
}

export default getUsersData;
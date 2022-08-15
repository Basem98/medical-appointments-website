import axiosClient from "../axiosClient";

const getAdminLogs = (pageNumber) => {
    let path = '/admins/logs';

    return axiosClient.get(path, {
        params: {
            page: pageNumber
        }
    });
}

export default getAdminLogs;
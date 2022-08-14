import axiosClient from "../axiosClient";

const getAdminLogs = (pageNumber) => {
    let path = '/admins/logs';
    let body = { page: pageNumber };

    return axiosClient.get(path, body);
}

export default getAdminLogs;
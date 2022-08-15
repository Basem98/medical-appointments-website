import axiosClient from "../axiosClient";

export const getUsersData = (pageNumber) => {
    let path = '/admins/users/all';

    return axiosClient.get(path, {
        params: {
            limit: 6,
            page: pageNumber
        }
    })
}

export const deleteUser = (userId) => {
    let path = '/admins/users/delete/' + userId;

    return axiosClient.delete(path);
}


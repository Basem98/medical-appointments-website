import axiosClient from "../axiosClient";

export const getDoctorsData = (docotrData) => {
    let path = '/admins/doctors/' + docotrData.type;

    return axiosClient.get(path, {
        params: {
            limit: 6,
            page: docotrData.pageNum
        }
    })
}

export const acceptDoctor = (doctorId) => {
    let path = '/admins/doctors/delete/' + doctorId;

    return axiosClient.put(path);
}

export const rejectDoctor = (doctorId) => {
    let path = '/admins/doctor/delete' + doctorId;

    return axiosClient.delete(path);
}
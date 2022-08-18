import axiosClient from "../axiosClient";

export const getAppointmentsData = (appointmentsData) => {
    let path = "/admins/appointments/";

    if (appointmentsData.type === 'all') {
        path += 'all';
    }

    else if (appointmentsData.type === 'upcoming') {
        path += 'upcoming';
    }

    else if (appointmentsData.type === 'previous') {
        path += 'previous';
    }

    return axiosClient.get(path, {
        params: {
            limit: 6,
            page: appointmentsData.pageNum
        }
    });
}

export const deleteAppointment = (appointmentId) => {
    let path = '/admins/appointments/delete/' + appointmentId;

    return axiosClient.delete(path);
}
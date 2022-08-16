import axiosClient from "../axiosClient";

export const getAppointments = (searchDates) => {
    let path = '/admins/appointments/statistics';
    let queryData = {};
    if (searchDates) {
        queryData.dateFrom = `${new Date().getFullYear()}-${searchDates.dateFromMonth}-${searchDates.dateFromDay}`;
        queryData.dateTo = `${new Date().getFullYear()}-${searchDates.dateToMonth}-${searchDates.dateToDay}`;
    }
    return axiosClient.get(path, {
        params: {
            ...queryData
        }
    })
}

export const getSignups = (searchDates) => {
    let path = '/admins/users/statistics';
    let queryData = {};
    if (searchDates) {
        queryData.dateFrom = `${new Date().getFullYear()}-${searchDates.dateFromMonth}-${searchDates.dateFromDay}`;
        queryData.dateTo = `${new Date().getFullYear()}-${searchDates.dateToMonth}-${searchDates.dateToDay}`;
    }

    return axiosClient.get(path, {
        params: {
            ...queryData
        }
    })
}
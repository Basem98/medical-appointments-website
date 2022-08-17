import axiosClient from "../axiosClient";
import { parseDate } from '../../Helper/ParseDate';

export const getAppointments = (searchDates) => {
    let path = '/admins/appointments/statistics';
    let queryData = {};
    if (searchDates) {
        queryData = parseDate(searchDates);
        console.log('queryData: ', queryData)
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
        queryData = parseDate(searchDates);
        console.log('queryData: ', queryData)
    }
    return axiosClient.get(path, {
        params: {
            ...queryData
        }
    })
}

export const getWeekIncome = (searchDate) => {
    let path = '/admins/appointments/statistics/income';
    return axiosClient.get(path);
}

export const getWeekAppointments = (searchDate) => {
    let path = '/admins/appointments/statistics/day';
    return axiosClient.get(path);
}
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
    let queryData = {};
    if (searchDate) {
        queryData = parseDate(searchDate);
        console.log('queryData: ', queryData)
    }
    return axiosClient.get(path, {
        params: {
            dateFrom: queryData.dateFrom
        }
    });
}

export const getWeekAppointments = (searchDate) => {
    let path = '/admins/appointments/statistics/day';
    let queryData = {};
    if (searchDate) {
        queryData = parseDate(searchDate);
        console.log('queryData: ', queryData)
    }
    return axiosClient.get(path, {
        params: {
            dateFrom: queryData.dateFrom
        }
    });
}
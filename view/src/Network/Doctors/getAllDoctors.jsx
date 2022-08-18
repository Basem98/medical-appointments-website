import axiosClient from '../axiosClient';
import { parseDate } from '../../Helper/ParseDate';

const getAllDoctorsData = (searchData) => {
    let path = '/doctors/all';
    let queryData = { ...searchData };
    if (searchData) {
        if (queryData.pageNum) delete queryData.pageNum;
        queryData = parseDate(searchData);
    }
    return axiosClient.get(`${path}`, {
        params: {
            limit: 6,
            page: searchData.pageNum,
            ...queryData
        }
    })
}

export default getAllDoctorsData;
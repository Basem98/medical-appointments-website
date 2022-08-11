import axiosClient from "../axiosClient";

const getUpcomings = (id) => {
    
    return axiosClient.get(`/appointments/upcomings/${id}`);
}

export default getUpcomings;
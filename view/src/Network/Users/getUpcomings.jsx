import axiosClient from "../axiosClient";

const getUpcomings = (id, token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return axiosClient.get(`/appointments/upcomings/${id}`, config);
}

export default getUpcomings;
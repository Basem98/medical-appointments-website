import axiosClient from "../axiosClient";


const bookAppointment = ({ id }) => {
  const path = '/appointments/book/';
  return axiosClient.post(`${path}${id}`);
}

export default bookAppointment;
import axiosClient from '../axiosClient';


const createAppointment = (appointment) => {
  const path = '/appointments';
  return axiosClient.post(path, appointment)
}


export default createAppointment;
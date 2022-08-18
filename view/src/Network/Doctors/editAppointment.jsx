import axiosClient from '../axiosClient';


const editAppointment = (appointmentData, id) => {
  const path = `/appointments/${id}`;
  return axiosClient.put(path, appointmentData)
}


export default editAppointment;
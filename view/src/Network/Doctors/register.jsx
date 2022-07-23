import axiosClient from '../axiosClient';

const submitDoctorApplication = (doctorData) => {
  const baseDoctorsRoute = '/api/doctors/';
  const body = doctorData;
  const headers = {
    'Content-Type': 'multipart/form-data'
  };
  return axiosClient.post(`${baseDoctorsRoute}`, body, { headers }).then(response => response);
}

export default submitDoctorApplication;
import axiosClient from '../axiosClient';


export function isEmailDuplicated(email) {
  try {
    return axiosClient.post('/api/doctors/validate/email', { email });
  } catch (err) {
    console.error(err);
  }
}


export function isPhoneDuplicated(phone) {
  try {
    return axiosClient.post('/api/doctors/validate/phone', { phone });
  } catch (err) {
    console.error(err);
  }
}
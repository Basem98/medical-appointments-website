import axiosClient from '../axiosClient';


const contactUs = (emailInfo) => {
  return axiosClient.post('/contact', emailInfo);
}


export default contactUs;
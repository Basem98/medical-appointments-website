import axiosClient from "../axiosClient";

const resendVerification = (id, role) => {
  const body = { id, role };
  
  return axiosClient.post('/resend-verification', body);
}

export default resendVerification;
import axiosClient from "../axiosClient";

const verifyEmail = ({ email, role }) => {
  const body = { email, role };
  return axiosClient.post('/send-password-change', body);
}

export default verifyEmail;
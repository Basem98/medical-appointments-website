import axiosClient from "../axiosClient";

const verifyEmail = ({ email, role }) => {
  const body = { email, role };
  return axiosClient.post('/verify-old', body);
}

export default verifyEmail;
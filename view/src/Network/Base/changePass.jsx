import axiosClient from "../axiosClient";

const changePassword = async ({ token, oldPassword, newPassword }) => {
  const isTokenValid = await axiosClient.put(`/verify/${token}`, null);

  if (isTokenValid.status !== 200) {
    return isTokenValid;
  }
  const body = {
    oldPassword,
    newPassword,
    email: isTokenValid.data.data.email,
    role: isTokenValid.data.data.role
  }
  return axiosClient.post('/change-password', body);
}


export default changePassword;
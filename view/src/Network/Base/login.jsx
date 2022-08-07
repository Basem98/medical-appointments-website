import axiosClient from "../axiosClient";

const submitUserData = (userData) => {
  let body = { ...userData };
  let path = '/login'
  if (body.role === 'User')
    path = '/users' + path;
  else if (body.role === 'Doctor')
    path = '/doctors' + path;

  delete body.role;
  return axiosClient.post(path, userData);
}
export default submitUserData
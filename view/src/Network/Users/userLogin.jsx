import axiosClient from "../axiosClient";

const submitUserData = (userData) => {
  let body = { ...userData };
  let path = '/login'
  if (body.role === 'user')
    path = '/users' + path;
  else if (body.role === 'doctor')
    path = '/doctors' + path;

  delete body.role;
  return axiosClient.post(path, userData);
}
export default submitUserData
import axiosClient from "../axiosClient";

const submitUserData = (userData) => {
  let body = { ...userData };
  let path = '/login'
  if (body.role === 'User')
    path = '/users' + path;
  else if (body.role === 'Doctor')
    path = '/doctors' + path;
  else if (body.role === 'Admin')
    path = '/admins/' + path;
  delete body.role;
  return axiosClient.post(path, body);
}
export default submitUserData
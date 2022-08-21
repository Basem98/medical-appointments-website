import axiosClient from '../axiosClient';

const logout = () => {
  return axiosClient.get('/logout');
}

export default logout;
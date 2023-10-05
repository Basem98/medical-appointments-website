import axios from 'axios';


const baseLocalUrl = 'http://localhost:8080/api';
const baseRemoteUrl = 'https://maw-0q3b.onrender.com/api';
const axiosClient = axios.create({
  baseURL: baseRemoteUrl,
  withCredentials: true
});


export default axiosClient;

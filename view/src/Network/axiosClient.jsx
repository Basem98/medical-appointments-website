import axios from 'axios';


const baseServerUrl = 'http://localhost:3000/';
const axiosClient = axios.create({
  baseURL: baseServerUrl
});


export default axiosClient;
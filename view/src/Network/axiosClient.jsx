import axios from 'axios';


const baseServerUrl = 'http://localhost:4000/';
const axiosClient = axios.create({
  baseURL: baseServerUrl
});


export default axiosClient;
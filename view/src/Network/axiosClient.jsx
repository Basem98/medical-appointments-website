import axios from 'axios';


const baseServerUrl = 'http://localhost:8080/';
const axiosClient = axios.create({
  baseURL: baseServerUrl
});


export default axiosClient;
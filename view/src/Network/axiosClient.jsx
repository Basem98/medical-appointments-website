import axios from 'axios';


const baseLocalUrl = 'http://localhost:8080/';
const baseRemoteUrl = 'https://maw-api.herokuapp.com/';
const axiosClient = axios.create({
  baseURL: baseRemoteUrl
});


export default axiosClient;
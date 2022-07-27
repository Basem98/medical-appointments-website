import axiosClient from "../axiosClient";

const submitUserData =(userData)=>{
return axiosClient.post('/api/users/login',userData)
}
export default submitUserData
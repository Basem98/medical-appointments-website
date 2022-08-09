import axiosClient from "../axiosClient";

const verifyToken = (token) => {
  return axiosClient.put(`/verify/${token}`);
}

export default verifyToken;
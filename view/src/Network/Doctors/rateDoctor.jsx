import axiosClient from "../axiosClient";

const rateDoctor = (rating, id) => {
  const path = `/doctors/${id}/rate`;
  return axiosClient.put(path, { rating });
}

export default rateDoctor;
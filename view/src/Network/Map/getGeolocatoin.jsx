import axios from "axios";

const getGeoloaction = (address) => {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address},+CA&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)
}

export default getGeoloaction;
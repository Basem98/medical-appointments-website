import axios from "axios";

const getGeoloaction = (address) => {
    try {
        let formattedAddress = `${address.buildingNo} ${address.streetName} ${address.city} ${address.governorate} ${address.country}`;

        return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress},+CA&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)
    } catch (err) {
        return null;
    }
}

export default getGeoloaction;
import axiosClient from '../axiosClient';
import getGeoloaction from '../Map/getGeolocatoin';

/**
 * @description
 * A function that makes a POST request to register the doctor's data,
 * then makes another call to upload the submitted images
 * @param {Object} doctorData an object that has the submitted form data
 * @returns {Promise<>} a promise that resolves with the response from the upload images request
 *  */
const submitDoctorApplication = async (doctorData) => {
  try {
    const baseDoctorsRoute = '/doctors';
    const headers = {
      'Content-Type': 'application/json'
    };
    /* Deep Copy the passed argument at just one level of nesting to avoid mutations */
    let body = { ...doctorData };
    body.profilePicture = body.profilePicture.name;
    body.professionalLicense = body.professionalLicense.name;
    /* Create a FormData instance that has an array called 'images' with the submitted images in it */
    const formData = new FormData();
    formData.append('images', doctorData.profilePicture);
    formData.append('images', doctorData.professionalLicense);
    /* Get the geolocation from the clinic's address */
    const geolocation = await getGeoloaction(body.clinics[0].address);
    if (geolocation) {
      body.clinics[0].geoLocation.longitude = geolocation.data.results[0].geometry.location.lng
      body.clinics[0].geoLocation.latitude = geolocation.data.results[0].geometry.location.lat;
    }
    /* Make the sign up request to register the doctor's data */
    return axiosClient.post(`${baseDoctorsRoute}`, body, { headers }).then(async response => {
      /* Make the upload request to upload the images with a content type of 'multipart/form-data' */
      await axiosClient.post(`${baseDoctorsRoute}/upload/images`, formData, { params: { id: response.data.id }, headers: { 'Content-Type': 'multipart/form-data' } });
      return response;
    })
  } catch (err) {
    throw new Error(err.data.error);
  }
}

export default submitDoctorApplication;
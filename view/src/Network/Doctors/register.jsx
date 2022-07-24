import axiosClient from '../axiosClient';

/**
 * @description
 * A function that makes a POST request to register the doctor's data,
 * then makes another call to upload the submitted images
 * @param {Object} doctorData an object that has the submitted form data
 * @returns {Promise<>} a promise that resolves with the response from the upload images request
 *  */
const submitDoctorApplication = async (doctorData) => {
  try {
    const baseDoctorsRoute = '/api/doctors';
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
    /* Make the sign up request to register the doctor's data */
    axiosClient.post(`${baseDoctorsRoute}`, body, { headers })
      .then(async response => {
        /* Make the upload request to upload the images with a content type of 'multipart/form-data' */
        return await axiosClient.post(`${baseDoctorsRoute}/upload/images`, formData, { params: { id: response.data.id }, headers: { 'Content-Type': 'multipart/form-data' } });
      })
      .catch(err => console.error(err));
  } catch (err) {
    console.error(err);
  }
}

export default submitDoctorApplication;
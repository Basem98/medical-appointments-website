const Doctor = require('../../model/doctor.model');
const logger = require('../../config/logger');
const { cloudinaryConfig, uploader } = require('../../config/cloudinaryConfig');

async function uploadImages(req, res, next) {
  try {
    const { id } = req.query;
    const doctorData = await Doctor.findOne({ _id: id });
    doctorData.profilePicture = (await uploader.upload(req.files[0])).url;
    doctorData.professionalLicense = (await uploader.upload(req.files[1])).url;
    await doctorData.save();
    res.json({ message: 'Files have been uploaded successfully', data: { img1: doctorData.profilePicture, img2: doctorData.professionalLicense } });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
}

module.exports = { uploadImages }
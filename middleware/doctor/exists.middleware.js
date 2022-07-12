const Doctor = require('../../model/doctor.model');
const customErr = { msg: '', statusCode: 400 };
customErr.toString = function () { return this.msg; }

async function isAlreadyInDb(req, res, next) {
  try {
    const emailExists = await Doctor.findOne({ email: req.body.email });
    if (emailExists) {
      customErr.msg = `The email ${req.body.email} is already in use`;
      return next(customErr);
    }
    const phoneExists = await Doctor.findOne({ phoneNumber: req.body.phoneNumber });
    if (phoneExists) {
      customErr.msg = `The phone number ${req.body.phoneNumber} is already in use`;
      return next(customErr);
    }
    req.body.clinics.forEach(async (clinic) => {
      const clinicPhoneExists = await Doctor.findOne({clinics: {$elemMatch: {phone: clinic.phone}}});
      if (clinicPhoneExists) {
        customErr.msg = `The clinic's phone number ${clinic.phone} is already in use`;
        return next(customErr);
      }
    });
    next();
  } catch (err) {
    console.error(err);
    err.statusCode = 500;
    next(err);
  }
}

module.exports = {
  isAlreadyInDb
}
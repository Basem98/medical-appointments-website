const Doctor = require('../../model/doctor.model');


async function isEmailAlreadyInDb(req, res, next) {
  try {
    const emailExists = await Doctor.findOne({ email: req.body.email });
    if (emailExists) {
      return res.json({ itExists: true });
    }
    res.json({ itExists: false });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
}

async function isPhoneAlreadyInDb(req, res, next) {
  try {
    const phoneExists = await Doctor.findOne({ phoneNumber: req.body.phone });
    if (phoneExists) {
      return res.json({ itExists: true });
    }
    res.json({ itExists: false });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
}


module.exports = {
  isEmailAlreadyInDb,
  isPhoneAlreadyInDb
}
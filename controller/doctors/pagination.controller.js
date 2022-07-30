const Doctor = require('../../model/doctor.model');

const getDoctorsByPage = async (req, res, next) => {
  try {
    const page = req.query.page || 0;
    const limit = req.query.limit || 9;
    const doctors = await Doctor.find({ isAccepted: true, isVerified: true }, '-professionalLicense')
      .sort('-rating')
      .skip(page * limit)
      .limit(limit);
    if (doctors.length > 0) {
      res.status(200).json({ doctors });
    } else {
      let pageNotFound = new Error("Page not found");
      pageNotFound.statusCode = 404;
      throw pageNotFound;
    }
  } catch (err) {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    next(err);
  }
}

module.exports = getDoctorsByPage;
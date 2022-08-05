const Doctor = require('../../model/doctor.model');
const jwt = require('jsonwebtoken');
const config = require('../../config/envConfig');


/**
 * @description An authentication/authorization middleware
 * that checks whether an accessToken cookie exists in the request,
 * and verifies the accessToken in the cookie,
 * then it calls the next middleware/controller with the doctor's data in (req.doctor)
 */
const protectDoctorsRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies['accessToken'];
    let authError = new Error();
    let tokenPayload = '';
    /* Check if token is signed with the doctor's secret from this server */
    try {
      tokenPayload = jwt.verify(accessToken, config.AUTH.DOCTOR_SECRET);
    } catch (err) {
      err.statusCode = 401;
      next(err);
    }
    /* Check if the doctor's id in the payload is valid */
    const doctorData = await Doctor.findById(tokenPayload.id);
    if (!doctorData) {
      authError.message = "Failed to verify token identity";
      authError.statusCode = 401;
      throw authError;
    }
    /* Check if the sender is authorized to access the endpoint */
    if (tokenPayload.role != 'Doctor') {
      authError.message = "Insufficient access permissions";
      authError.statusCode = 401;
      throw authError;
    }
    if (tokenPayload.exp - tokenPayload.iat === 3600) {
      // Reset the token & cookie's timer with each request as long as the user is active
      const tokenIdentity = { id: tokenPayload.id, role: tokenPayload.role };
      const rolledToken = jwt.sign(tokenIdentity, config.AUTH.DOCTOR_SECRET, { expiresIn: 3600 });
      res.cookie('accessToken', rolledToken, {
        maxAge: 3600 * 1000,
        secure: true,
        httpOnly: true
      });
    }
    req.doctor = doctorData;
    next();
  } catch (err) {
    next(err);
  }
}


module.exports = protectDoctorsRoute;
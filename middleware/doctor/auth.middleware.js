const Doctor = require('../../model/doctor.model');
const jwt = require('jsonwebtoken');
const config = require('../../config/envConfig');
const { verifyAuthHttpCookie } = require('../helpers/cookie.helper');


/**
 * @description An authentication/authorization middleware
 * that checks whether an accessToken cookie exists in the request,
 * and verifies the accessToken in the cookie,
 * then it calls the next middleware/controller with the doctor's data in (req.doctor)
 */
const protectDoctorsRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies['accessToken'];
    const cookieData = verifyAuthHttpCookie(accessToken, 'Doctor', config.AUTH.DOCTOR_SECRET, Doctor, next);
    req.doctor = cookieData.data;
    if (cookieData.tokenCookie && cookieData.tokenCookieOptions) {
      res.cookie('accessToken', cookieData.tokenCookie, cookieData.tokenCookieOptions);
      res.cookie('role', 'Doctor', cookieData.tokenCookieOptions);
    }
    next();
  } catch (err) {
    next(err);
  }
}


module.exports = protectDoctorsRoute;
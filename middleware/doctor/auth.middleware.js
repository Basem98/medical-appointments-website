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
    const role = req.cookies['role'];
    const cookieData = await verifyAuthHttpCookie(accessToken, 'Doctor', config.AUTH.DOCTOR_SECRET, Doctor, next);
    if (cookieData.tokenCookie && cookieData.tokenCookieOptions) {
      res.cookie('accessToken', cookieData.tokenCookie, cookieData.tokenCookieOptions);
      res.cookie('role', 'Doctor', cookieData.tokenCookieOptions);
    }
    req.doctor = cookieData.data;
    req.body.id = cookieData.data._id;
    req.body.role = role;
    next();
  } catch (err) {
    next(err);
  }
}


module.exports = protectDoctorsRoute;
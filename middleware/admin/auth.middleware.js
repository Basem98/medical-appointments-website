const Admin = require('../../model/admin.model');
const jwt = require('jsonwebtoken');
const config = require('../../config/envConfig');
const { verifyAuthHttpCookie } = require('../helpers/cookie.helper');


/**
 * @description An authentication/authorization middleware
 * that checks whether an accessToken cookie exists in the request,
 * and verifies the accessToken in the cookie,
 * then it calls the next middleware/controller with the admin's data in (req.admin)
 */
const protectAdminsRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies['accessToken'];
    const role = req.cookies['role'];
    const cookieData = await verifyAuthHttpCookie(accessToken, 'Admin', config.AUTH.ADMIN_SECRET, Admin, next);
    if (cookieData.tokenCookie && cookieData.tokenCookieOptions) {
      res.cookie('accessToken', cookieData.tokenCookie, cookieData.tokenCookieOptions);
      res.cookie('role', 'Admin', cookieData.tokenCookieOptions);
    }
    req.admin = cookieData.data;
    req.body.id = cookieData.data._id;
    req.body.role = role;
    next();
  } catch (err) {
    next(err);
  }
}


module.exports = protectAdminsRoute;
const Admin = require('../../model/admin.model');
const jwt = require('jsonwebtoken');
const config = require('../../config/envConfig');


/**
 * @description An authentication/authorization middleware
 * that checks whether an accessToken cookie exists in the request,
 * and verifies the accessToken in the cookie,
 * then it calls the next middleware/controller with the admin's data in (req.admin)
 */
const protectAdminsRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies['accessToken'];
    const cookieData = verifyAuthHttpCookie(accessToken, 'Admin', config.AUTH.ADMIN_SECRET, Admin, next);
    req.admin = cookieData.data;
    if (cookieData.tokenCookie && cookieData.tokenCookieOptions) {
      res.cookie('accessToken', cookieData.tokenCookie, cookieData.tokenCookieOptions);
      res.cookie('role', 'Admin', cookieData.tokenCookieOptions);
    }
    next();
  } catch (err) {
    next(err);
  }
}


module.exports = protectAdminsRoute;
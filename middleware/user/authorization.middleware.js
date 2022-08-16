const envConfig = require('../../config/envConfig');
const User = require('../../model/user.model');
const { verifyAuthHttpCookie } = require('../helpers/cookie.helper');

module.exports = async (req, res, next) => {
    try {
        let accessToken = req.cookies['accessToken'];
        let role = req.cookies['role'];
        const cookieData = await verifyAuthHttpCookie(accessToken, 'User', envConfig.AUTH.USER_SECRET, User, next);
        if (cookieData.tokenCookie && cookieData.tokenCookieOptions) {
            res.cookie('accessToken', cookieData.tokenCookie, cookieData.tokenCookieOptions);
            res.cookie('role', 'User', cookieData.tokenCookieOptions);
        }
        req.user = cookieData.data;
        req.body.id = cookieData.data._id;
        req.body.role = role;
        next();
    }
    catch (error) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
}
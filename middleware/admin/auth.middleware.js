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
    let authError = new Error();
    let tokenPayload = '';
    /* Check if token is signed with the admin's secret from this server */
    try {
      tokenPayload = jwt.verify(accessToken, config.AUTH.ADMIN_SECRET);
    } catch (err) {
      err.statusCode = 401;
      next(err);
    }
    /* Check if the admin's id in the payload is valid */
    const adminData = await Admin.findById(tokenPayload.id);
    if (!adminData) {
      authError.message = "Failed to verify token identity";
      authError.statusCode = 401;
      throw authError;
    }
    /* Check if the sender is authorized to access the endpoint */
    if (tokenPayload.role != 'Admin') {
      authError.message = "Insufficient access permissions";
      authError.statusCode = 401;
      throw authError;
    }
    /* Reset the token & cookie's timer with each request as long as the user is active */
    const tokenIdentity = { id: tokenPayload.id, role: tokenPayload.role };
    const rolledToken = jwt.sign(tokenIdentity, config.AUTH.ADMIN_SECRET, { expiresIn: 3600 });
    res.cookie('accessToken', rolledToken, {
      maxAge: 3600 * 1000,
      secure: true,
      httpOnly: true
    });

    req.admin = adminData;
    next();
  } catch (err) {
    next(err);
  }
}


module.exports = protectAdminsRoute;
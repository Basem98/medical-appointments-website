const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

/**
 * A function that generates a JWT token along with its cookie configuration to store it in an HttpOnly cookie
 * @param {{id: '', role: 'Doctor'|'User'|'Admin'}} identity The cookie's token identity
 * @param {String} secret The role's secret key
 * @param {Boolean} remember A boolean that determines the Max-Age for the cookie
 * @returns {{accessToken: String, cookieOptions: {maxAge: Number, secure: Boolean, httpOnly: Boolean}}}
 */
const generateCookie = (identity, secret, remember, next) => {
  try {
    const tokenIdentity = { id: identity.id, role: identity.role };
    let expiresIn = remember ? (30 * 24 * 60 * 60) : 3600;
    const accessToken = jwt.sign(tokenIdentity, secret, { expiresIn });
    const cookieOptions = {
      // Turn the maxAge number into milliseconds (specific to Express)
      maxAge: expiresIn * 1000,
      secure: true,
      httpOnly: true
    }
    return {
      accessToken,
      cookieOptions
    };
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
}


/**
 * A function that authenticates and authorizes a user based on the passed JWT token, the role, and the secret key used
 * @param {String} accessToken The JWT token that comes in the accessToken Http-only cookie
 * @param {String} role A string that can either be 'Doctor', 'User', or 'Admin'
 * @param {String} secret A string that has the secret key appropriate for the role you want to authorize
 * @param {mongoose.Model} model A mongoose model that matches the role
 * @param {Function} next An Express middleware function that calls the nest middleware to delegate errors to the global handler
 * @returns {{ tokenCookie: String, tokenCookieOptions: {maxAge: Number, secure: Boolean, httpOnly: Boolean}, data: Object }}
 */
const verifyAuthHttpCookie = async (accessToken, role, secret, model, next) => {
  let authError = new Error();
  let tokenPayload = '';
  const result = { tokenCookie: '', tokenCookieOptions: '', data: '' };
  /* Check if token is signed with the doctor's secret from this server */
  try {
    tokenPayload = jwt.verify(accessToken, secret);
  } catch (err) {
    err.statusCode = 401;
    next(err);
  }
  /* Check if the doctor's id in the payload is valid */
  result.data = await model.findById(tokenPayload.id);
  if (!result.data) {
    authError.message = "Failed to verify token identity";
    authError.statusCode = 401;
    next(authError);
  }
  /* Check if the sender is authorized to access the endpoint */
  if (tokenPayload.role != role) {
    authError.message = "Insufficient access permissions";
    authError.statusCode = 401;
    nest(authError);
  }
  if (tokenPayload.exp - tokenPayload.iat === 3600) {
    // Reset the token & cookie's timer with each request as long as the user is active
    const tokenCookie = generateCookie({ id: tokenPayload.id, role: tokenPayload.role }, secret, false, next);
    result.tokenCookie = tokenCookie.accessToken;
    result.tokenCookieOptions = tokenCookie.cookieOptions;
  }
  return result;
}

module.exports = { generateCookie, verifyAuthHttpCookie };
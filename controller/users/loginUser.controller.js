const User = require('../../model/user.model');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const envConfig = require('../../config/envConfig');
const { generateCookie } = require('../../middleware/helpers/cookie.helper');

module.exports.loginUser = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((data) => {
            if (!data) {
                return res.status(400).json({ message: 'Incorrect email or password' });
            }
            bycrypt.compare(req.body.password, data.password)
                .then((isCorrectPassword) => {
                    if (!isCorrectPassword) {
                        return res.status(400).json({ message: 'Incorrect email or password' });
                    }
                    /* Generate a JWT access token */
                    const cookie = generateCookie({ id: data._id, role: 'User' }, envConfig.AUTH.USER_SECRET, req.body.rememberMe, next);
                    return res.status(200)
                        .cookie('accessToken', cookie.accessToken, cookie.cookieOptions)
                        .cookie('role', 'User', cookie.cookieOptions)
                        .json({
                            message: 'Signed in successfully',
                            id: data._id,
                            role: 'User',
                            data
                        })
                })
                .catch((error) => {
                    error.statusCode = 500;
                    next(error);
                });
        })
        .catch((error) => {
            error.statusCode = 500;
            next(error);
        })
}
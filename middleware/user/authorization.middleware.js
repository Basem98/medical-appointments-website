const jwt = require('jsonwebtoken');
const envConfig = require('../../config/envConfig');

module.exports = (req, res, next) => {
    try {
        let accessToken = req.cookies['accessToken'];
        let decodedToken = jwt.verify(accessToken, envConfig.AUTH.USER_SECRET);
        req.body.id = decodedToken.id;
        req.body.role = decodedToken.role;
        next();
    }
    catch (error) {
        error.message = 'Authorization header missing';
        error.statusCode = 401;
        next(error);
    }
}
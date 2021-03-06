const jwt = require('jsonwebtoken');
const envConfig = require('../../config/envConfig');

module.exports = (req, res, next) => {
    try {
        let tokenInRequestHeader = req.get('Authorization').split(' ')[1];
        let decodedToken = jwt.verify(tokenInRequestHeader, envConfig.AUTH.USER_SECRET);
        req.body.id = decodedToken.id;
        req.body.role = decodedToken.id;
        next();
    }
    catch (error) {
        error.message = 'Authorization header missing';
        error.statusCode = 401;
        next(error);
    }
}
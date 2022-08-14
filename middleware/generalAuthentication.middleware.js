const jwt = require("jsonwebtoken");
const envConfig = require("../config/envConfig");

module.exports = (req, res, next) => {

    const accessToken = req.cookies['accessToken'];
    let role = req.cookies['role'];
    let verifiedToken;
    try {
        switch (role) {
            case 'user':
                verifiedToken = jwt.verify(accessToken, envConfig.AUTH.USER_SECRET);
                break;
            case 'doctor':
                verifiedToken = jwt.verify(accessToken, envConfig.AUTH.DOCTOR_SECRET);
                break;
            case 'admin':
                verifiedToken = jwt.verify(accessToken, envConfig.AUTH.ADMIN_SECRET);
                break;
            default:
                throw new Error("Role is not found");
        }
    } catch (error) {
        error.statusCode = 404;
        next(error);

    }
    finally {
        if(verifiedToken) {
            console.log(verifiedToken);
            req.body.id = verifiedToken.id
        }
        next();
    }
}
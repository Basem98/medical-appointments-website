const protectAdminsRoute = require('./admin/auth.middleware');
const protectDoctorsRoute = require('./doctor/auth.middleware');
const protectUsersRoute = require('./user/authorization.middleware');

module.exports = (req, res, next) => {
    try {
        let role = req.cookies['role'];
        switch (role) {
            case 'User':
                return protectUsersRoute(req, res, next);
            case 'Doctor':
                return protectDoctorsRoute(req, res, next);
            case 'Admin':
                return protectAdminsRoute(req, res, next);
            default:
                throw new Error("Role is not found");
        }
    } catch (error) {
        error.statusCode = 404;
        next(error);
    }
}
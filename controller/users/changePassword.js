const mongoose = require("mongoose");
const User = require("../../model/user.model");
const bcrypt = require("bcrypt");

module.exports.changePassword = async (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({ message: 'User is Not Found' });
    }
    if (req.params.id.toString() != req.body.id) {
        return res.status(401).json({ message: 'Unauthorized to update user data' });
    }
    try {
        let userPassword = await User.findById(req.body.id, { password: 1 });
        bcrypt.compare(req.body.currentPassword, userPassword.password)
            .then(async (isCorrectPassword) => {
                if (!isCorrectPassword) {
                    return res.status(401).json({ message: 'Wrong password' });
                }
                userPassword.password = req.body.newPassword;
                await userPassword.save();
                return res.status(200).json({ message: 'Password changed successfully!' });
            })
            .catch((error) => {
                error.statusCode = 500;
                next(error)
            })

    } catch (error) {
        error.statusCode = 500;
        next(error);
    }
}
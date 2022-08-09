const User = require('../../model/user.model');
const bycrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');

module.exports.updateUserById = async (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({ message: 'User is Not Found' });
    }
    if (req.params.id.toString() != req.body.id) {
        return res.status(401).json({ message: 'Unauthorized to update user data' });
    }
    try {
        let userData = await User.findById(req.body.id);
        if(!userData) {
            return res.status(404).json({ message: 'User is not found' });
        }
        userData.firstName = req.body.firstName;
        userData.lastName = req.body.lastName;
        userData.phoneNumber = req.body.phoneNumber;

        await userData.save();

        return res.status(200).json({message: 'User updated successfully'});
    } catch (error) {
        error.statusCode = 500;
        next(error);
    }
}
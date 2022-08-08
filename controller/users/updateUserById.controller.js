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
    } catch (error) {
        error.statusCode = 404;
        error.message = "User is not found";
    }

    if (req.body.newPassword) {

        /** Check if the provided current password is the same password in the database */
        User.findById(req.params.id)
            .then((userData) => {
                bycrypt.compare(userData.password, req.body.password)
                    .then((isCorrectPassword) => {
                        if (!isCorrectPassword) {
                            return res.status(401).json({ message: 'The entered password is wrong' })
                        }
                    })
                    .catch((error) => {
                        error.statusCode = 500;
                        error.message = "Password is missing";
                        return next(error);
                    });

                /** If the password is correct, encrypt the new password */
                bycrypt.hash(req.body.newPassword, 10)
                    .then(async (hashedNewPassword) => {
                        userData.password = hashedNewPassword;
                        console.log(req.body.newPassword);
                        console.log(hashedNewPassword);
                        userData.save();
                        return res.status(200).json({ message: 'Data updated successfully' })
                    })
                    .catch(error => {
                        error.statusCode = 500;
                        return next(error);
                    });
            })
    }
    console.log(55555);
    User.findByIdAndUpdate(req.body.id, { $set: req.body })
        .then((data) => {
            if (!data) {
                console.log(data);
                return res.status(404).json({ message: 'User is not found' });
            }
            return res.status(200).json({ message: 'User updated successfully' });
        })
        .catch(error => next(error))
}
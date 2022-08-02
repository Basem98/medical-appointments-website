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
    if (req.body.password) {
        await bycrypt.hash(req.body.password, 10)
            .then((hashedPassword) => {
                req.body.password = hashedPassword;
            })
            .catch(error => {
                error.statusCode = 500;
                next(error);
            });
    }
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
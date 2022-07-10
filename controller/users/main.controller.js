const { validateUserData } = require('./validation.controller');
const User = require('../../model/user.model');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const envConfig = require('../../config/envConfig');
const { default: mongoose } = require('mongoose');

module.exports.addUser = (req, res, next) => {
    let newUser = new User(req.body);
    bycrypt.hash(req.body.password, 10)
        .then((hashedPassword) => {
            newUser.password = hashedPassword;
            newUser.save()
                .then((data) => res.status(201).json({ message: 'User added successfully' }))
                .catch(error => {
                    error.statusCode = 500;
                    next(error)
                });
        })
        .catch(error => {
            error.statusCode = 500;
            next(error);
        });
}

module.exports.getUserById = (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({ message: 'User is Not Found' });
    }
    if (req.params.id.toString() != req.body.id) {
        return res.status(401).json({ message: 'Unauthorized to show user data' });
    }
    User.findOne({ _id: mongoose.Types.ObjectId(req.params.id) })
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: 'User is Not Found' })
            }
            else {
                data.password = undefined; // Exclude user password from retrieved data
                return res.status(200).json(data);
            }
        })
        .catch(error => {
            error.statusCode = 500;
            next(error);
        });
}

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
        .then(() => {
            return res.status(200).json({ message: 'User updated successfully' });
        })
        .catch(error => next(error))
}

module.exports.deleteUserById = (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({ message: 'User is Not Found' });
    }
    if (req.body.id.toString() != req.params.id) {
        return res.status(401).send({ message: 'Unauthorized to delete user data' });
    }
    User.deleteOne({ _id: req.body.id })
        .then((data) => {
            if (!data.deletedCount) {
                return res.status(404).send({ message: 'User is Not found' });
            }
            return res.status(200).json({ message: 'User deleted successfully' });
        })
        .catch(error => next(error))
}

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
                    let token = jwt.sign({
                        id: data._id,
                        role: 'user'
                    }, envConfig.AUTH.SECRET_KEY, { expiresIn: "1h" });
                    return res.status(200).json({ token });
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

//returns validation array
module.exports.validateUserData = validateUserData
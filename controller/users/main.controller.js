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
                .catch(error => next(error))
        })
        .catch(error => next(error))
}

module.exports.getUserById = (req, res, next) => {
    if(!mongoose.isValidObjectId(req.params.id)) {
        let error = new Error('User not found');
        next(error);
    }
    User.findOne({ _id: mongoose.Types.ObjectId(req.params.id) })
        .then((data) => {
            if (!data) {
                throw new Error('User is Not Found');
            }
            if(req.params.id.toString() == req.body.id) {
                data.password = undefined; // Exclude user password from retrieved data
                res.status(200).json(data);
            }
            else {
                throw new Error('User is Not authorized');
            }
        })
        .catch(error => next(error))
}

module.exports.loginUser = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((data) => {
            if (!data) {
                throw new Error('Incorrect email or password');
            }
            bycrypt.compare(req.body.password, data.password)
                .then((isCorrectPassword) => {
                    if (!isCorrectPassword) {
                        throw new Error('Incorrect email or password');
                    }
                    let token = jwt.sign({
                        id: data._id,
                        role: 'user'
                    }, envConfig.AUTH.SECRET_KEY);
                    res.status(200).json({ token });
                })
                .catch((error) => next(error))
        })
        .catch((error) => next(error))
}

//returns validation array
module.exports.validateUserData = validateUserData
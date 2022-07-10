const { validateUserData } = require('./validation.controller');
const User = require('../../model/user.model');
const bycrypt = require('bcrypt');

module.exports.addUser = (req, res, next) => {
    let newUser = new User(req.body);
    bycrypt.hash(req.body.password, 10)
        .then((hashedPassword) => {
            newUser.password = hashedPassword;
            newUser.save()
                .then((data) => res.status(201).json({message: 'User added successfully'}))
                .catch(error => next(error))
        })
        .catch(error => next(error))
}

//returns validation array
module.exports.validateUserData = validateUserData